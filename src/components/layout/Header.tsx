"use client";

import { logoutUser } from '@/actions/auth';
import { User } from '@/lib/generated/prisma';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import HeaderSearchBar from './HeaderSearchBar';
import { FaRegUser } from "react-icons/fa6";
import AnnouncementBar from './AnnouncementBar';



// Nouveau composant SearchButton
const SearchButton = () => (
   <HeaderSearchBar />
);


// Composant pour les liens de navigation
const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    className="text-gray-700 hover:text-gray-900 transition-colors duration-200 text-sm font-medium"
  >
    {children}
  </Link>
);

// Bouton avec icône réutilisable
const IconButton = ({ 
  children, 
  className = '',
  onClick 
}: { 
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => (
  <button
    className={`text-gray-700 hover:text-gray-900 transition-colors duration-200 ${className}`}
    onClick={onClick}
    aria-label="Bouton menu"
  >
    {children}
  </button>
);

// Bouton panier avec indicateur de quantité
const CartButton = ({ itemCount = 0 }: { itemCount?: number }) => (
  <div className="relative">
    <IconButton>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 sm:h-6 sm:w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 8h14l-1.5 12h-11L5 8zM9 8V6a3 3 0 016 0v2"
        />
      </svg>
    </IconButton>
    {itemCount === 0 && (
      <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] sm:text-xs w-4 h-4 rounded-full flex items-center justify-center">
        {itemCount}
      </span>
    )}
  </div>
);

type HeaderProps = {
    user: Omit<User, "passwordHash"> | null;
    categorySelector: React.ReactNode;
}

// Composant principal Header
const Header = ({user, categorySelector}: HeaderProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollY, setPrevScrollY] = useState(0);

  const router = useRouter();

  // Gestion du scroll pour masquer/afficher le header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingUp = currentScrollY < prevScrollY;

      if (isScrollingUp) {
        setIsVisible(true);
      } else if (currentScrollY > 100) {
        setIsVisible(false);
      }

      setPrevScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollY]);

  

  return (
    <header className="w-full sticky top-0 z-50">
      <div
        className={`w-full transform transition-transform duration-300 ease-in-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
      
        <AnnouncementBar />

        <div className="w-full bg-white/80 backdrop-blur-sm border-b border-gray-100">
          <div className="container mx-auto px-6 md:px-20 ">
            <div className="flex items-center justify-between h-16 sm:h-20 ">
              {/* Navigation gauche - Menu mobile */}
              <div className="flex items-center md:hidden">
                <IconButton>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </IconButton>
              </div>

              {/* Logo centre */}
              <div className="flex flex-1 justify-center md:justify-start">
                <Link href="/" className="text-xl sm:text-2xl font-bold tracking-tight">
                TÜMO
                </Link>
              </div>

              {/* Navigation desktop */}
              <nav className="hidden md:flex  gap-6 lg:gap-8 mr-12">
                {categorySelector}
                <NavLink href="#">Sale</NavLink>
              </nav>

              {/* Navigation droite */}
              <div className="flex items-center space-x-4 sm:space-x-6">
                <div className="hidden sm:flex items-center space-x-4">
                  <SearchButton />

                  {user ? (
                    <div className='flex items-center gap-3'>
                    <Link 
                      href="#"
                      className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
                      onClick={async (e) => {
                        e.preventDefault()
                        await logoutUser()
                        router.refresh()
                      }}
                    >
                      <FaRegUser className="w-5 h-5 text-gray-800" />
                      <div className="hidden sm:flex flex-col text-left">
                        <span className="text-xs text-gray-500 truncate">
                          Hi, {user.email.substring(0, 6)}...
                        </span>
                        <span className="text-xs font-medium">Account</span>
                      </div>
                    </Link>
                  </div>
                  ) : (
                    <Link 
                      href="/auth/sign-in" 
                      className="flex items-center gap-2 p-2  rounded-full hover:bg-gray-100 transition-colors whitespace-nowrap min-w-max"
                    >
                      <FaRegUser className="w-6 h-6 text-gray-800" />
                      <div className="hidden sm:flex flex-col text-left">
                        <span className="text-xs text-gray-500">Welcome</span>
                        <span className="text-xs font-medium whitespace-nowrap">Sign in / Register</span>
                      </div>
                    </Link>
                        
                  )}

                </div>
                <CartButton itemCount={0} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;