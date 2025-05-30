import React from 'react'

import { getCurrentSession } from "@/actions/auth";
import HeaderCategorySelector from "@/components/layout/HeaderCategorySelector";
import Header from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer';


interface LandingPageProps {
  children: React.ReactNode
}

const landingLayout =  async ({children}: LandingPageProps) => {
    const {user} = await getCurrentSession();
  return (
    <div>
         
      <Header user={user} categorySelector={HeaderCategorySelector()}  />
      {children}
      <Footer locale="" />
  

    
    </div>
  )
}

export default landingLayout