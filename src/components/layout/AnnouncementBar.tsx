import React, { useState, useEffect } from 'react';
import { FiDollarSign } from 'react-icons/fi';
import { GoInfo } from "react-icons/go";
import { LiaShippingFastSolid } from "react-icons/lia";
import { TbTruckDelivery } from "react-icons/tb";
import { MdAssignmentReturn } from "react-icons/md";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { ShippingInfoModal } from '../modals/ShippingInfoModal';
import { ShippingInfoAllMadal } from '../modals/ShippingInfoAllMadal';
import { useI18n } from '@/locales/client';



const AnnouncementBar = () => {
  const [currentPromo, setCurrentPromo] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const t = useI18n();

  const promotions = [
    { 
      title: `${t("announcementbar.shippinginfo.Free_returns")}`,
      subtitle: `${t("announcementbar.shippinginfo.days")}`, 
      icon: <MdAssignmentReturn className="text-yellow-300 text-xl" />
    },
    { 
      title: `${t("announcementbar.shippinginfo.Guaranteed_delivery")}`, 
      subtitle: `${t("announcementbar.shippinginfo.Full_refund")}`,
      icon: <TbTruckDelivery className="text-yellow-300 text-xl" />
    },
    { 
      title: `${t("announcementbar.shippinginfo.Price_match")}`, 
      subtitle: `${t("announcementbar.shippinginfo.x_days")}`,
      icon: <FiDollarSign className="text-amber-300 text-xl" />
    },
    { 
      title: `${t("announcementbar.shippinginfo.Min_order")}`, 
      subtitle: `${t("announcementbar.shippinginfo.price_min")}`,
      icon: <MdOutlineShoppingCartCheckout className="text-yellow-300 text-xl" />
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentPromo(prev => (prev + 1) % promotions.length);
        setIsTransitioning(false);
      }, 500);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [promotions.length]);

  return (
    <div className="w-full bg-gray-900 py-2 px-4 md:px-12 border-b border-gray-700 hidden md:block">
      <div className="mx-auto flex items-center justify-between">
        <ShippingInfoModal>
          <div className="flex items-center gap-2">
            <LiaShippingFastSolid className="text-green-300 text-xl" />
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold text-green-300">{t("announcementbar.shippinginfo.Free_shipping")}</span>
                <GoInfo className="text-green-300 text-xs" />
              </div>
              <span className="text-xs text-green-300">{t("announcementbar.shippinginfo.Worldwide")}</span>
            </div>
          </div>
        </ShippingInfoModal>

        <div className="mx-8 h-5 w-px bg-gradient-to-b from-gray-400 via-gray-600 to-gray-400" />

        <div className="flex-1 min-w-0">
          <ShippingInfoAllMadal>
            <div className="flex items-center gap-2 h-[40px] overflow-hidden">
              <div className={`transition-all duration-500 ${
                isTransitioning ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
              } flex items-center gap-2`}>
                {promotions[currentPromo].icon}
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-yellow-200">{promotions[currentPromo].title}</span>
                  <span className="text-xs text-yellow-200">{promotions[currentPromo].subtitle}</span>
                </div>
              </div>
            </div>
          </ShippingInfoAllMadal>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;