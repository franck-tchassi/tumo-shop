"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';


const HeaderSearchBar = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl">
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="chaussure pour enfant"
          className="w-full pl-4 pr-12 py-2 text-sm  border-2 border-black rounded-full focus:outline-none focus:border-black focus:ring-0 shadow-sm transition-all"
        />
        <Button
          type="submit"
          size="lg"
          className="absolute right-1 rounded-lg h-8 mr-1 w-12  bg-black hover:bg-black hover:text-white cursor-pointer"
        >
           
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 sm:w-6 sm:h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3.5}
            >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                />
            </svg>
        </Button>
      </div>
    </form>
  );
};

export default HeaderSearchBar;