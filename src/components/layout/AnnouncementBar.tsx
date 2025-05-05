import React, { useState, useEffect } from 'react';
import { FiDollarSign } from 'react-icons/fi';
import { GoInfo } from "react-icons/go";
import { LiaShippingFastSolid } from "react-icons/lia";
import { TbTruckDelivery } from "react-icons/tb";
import { MdAssignmentReturn } from "react-icons/md";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { ShippingInfoModal } from '../modals/ShippingInfoModal';
import { ShippingInfoAllMadal } from '../modals/ShippingInfoAllMadal';

const AnnouncementBar = () => {
  const [currentPromo, setCurrentPromo] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const promotions = [
    { 
      title: "Free returns",
      sous_title: "Up to 90 days*", 
      icon: <MdAssignmentReturn className="text-yellow-300 text-3xl" />,
    },
    { 
      title: "Delivery guaranteed", 
      sous_title: "Refund for any issues",
      icon: <TbTruckDelivery className="text-yellow-300 text-3xl" />,
    },
    { 
      title: "Price adjustment", 
      sous_title: "Within 30 days",
      icon: <FiDollarSign className="text-amber-300 text-3xl" />,
    },
    { 
      title: "Minimun Order Value", 
      sous_title: "Min. order value:$9.99",
      icon: <MdOutlineShoppingCartCheckout className="text-yellow-300 text-3xl" />,
    }
  ];

  useEffect(() => {
    const transitionPromo = () => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentPromo((prev) => (prev + 1) % promotions.length);
        setIsTransitioning(false);
      }, 500);
    };

    const interval = setInterval(transitionPromo, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-gray-900 py-3 px-6 md:px-20 border-b border-gray-700 hidden md:block">
      <div className="mx-auto flex items-center justify-between">
        {/* Partie gauche - Free Shipping */}
        <div className="flex items-center">
          <ShippingInfoModal>
            <div className="flex items-center gap-3">
              <LiaShippingFastSolid className="text-green-300 text-3xl" />
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-base font-bold text-green-300 hover:underline">Free shipping</span>
                  <GoInfo className="text-green-300 text-xs" />
                </div>
                <span className="text-base font-bold text-green-300 hover:underline">Incredible</span>
              </div>
            </div>
          </ShippingInfoModal>
        </div>

        {/* Séparateur fixe */}
        <div className="mx-20 h-6 w-px flex-shrink-0 bg-gradient-to-b from-gray-400 via-gray-600 to-gray-400"></div>

        {/* Partie droite - Promotions défilantes */}
        <div className="flex-1 min-w-0">
          <ShippingInfoAllMadal>
            <div className="flex items-center gap-3 h-[60px] overflow-hidden relative">
              <div className={`transition-all duration-800 transform ${
                isTransitioning ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
              } flex items-center gap-3`}>
                {promotions[currentPromo].icon}
                <div className="flex flex-col">
                  <span className="text-base font-bold text-yellow-200 block">
                    {promotions[currentPromo].title}
                  </span>
                  <span className="text-base font-medium text-yellow-200 block">
                    {promotions[currentPromo].sous_title}
                  </span>
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