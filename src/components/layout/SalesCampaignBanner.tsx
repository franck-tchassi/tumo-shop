"use client"

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { MdOutlineLocalShipping } from "react-icons/md";
import { BsBoxSeam } from "react-icons/bs";
import { TbTruckReturn } from "react-icons/tb";
import { useI18n } from '@/locales/client';



const SalesCampaignBanner = () => {
    const router = useRouter();
    const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });
    const [isVisible, setIsVisible] = useState(true);
    const t = useI18n();

    const features = [
        {
            icon: <MdOutlineLocalShipping className="w-5 h-5 text-amber-900" />,
            title: `${t("salesCampaignBanner.features.free_shipping")}`,
            subtitle: `${t("salesCampaignBanner.features.on_all_orders")}`
        },
        {
            icon: <BsBoxSeam className="w-5 h-5 text-amber-900" />,
            title: `${t("salesCampaignBanner.features.Fast_delivery")}`,
            subtitle: `${t("salesCampaignBanner.features.Get_refunds_for_any_issues")}`
        },
        {
            icon: <TbTruckReturn className="w-5 h-5 text-amber-900" />,
            title: `${t("salesCampaignBanner.features.Easy_returns")}`,
            subtitle: `${t("salesCampaignBanner.features.day_policy")}`
        },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                const totalSeconds = prev.hours * 3600 + prev.minutes * 60 + prev.seconds - 1;
                
                if (totalSeconds <= 0) {
                    clearInterval(timer);
                    setIsVisible(false);
                    return { hours: 0, minutes: 0, seconds: 0 };
                }

                return {
                    hours: Math.floor(totalSeconds / 3600),
                    minutes: Math.floor((totalSeconds % 3600) / 60),
                    seconds: totalSeconds % 60
                };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <>
            <div className='w-full bg-gradient-to-r from-blue-600 to-blue-500 py-2.5 relative overflow-hidden'>
                <div className='container mx-auto px-4'>
                    <div className='flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-white'>
                        <div className='flex items-center gap-2'>
                            <span className='text-xl font-bold'>🚀</span>
                            <span className='text-sm font-semibold'>FLASH SALE:</span>
                            <div className='bg-white/20 rounded px-2 py-1 font-mono font-bold text-sm'>
                                {`${timeLeft.hours.toString().padStart(2, '0')}:${timeLeft.minutes.toString().padStart(2, '0')}:${timeLeft.seconds.toString().padStart(2, '0')}`}
                            </div>
                        </div>

                        <div className='hidden sm:flex items-center gap-2'>
                            <span className='text-xl'>💎</span>
                            <span className='font-bold text-cyan-200 text-sm'>
                                UP TO 95% OFF
                            </span>
                        </div>

                        <button 
                            className='bg-white text-blue-600 px-4 py-1 rounded-full font-bold text-sm hover:bg-cyan-100 transition-all shadow-md hover:scale-[1.03] active:scale-95'
                            onClick={() => router.push("/flash-sale")}
                            aria-label="Shop flash sale"
                        >
                            SHOP NOW
                        </button>
                    </div>
                </div>
                
                <div className='absolute inset-0 pointer-events-none'>
                    <div className='absolute top-0 left-0 w-20 h-20 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2' />
                    <div className='absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2' />
                </div>
            </div>
        
            <div className='bg-amber-50 grid grid-cols-3 divide-x divide-amber-100 py-2'>
                {features.map((feature, index) => (
                    <div key={index} className='flex items-center justify-center gap-2 px-2'>
                        {feature.icon}
                        <div className='text-xs font-medium text-amber-900'>
                            <p>{feature.title}</p>
                            <p className='font-normal'>{feature.subtitle}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default SalesCampaignBanner;