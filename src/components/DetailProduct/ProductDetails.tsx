import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { product } from '@/sanity/schemaTypes/schemas/product';

const ProductDetails =    () => {
    return (
        <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
            {/* product Data */}
            <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

                {/* product Image */}
                <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
                    <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
                        {
                           
                                <img src={""} key={""} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt='' />
                            
                        }
                    </div>
                </div>
            </div>



            {/* Main image 
                        <div className='relative aspect-square rounded-2xl overflow-hidden shadow-lg bg-white'>
                            {product.mainImage && (
                                <Image 
                                    fill
                                    priority
                                    className='object-cover'
                                    alt={product.title ?? 'Product Image'}
                                    src={urlForImage(product.mainImage as any)}
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            )}
                        </div> */}
        </div>
    )
}