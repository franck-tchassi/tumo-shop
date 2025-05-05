"use client"

import React from 'react'
import { ShieldCheck, CreditCard, Truck, AlertTriangle } from 'lucide-react'
import { Card, CardContent } from '../ui/card'
import { FaAngleRight } from "react-icons/fa6";
import Link from 'next/link';
import { TbMinusVertical } from "react-icons/tb";
import { IoIosLock } from "react-icons/io";



const WhyChooseUs = () => {
  const features = [
    {
      icon: <IoIosLock className="w-5 h-5 text-blue-600" />,
      title: "Secure privacy",
    },
    {
      icon: <CreditCard className="w-5 h-5 text-blue-600" />,
      title: "Safe payments",
    },
    {
      icon: <Truck className="w-5 h-5 text-blue-600" />,
      title: "Delivery guarantee"
    },
  ]

  return (
    <div className="bg-white py-4 px-4 md:px-12">
      <Card className="rounded-lg shadow-sm border-0 p-0">
        <CardContent className="p-4">
          {/* Section Principale */}
          <Link href={"/"}>
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-3'>
              <div className='flex items-center gap-2'>
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                <h3 className="text-md font-semibold text-gray-800">Why choose Tümo ?</h3>
              </div>
              
              <div className='flex items-center flex-wrap gap-3 md:gap-4'>
                {features.map((feature, index) => (
                  <React.Fragment key={index}>
                    <div className='flex items-center gap-1.5'>
                      {feature.icon}
                      <p className="text-xs text-gray-600">{feature.title}</p>
                    </div>
                    {index < features.length - 1 && (
                      <TbMinusVertical className="text-gray-300" />
                    )}
                  </React.Fragment>
                ))}
                <FaAngleRight className="w-5 h-5 text-gray-500" />
              </div>
            </div>
          </Link>

          {/* Section Avertissement */}
          <Link href={"/"}>
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pt-3 border-t border-gray-100'>
              <div className='flex items-center gap-2'>
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <h3 className="text-xs text-gray-700">
                    Be wary of messages asking for extra shipping fees.
                </h3>
              </div>
              
              <div className="flex items-center gap-2 text-gray-700">
                <span className="text-xs">View</span>
                <FaAngleRight className="w-5 h-5" />
              </div>
            </div>
          </Link>
        </CardContent>
      </Card> 
    </div>
  )
}

export default WhyChooseUs