import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { Story } from "@/components/Story";
import { StoryTitle } from "@/components/StoryTitle";
import { CaseStudy } from "@/components/CaseStudy";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Testimonials } from "@/components/Testimonials";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { Motion } from "@/components/Motion";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <StoryTitle />
      <Hero />
      <Story />
      <CaseStudy />
      <Projects />
      <Experience />
      <Testimonials />
      <About />
      <Footer />
      <Motion />
    </>
  );
}
