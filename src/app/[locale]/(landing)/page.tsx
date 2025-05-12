import { getCurrentSession } from "@/actions/auth";
import { getAllCategories, getAllProducts } from "../../../../sanity/lib/client";
import SalesCampaignBanner from "@/components/layout/SalesCampaignBanner";
import ProductGrid from "@/components/product/ProductGrid";
import WhyChooseUs from "@/components/layout/WhyChooseUs";
import { getI18n } from "@/locales/server";

const Home = async () => {
  const { user } = await getCurrentSession()
  const products = await getAllProducts()
  const categories = await getAllCategories()

  const t = await getI18n();

  return (
    <div>
      <SalesCampaignBanner />
      <WhyChooseUs />

      <section className="container mx-auto py-8">
        <ProductGrid products={products} categories={categories} />
      </section>
    </div>
  );
}

export default Home


