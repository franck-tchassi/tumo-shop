import Link from 'next/link'
import { 
  Facebook, Twitter, Instagram, Youtube, 
  Globe, Mail, Phone, MapPin, 
  CreditCard, Shield, Truck, Headset 
} from 'lucide-react'
import Image from 'next/image'

// Importez directement les images si elles sont dans le dossier public
import applePay from '../../../public/images/payments/applepay.png'
import cb from '../../../public/images/payments/cb.png'
import googlePay from '../../../public/images/payments/googlepay.png'
import mastercard from '../../../public/images/payments/mastercard.png'
import paypal from '../../../public/images/payments/paypal.png'
import visa from '../../../public/images/payments/visa.png'

export function Footer({ locale }: { locale: string }) {
  return (
    <footer className="bg-gray-900 text-gray-100 pt-12 pb-6 px-4 md:px-8 lg:px-16 text-sm">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-10">
        
        {/* Customer Service */}
        <div className="col-span-2 md:col-span-1">
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Headset className="w-4 h-4" />
            Customer Service
          </h3>
          <ul className="space-y-2 text-gray-300 text-xs">
            <li><Link href={`/${locale}/contact`} className="hover:text-white transition-colors">Contact Us</Link></li>
            <li><Link href={`/${locale}/faq`} className="hover:text-white transition-colors">FAQ</Link></li>
            <li><Link href={`/${locale}/returns`} className="hover:text-white transition-colors">Returns & Refunds</Link></li>
            <li><Link href={`/${locale}/track-order`} className="hover:text-white transition-colors">Track Order</Link></li>
            <li><Link href={`/${locale}/size-guide`} className="hover:text-white transition-colors">Size Guide</Link></li>
          </ul>
        </div>

        {/* About Us */}
        <div>
          <h3 className="text-sm font-semibold mb-3">About Us</h3>
          <ul className="space-y-2 text-gray-300 text-xs">
            <li><Link href={`/${locale}/about`} className="hover:text-white transition-colors">Our Story</Link></li>
            <li><Link href={`/${locale}/careers`} className="hover:text-white transition-colors">Careers</Link></li>
            <li><Link href={`/${locale}/blog`} className="hover:text-white transition-colors">Blog</Link></li>
            <li><Link href={`/${locale}/press`} className="hover:text-white transition-colors">Press</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-sm font-semibold mb-3">Legal</h3>
          <ul className="space-y-2 text-gray-300 text-xs">
            <li><Link href={`/${locale}/privacy`} className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link href={`/${locale}/terms`} className="hover:text-white transition-colors">Terms of Service</Link></li>
            <li><Link href={`/${locale}/cookie`} className="hover:text-white transition-colors">Cookie Policy</Link></li>
            <li><Link href={`/${locale}/compliance`} className="hover:text-white transition-colors">Compliance</Link></li>
          </ul>
        </div>

        {/* Stay Connected */}
        <div className="col-span-2 md:col-span-1">
          <h3 className="text-sm font-semibold mb-3">Stay Connected</h3>
          <div className="flex gap-3 mb-4">
            <Link href="#" className="bg-gray-700 hover:bg-blue-600 p-1.5 rounded-full transition-colors">
              <Facebook className="w-4 h-4" />
            </Link>
            <Link href="#" className="bg-gray-700 hover:bg-sky-400 p-1.5 rounded-full transition-colors">
              <Twitter className="w-4 h-4" />
            </Link>
            <Link href="#" className="bg-gray-700 hover:bg-pink-600 p-1.5 rounded-full transition-colors">
              <Instagram className="w-4 h-4" />
            </Link>
            <Link href="#" className="bg-gray-700 hover:bg-red-600 p-1.5 rounded-full transition-colors">
              <Youtube className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="max-w-7xl mx-auto border-t border-gray-700 pt-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-green-400" />
            <span className="font-medium text-xs">Buyer Protection</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-blue-400" />
            <span className="font-medium text-xs">Free Shipping Over $4.99</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CreditCard className="w-4 h-4 text-purple-400" />
            <span className="font-medium text-xs">Secure Payments</span>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="max-w-7xl mx-auto border-t border-gray-700 pt-6 mb-6">
        <h4 className="text-center text-xs font-semibold mb-3">We Accept</h4>
        <div className="flex flex-wrap justify-center items-center gap-3">
          <div className="relative w-10 h-6">
            <Image 
              src={applePay} 
              alt="Apple Pay" 
              fill
              className="object-contain"
            />
          </div>
          <div className="relative w-8 h-6">
            <Image 
              src={cb} 
              alt="CB" 
              fill
              className="object-contain"
            />
          </div>
          <div className="relative w-10 h-6">
            <Image 
              src={googlePay} 
              alt="Google Pay" 
              fill
              className="object-contain"
            />
          </div>
          <div className="relative w-8 h-6">
            <Image 
              src={mastercard} 
              alt="Mastercard" 
              fill
              className="object-contain"
            />
          </div>
          <div className="relative w-12 h-6">
            <Image 
              src={paypal} 
              alt="PayPal" 
              fill
              className="object-contain"
            />
          </div>
          <div className="relative w-12 h-6">
            <Image 
              src={visa} 
              alt="Visa" 
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="max-w-7xl mx-auto border-t border-gray-700 pt-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="text-xs text-gray-400 text-center md:text-left">
            © {new Date().getFullYear()} Tümo. All rights reserved.
          </div>
          
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors">
              <Globe className="w-3 h-3" />
              <span>English</span>
            </div>
            <div className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors">
              <span>USD $</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}