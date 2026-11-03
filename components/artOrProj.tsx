import { useSectionTracker } from "@/../_contexts/useSectionTracker"; // Adjust path as needed

export default function artOrProject(){
    const sectionRef = useSectionTracker<HTMLElement>("art-or-project");
    return(
        <section ref={sectionRef}>he</section>
    )
}