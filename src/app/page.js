import Banner from "@/components/Banner";
import FeaturedPets from "@/components/FeaturedPets";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PetCareTips from "@/components/PetCareTips";
import SaveLife from "@/components/SaveLife";
import SuccessStory from "@/components/SuccessStory";
import WhyAdoptPage from "@/components/WhyAdoptPage";



export default function Home() {
  return (
    <>
      <Navbar />
      <div className="pt-20">
        <Banner />
        <FeaturedPets />
        <WhyAdoptPage />
        <SuccessStory />
        <PetCareTips />
        <SaveLife />
        <Footer />
      </div>
    </>
  );
}
