// src/components/ThankYouOverlay.js
import Image from 'next/image';
import React, { useEffect } from 'react';
import Thankyou from '@/app/public/assets/Thankyou2.gif'

const ThankYouOverlay = ({ onClose }) => {
    useEffect(() => {
        // Close the overlay after 3 seconds
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer); // Cleanup on unmount
    }, [onClose]);

    return (
        <div className="fixed inset-0 flex items-center justify-center text-center bg-white h-screen h-screen z-50">
            <div className="flex flex-col items-center animate-fadeIn">
                <div className="bg-red-900 flex justify-center items-center">
              <Image src={Thankyou} alt='Thankyou' width={500} height={200} className='bg-red-900'/>
                </div>
                <h2 className="text-black text-2xl font-bold ">Payment Successful</h2>
            </div>
        </div>
    );
};

export default ThankYouOverlay;
