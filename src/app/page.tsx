import Navbar from "@/components/layout/nav-bar"
import AnnouncementBar from "@/components/layout/announcement-bar"
import HeroSection from "@/components/sections/herosection"
import MarqueeStrip from "@/components/ui/MarqueeStrip"
import CategoriesSection from "@/components/sections/categorysection"
import AboutSection from "@/components/sections/aboutsection"
import FeaturedFlowers from "@/components/sections/featuredflower"
import BulkOrdersSection from "@/components/sections/bulkordersection"
import BookingSection from "@/components/sections/bookingsection"
import TestimonialsSection from "@/components/sections/testimonialsection"
import Footer from "@/components/layout/footer"
export default function Page() {
  return (
    <>
        <HeroSection />
        <MarqueeStrip />
        <CategoriesSection />
        <AboutSection />
        <FeaturedFlowers />
        <BulkOrdersSection />
        <BookingSection />
        <TestimonialsSection />
    

      {/* <Footer /> */}
    </>
  )
}
