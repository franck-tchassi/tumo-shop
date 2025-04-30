"use client";

import { logoutUser } from '@/actions/auth';
import { User } from '@/lib/generated/prisma';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

// Barre d'annonces en haut de la page
const AnnouncementBar = () => {
  return (
    <div className="w-full bg-black py-2">
      <div className="container mx-auto flex items-center justify-center px-4 sm:px-6">
        <span className="text-center text-xs sm:text-sm font-medium tracking-wide text-white">
          FREE SHIPPING ON ORDERS OVER $15.00 • FREE RETURNS
        </span>
      </div>
    </div>
  );
};

// Nouveau composant SearchButton
const SearchButton = () => (
    <IconButton>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 sm:w-6 sm:h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
        />
      </svg>
    </IconButton>
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
}

// Composant principal Header
const Header = ({user}: HeaderProps) => {
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
          <div className="container mx-auto px-4 sm:px-6">
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
                  Tumo
                </Link>
              </div>

              {/* Navigation desktop */}
              <nav className="hidden md:flex  gap-6 lg:gap-8 mr-12">
                <NavLink href="#">Home</NavLink>
                <NavLink href="#">New Arrivals</NavLink>
                <NavLink href="#">Sale</NavLink>
              </nav>

              {/* Navigation droite */}
              <div className="flex items-center space-x-4 sm:space-x-6">
                <div className="hidden sm:flex items-center space-x-4">
                  <SearchButton />

                  {user ? (
                    <div className='flex items-center gap-2  sm:gap-4'>
                        <span className='text-xs text-gray-700 hidden md:block'>{user.email}</span>
                        <Link 
                            href={"#"}
                            className='text-sm sm:text-sm font-medium text-gray-700 hover:text-gray-900'
                            onClick={async (e) => {
                                e.preventDefault()
                                await logoutUser()
                                router.refresh()
                            }}
                        >
                            Sign Out
                        </Link>
                    </div>
                  ) : (
                    <React.Fragment>
                        <NavLink href="/auth/sign-in">Sign In</NavLink>
                        <NavLink href="/auth/sign-up">Sign Up</NavLink>
                    </React.Fragment>
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