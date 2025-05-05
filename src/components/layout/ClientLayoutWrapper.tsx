// components/ClientLayoutWrapper.tsx
'use client'

import { usePathname } from 'next/navigation'
import Header from "@/components/layout/Header"
import HeaderCategorySelector from "@/components/layout/HeaderCategorySelector"

export function ClientLayoutWrapper({
  user,
  children,
}: {
  user: any
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isStudio = pathname?.startsWith('/studio')

  return (
    <>
      {!isStudio && (
        <Header 
          user={user} 
          categorySelector={<HeaderCategorySelector />} 
        />
      )}
      {children}
    </>
  )
}