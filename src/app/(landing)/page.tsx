import { getCurrentSession } from "@/actions/auth";
import { getAllProducts } from "../../../sanity/lib/client";
import SalesCampaignBanner from "@/components/layout/SalesCampaignBanner";
import ProductGrid from "@/components/product/ProductGrid";
import WhyChooseUs from "@/components/layout/WhyChooseUs";

const Home = async () => {
  const {user} = await getCurrentSession()
  const products = await getAllProducts()
 
  return (
    <div>
      <SalesCampaignBanner />
      <WhyChooseUs />

      <section className="container mx-auto py-8">
         <ProductGrid products={products}/>
      
      </section>
    </div>
  );
}

export default Home