import AboutMe from "@/components/about";
import { ArtOrProject } from "@/components/artOrProject";
import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <AboutMe />
      <ArtOrProject />
    </main>
  );
}
