"use client"

import React from 'react'
import { ShieldCheck, CreditCard, Truck} from 'lucide-react'
import { Card, CardContent } from '../ui/card'
import Link from 'next/link';

import { useI18n } from '@/locales/client';


const WhyChooseUs = () => {
  const t = useI18n();
  const features = [
    {
      icon: <CreditCard className="w-4 h-4 text-blue-600" />,
      title: `${t("whyChooseUs.Safe_payments")}`,
      href: "/whychoosetumo"
    },
    {
      icon: <Truck className="w-4 h-4 text-blue-600" />,
      title: `${t("whyChooseUs.Delivery_guarantee")}`,
      href: "/whychoosetumo"
    },
    {
      icon: <ShieldCheck className="w-4 h-4 text-blue-600" />,
      title: `${t("whyChooseUs.Secure_privacy")}`,
      href: "/whychoosetumo"
    }
  ];

  return (
    <div className="bg-white py-4 px-4 md:px-6 lg:px-8">
      <Card className="rounded-lg border border-gray-100 shadow-xs">
        <CardContent className="p-2">
          {/* Main Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div className="group flex items-center gap-2">
              <ShieldCheck className="w-5 h-5  transition-colors" />
              <h3 className="text-sm font-semibold text-gray-800  transition-colors">
                {t("whyChooseUs.why")}
              </h3>
            </div>
            
            <div className="flex items-center divide-x divide-gray-200">
              {features.map((feature, index) => (
                <Link 
                  key={index}
                  href={feature.href}
                  className="px-3 flex items-center gap-2 hover:bg-gray-50 rounded transition-colors"
                >
                  {feature.icon}
                  <span className="text-xs text-gray-600 hover:text-blue-600 transition-colors">
                    {feature.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  );
};

export default WhyChooseUs;