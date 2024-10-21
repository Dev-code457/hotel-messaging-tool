import { NextResponse } from 'next/server';
import { sendWhatsAppMessage } from '@/utils/whatsappApi';
import { connectToDatabase } from '@/lib/mongodb';
import Customer from '@/models/customers';
import { handleAppError } from '@/utils/errorHandler';

export async function POST(req: Request) {
    try {
        await connectToDatabase();
        const body = await req.json();
        if (body.object === "whatsapp_business_account") {
            body.entry.forEach(async (entry: any) => {
                const changes = entry.changes || [];
                changes.forEach(async (change: any) => {
                    const messages = change.value.messages || [];
                    for (const message of messages) {
                        console.log('Received message:', message);
                        const customer = await Customer.findOne({ phoneNumber: message.from });
                        if (customer) {
                            const responseMessage = "Thank you for your message!";
                            await sendWhatsAppMessage(customer.phoneNumber, "your_template_name", [
                                { type: "TEXT", text: responseMessage },
                            ]);
                        }
                    }
                });
            });
        }
        return NextResponse.json({ status: "EVENT_RECEIVED" }, { status: 200 });
    } catch (error) {
        console.error('Error processing webhook:', error);
        return handleAppError(error);
    }
}
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const mode = searchParams.get('hub.mode');
        const token = searchParams.get('hub.verify_token');
        const challenge = searchParams.get('hub.challenge');
        if (mode && token === process.env.FACEBOOK_ACCESS_TOKEN) {
            return new NextResponse(challenge, { status: 200 });
        } else {
            return NextResponse.json({ message: "Forbidden" }, { status: 403 });
        }
    } catch (error) {
        console.error('Error verifying webhook:', error);
        return handleAppError(error);
    }
}
