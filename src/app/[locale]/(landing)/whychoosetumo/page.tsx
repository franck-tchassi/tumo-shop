import { ShieldCheck, Truck, BadgePercent,  Home, ChevronRight, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { FaCcPaypal, FaCcVisa, FaGooglePay, FaCcMastercard } from "react-icons/fa";
import { LiaCcApplePay } from "react-icons/lia";

type WhyChooseTumoPageProps = {
  params: Promise<{locale: string}>
}

export default async function WhyChooseTumo({ params }: WhyChooseTumoPageProps) {
  const { locale } = await params

  return (
    <div className="bg-white px-4 md:px-8 lg:px-16 py-12 max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex justify-start mb-12 items-center gap-1 text-sm">
        <Link
          href={`/${locale}`}
          className='hover:text-primary text-gray-500 transition-colors flex items-center gap-1'
        >
          <Home className='w-4 h-4' />
          <span>Home</span>
        </Link>
        <ChevronRight className='w-4 h-4 text-gray-400' />
        <span className="text-gray-800 font-medium">Why choose Tümo ?</span>
      </div>

      {/* Page Header */}
      <div className="mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Shop With Tümo?</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Discover the benefits that make us the preferred choice for thousands of customers worldwide.
        </p>
      </div>

      {/* Value Propositions */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Direct Pricing */}
        <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-all">
          <div className="flex gap-4 items-start">
            <div className="bg-blue-100 p-3 rounded-full">
              <BadgePercent className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="font-semibold text-lg mb-2">Factory-direct prices</h2>
              <p className="text-gray-600">
                We connect you directly with manufacturers, cutting out middlemen to offer wholesale prices.
              </p>
            </div>
          </div>
        </div>

        {/* Global Shipping */}
        <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-all">
          <div className="flex gap-4 items-start">
            <div className="bg-blue-100 p-3 rounded-full">
              <Globe className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="font-semibold text-lg mb-2">Worldwide delivery</h2>
              <p className="text-gray-600">
                Reliable shipping with tracking to most countries in 5-15 business days.
              </p>
            </div>
          </div>
        </div>

        {/* Secure Payments */}
        <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-all">
          <div className="flex gap-4 items-start">
            <div className="bg-blue-100 p-3 rounded-full">
              <ShieldCheck className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="font-semibold text-lg mb-2">Secure checkout</h2>
              <p className="text-gray-600 mb-3">
                PCI-compliant payments with multiple options:
              </p>
              <div className="flex gap-3 flex-wrap">
                <FaCcVisa className="w-10 h-6 text-blue-900" />
                <FaCcMastercard className="w-10 h-6 text-red-600" />
                <FaCcPaypal className="w-10 h-6 text-blue-700" />
                <LiaCcApplePay className="w-10 h-6 text-black" />
                <FaGooglePay className="w-10 h-6 text-gray-800" />
              </div>
            </div>
          </div>
        </div>

        {/* Guarantees */}
        <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-all">
          <div className="flex gap-4 items-start">
            <div className="bg-blue-100 p-3 rounded-full">
              <Truck className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="font-semibold text-lg mb-2">Buyer protection</h2>
              <ul className="text-gray-600 space-y-2 list-disc pl-5">
                <li>30-day price match guarantee</li>
                <li>Free returns within 14 days</li>
                <li>24/7 dedicated customer support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-16 text-center bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to experience the Tümo difference?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Join thousands of satisfied customers who shop smarter with us every day.
        </p>
        <div className="flex gap-4 justify-center">
          <Button className="bg-primary hover:bg-primary-dark px-8 py-4 text-lg">
            Shop Now
          </Button>
          <Button variant="outline" className="px-8 py-4 text-lg border-primary text-primary">
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  )
}