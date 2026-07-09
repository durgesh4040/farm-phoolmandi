import HeroSection from "@/components/sections/herosection"
import MarqueeStrip from "@/components/ui/MarqueeStrip"
import CategoriesSection from "@/components/sections/categorysection"
import FeaturedFlowers from "@/components/sections/featuredflower"
import BulkOrdersSection from "@/components/sections/bulkordersection"
import TestimonialsSection from "@/components/sections/testimonialsection"
import Footer from "@/components/layout/footer"
export default function Page() {
  return (
    <>
      <div>
        <HeroSection />
        <CategoriesSection />
        <FeaturedFlowers />
        <BulkOrdersSection />
        <TestimonialsSection />
        <Footer/>
      </div>
    </>
  )
}
