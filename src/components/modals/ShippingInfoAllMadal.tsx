
"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "../ui/button"

export function ShippingInfoAllMadal({
  children,
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <div 
        onClick={() => setOpen(true)} 
        className="cursor-pointer"
        aria-label="View shipping information"
      >
        {children}
      </div>
      
      <Dialog open={open} onOpenChange={setOpen} >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-left">Shipping Information</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 pt-2">
            <p className="text-sm text-gray-600">
              All orders over $15 qualify for free standard shipping. 
              Delivery times vary by location (typically 3-5 business days).
            </p>
            <div className="bg-blue-50 p-3 rounded-md">
              <h4 className="font-medium text-sm">What makes it "Incredible"?</h4>
              <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
                <li>No minimum order quantity</li>
                <li>Free returns within 30 days</li>
                <li>Real-time package tracking</li>
              </ul>
            </div>
          </div>
          
          <div className="flex  justify-center">
            <Button 
               size={"lg"}
              className=" w-full px-8 py-4 flex justify-center items-center text-sm max-w-[200px] cursor-pointer"
              onClick={() => setOpen(false)}
            >
              OK
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}