import Image from 'next/image';
import React, { useEffect } from 'react';
import Thankyou from '@/app/public/assets/Thankyou2.gif'

const ThankYouOverlay = ({ onClose }: { onClose: () => void }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 2000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed inset-0 flex items-center justify-center text-center bg-white  z-50">
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
