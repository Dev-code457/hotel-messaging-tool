export async function sendWhatsAppMessage(
  to: string,
  templateName: string,
  parameters?: { type: string; text: string }[]
) {
  const requestBody = {
    messaging_product: "whatsapp",
    to: `91${to}`,
    type: "template",
    template: {
      name: templateName,
      language: {
        code: "en",
      },
      components: [
        {
          type: "body",
          parameters,
        },
      ],
    },
  };

  try {
    const response = await fetch(
      `https://graph.facebook.com/v20.0/${process.env.WHATSAPP_BUSINESS_ID}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.FACEBOOK_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    const responseData = await response.json();
    console.log("WhatsApp API response:", responseData); // Add this log

    if (!response.ok || responseData.error) {
      console.error(`Failed to send message to ${to}:`, responseData.error);
      throw new Error(responseData.error?.message || "Failed to send message");
    }

    return responseData;
  } catch (error) {
    console.error(`Error sending message to ${to}:`, error);
    throw new Error(`Failed to send message to ${to}`);
  }
}
