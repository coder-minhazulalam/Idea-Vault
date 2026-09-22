import HomeIdeasView from "@/Components/HomeIdeasView";
import ImageSlider from "@/Components/ImageSlider";
import TitleSection from "@/Components/TitleSection";
import ExtraCategories from "@/Components/ExtraCategories";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-[#09090b] dark:text-white">

      {/* Image Slider */}
      <section className="w-full px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl overflow-hidden rounded-3xl transition-colors duration-300 dark:border-slate-800 dark:bg-[#09090b] ">
          <div className="min-h-[420px] flex items-center justify-center">
            <ImageSlider />
          </div>
        </div>
      </section>


      {/* Stats + Testimonials */}
      <section className="w-full px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <TitleSection />
        </div>
      </section>


      {/* Ideas */}
      <section className="w-full px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-[#111827]">
          <HomeIdeasView />
        </div>
      </section>


      {/* Extra Categories */}
      <section className="w-full px-4 py-8 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <ExtraCategories />
        </div>
      </section>

    </main>
  );
}