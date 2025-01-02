import Image from 'next/image';
import React, { useEffect } from 'react';
import Thankyou from '@/app/public/assets/Thankyou2.gif'
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";

const ThankYouOverlay = ({ onClose }: { onClose: () => void }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 6000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed inset-0 flex items-center justify-center text-center   z-50 bg-white opacity-100 h-screen">
            <Fireworks autorun={{ speed: 3 }} />;
            <div className="flex flex-col items-center animate-fadeIn">
                <div className=" flex justify-center items-center">
                    <Image src={Thankyou} alt='Thankyou' width={400} height={200} className='' />
                </div>
                <h2 className="text-black text-2xl font-bold -mt-20">Payment Successful</h2>
            </div>
        </div>
    );
};

export default ThankYouOverlay;