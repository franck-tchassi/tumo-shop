
import { getAllCategories } from '@/sanity/lib/client'
import Link from 'next/link'
import React from 'react'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";



const HeaderCategorySelector = async () => {
    const categories = await getAllCategories()
  return (
    <div className='relative inline-block'>
            <HoverCard openDelay={0} closeDelay={100}>
              <HoverCardTrigger asChild>
                <div className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer transition-colors">
                <button className='peer group text-gray-700 hover:text-gray-900 text-sm font-medium flex items-center gap-1 cursor-pointer'>
                    Categories
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        className='transition-transform duration-200 group-hover:rotate-180'
                    >
                        <path d="M6 9l6 6 6-6"/>
                    </svg>
                </button>
                </div>
              </HoverCardTrigger>
              
              
              <HoverCardContent 
                className="w-64 p-2 relative shadow-lg mt-3 border border-gray-200 rounded-lg" 
                sideOffset={1}
                align="center"
                side="bottom"
              >
                {/* Flèche centrée pointant vers le trigger */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 rotate-45 bg-white border-t border-l border-gray-200 z-10"></div>

                
                <div className='py-2'>
                    {categories.map((category) =>(
                        <Link
                          key={category._id}
                          href={`/category/${category.slug?.current}`}
                          className='block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-100'
                          prefetch

                        >
                           {category.title}
                        </Link>
                    ))}
                </div>
            
              </HoverCardContent>
            </HoverCard>


    </div>
    
  )
}

export default HeaderCategorySelector