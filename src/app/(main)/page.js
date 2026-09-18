import HomeIdeasView from "@/Components/HomeIdeasView";
import ImageSlider from "@/Components/ImageSlider";
import TitleSection from "@/Components/TitleSection";

export default function Home() {
  return (
   <>
   <div className="min-h-screen flex  flex-col items-center justify-center">
    <ImageSlider /> 

   </div>

       <TitleSection />
       <HomeIdeasView />


   </>
  );
}
