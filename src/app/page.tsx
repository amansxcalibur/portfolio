import AboutMe from "@/components/about";
import { Hero } from "@/components/hero";
import { SelectedWork } from "@/components/selectedWork";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <AboutMe />
      <SelectedWork />
    </main>
  );
}
