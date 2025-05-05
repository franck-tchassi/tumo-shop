"use client"

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { MdOutlineLocalShipping } from "react-icons/md";
import { BsBoxSeam } from "react-icons/bs";
import { TbTruckReturn } from "react-icons/tb";


const SalesCampaignBanner = () => {
    const features = [
        {
          icon: <MdOutlineLocalShipping className="w-5 h-5 text-amber-950 " />,
          title: "Free shipping",
          sous_title: "On all Choice items"
        },
        {
          icon: <BsBoxSeam className="w-5 h-5 text-amber-950" />,
          title: "Fast delivery",
          sous_title: "Get refunds for any issues"
        },
        {
          icon: <TbTruckReturn className="w-5 h-5 text-amber-950" />,
          title: "Free returns",
          sous_title: "On millions of items"
        },
    ]

    const router = useRouter();
    const [timeLeft, setTimeLeft] = useState({
        hours: '23',
        minutes: '59',
        seconds: '59'
    });

    // Countdown timer effect
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                let seconds = parseInt(prev.seconds) - 1;
                let minutes = parseInt(prev.minutes);
                let hours = parseInt(prev.hours);
                
                if (seconds < 0) {
                    seconds = 59;
                    minutes -= 1;
                }
                
                if (minutes < 0) {
                    minutes = 59;
                    hours -= 1;
                }
                
                if (hours < 0) {
                    clearInterval(timer);
                    return { hours: '00', minutes: '00', seconds: '00' };
                }
                
                return {
                    hours: hours.toString().padStart(2, '0'),
                    minutes: minutes.toString().padStart(2, '0'),
                    seconds: seconds.toString().padStart(2, '0')
                };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <>
            <div className='w-full bg-gradient-to-r from-blue-600 via-blue-400 to-blue-500 py-3 relative overflow-hidden'>
                <div className='container mx-auto px-4'>
                    <div className='flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-white'>
                        <div className='flex items-center gap-2'>
                            <span className='text-xl sm:text-2xl font-bold animate-bounce'>
                                🚀
                            </span>
                            <div className='text-sm sm:text-base font-medium'>
                                FLASH SALE ENDS IN:
                            </div>
                            <div className='bg-white/20 rounded px-2 py-1 font-mono font-bold text-sm sm:text-base'>
                                {`${timeLeft.hours}:${timeLeft.minutes}:${timeLeft.seconds}`}
                            </div>
                        </div>

                        <div className='flex items-center gap-2'>
                            <span className='text-xl font-bold'>💎</span>
                            <span className='font-bold text-cyan-200 animate-pulse text-sm sm:text-base'>
                                UP TO 95% OFF!
                            </span>
                        </div>

                        <button 
                            className='bg-white text-blue-600 px-4 py-1 rounded-full font-bold text-sm hover:bg-cyan-100 transition-colors shadow-lg hover:scale-105 active:scale-95'
                            onClick={() => router.push("/flash-sale")}
                            aria-label="Shop now during flash sale"
                        >
                            SHOP NOW!
                        </button>
                    </div>
                </div>
                
                {/* Decorative elements */}
                <div className='absolute top-0 left-0 w-full h-full pointer-events-none'>
                    <div className='absolute top-0 left-0 w-20 h-20 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2'></div>
                    <div className='absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2'></div>
                    <div className='absolute top-1/4 right-1/4 w-16 h-16 bg-white/15 rounded-full animate-pulse'></div>
                </div>
            </div>
        
            <div className='bg-gray-100 flex flex-wrap justify-center md:justify-around mx-auto items-center gap-4  py-1'>
                {features.map((feature, index) => (
                    <div 
                    key={index} 
                    className='flex items-center gap-2 px-3 py-2 '
                    >
                    <span>{feature.icon}</span>
                    <p className='text-sm font-medium text-amber-950'>
                        {feature.title} 
                        <span className='block text-xs font-normal text-amber-900 mt-0.5'>
                        {feature.sous_title}
                        </span>
                    </p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default SalesCampaignBanner