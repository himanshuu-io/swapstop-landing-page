import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Story from "@/components/sections/Story";
import Finish from "@/components/sections/Finish";
import Clarity from "@/components/sections/Clarity";
import Handoff from "@/components/sections/Handoff";
import Protect from "@/components/sections/Protect";
import Locations from "@/components/sections/Locations";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Story />
        <Finish />
        <Clarity />
        <Handoff />
        <Protect />
        <Locations />
        <FAQ />
        <Footer />
      </main>
    </>
  );
}
