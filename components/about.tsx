import { useSectionTracker } from "../_contexts/useSectionTracker";

export default function AboutMe() {
  const sectionRef = useSectionTracker<HTMLElement>("about");
  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center"
    >
      <div className="w-full max-w-[1580px] space-y-8">
        <div className="space-y-4 text-[60px] leading-relaxed text-gray-600">
          <p className="leading-[64px] [font-variation-settings:'opsz'_32,'GRAD'_200,'ROND'_100]">
            I enjoy exploring the intersection of{" "}
            <span className="text-white rounded-full bg-blue-600 px-[40px] [font-variation-settings:'opsz'_32,'GRAD'_200,'ROND'_100]">
              ART
            </span>🖌️{" "}
            and
            <span className="text-white rounded-full bg-blue-600  px-[40px] [font-variation-settings:'opsz'_32,'GRAD'_200,'ROND'_100]">
              programming.
            </span>
            Whether I'm building desktop environments and UI tooling for Linux
            or experimenting with visual art and animation, I'm drawn to what
            lets me combine engineering with creative expression.
          </p>

          <p className="leading-[64px] [font-variation-settings:'opsz'_32,'GRAD'_200,'ROND'_100]">
            Currently exploring software, expressive interfaces & motion.
          </p>
        </div>

        <div className="pt-6 text-gray-400"></div>
      </div>
    </section>
  );
}
