import HeroSection from "@/components/sections/herosection"
import MarqueeStrip from "@/components/ui/MarqueeStrip"
import CategoriesSection from "@/components/sections/categorysection"
import FeaturedFlowers from "@/components/sections/featuredflower"
import BulkOrdersSection from "@/components/sections/bulkordersection"
import BookingSection from "@/components/sections/bookingsection"
import TestimonialsSection from "@/components/sections/testimonialsection"
export default function Page() {
  return (
    <>
      <HeroSection />
      <MarqueeStrip />
      <CategoriesSection />
      <FeaturedFlowers />
      <BulkOrdersSection />
      <BookingSection />
      <TestimonialsSection />
      {/* <Footer /> */}
    </>
  )
}
