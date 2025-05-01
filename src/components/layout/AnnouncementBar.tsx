import React, { useState, useEffect } from 'react';
import {  FiDollarSign } from 'react-icons/fi';
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
      icon: <MdAssignmentReturn className="text-yellow-300 text-2xl" />,
    },
    { 
      title: "Delivery guaranteed", 
      sous_title: "Refund for any issues",
      icon: <TbTruckDelivery className="text-yellow-300 text-2xl" />,
    },
    { 
      title: "Price adjustment", 
      sous_title: "Within 30 days",
      icon: <FiDollarSign className="text-amber-300 text-2xl" />,
    },
    { 
      title: "Minimun Order Value", 
      sous_title: "Min. order value:$9.99",
      icon: <MdOutlineShoppingCartCheckout className="text-yellow-300 text-2xl" />,
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
    <div className="w-full bg-gray-900 py-3 px-4 border-b border-gray-700">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Partie gauche - Free Shipping */}
        <ShippingInfoModal>
            <div className="flex items-center gap-3">
              <div className="bg-green-800/30 p-1.5 rounded-full">
                  <LiaShippingFastSolid className="text-green-300 text-2xl" />
              </div>
              <div className="flex flex-col ">
                  <div className="flex items-center gap-1">
                  <span className="text-base font-bold text-green-300 hover:underline">Free shipping</span>
                  <GoInfo className="text-green-300 text-xs" />
                  </div>
                  <span className="text-base font-bold text-green-300 hover:underline">Incredible</span>
              </div>
            </div>
        </ShippingInfoModal>

        {/* Séparateur */}
        <div className="h-6 w-px bg-gray-600 mx-2" />

        {/* Partie droite - Promotions défilantes */}
        
        <ShippingInfoAllMadal >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="bg-yellow-50/15 p-1.5 rounded-full">
              {promotions[currentPromo].icon}
            </div>
            <div className={`flex flex-col transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'} overflow-hidden`}>
              <span className="text-basr font-bold text-yellow-200">
                {promotions[currentPromo].title}
              </span>
              <span className="text-base font-medium text-yellow-200">
                {promotions[currentPromo].sous_title}
              </span>
            </div>
          </div>
        </ShippingInfoAllMadal>
        
      </div>
    </div>
  );
};

export default AnnouncementBar;