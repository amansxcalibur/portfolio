export default function GooeyMergeOverlay() {
  return (
    <div className="min-h-[200vh] w-full bg-blue-900 text-neutral-800">
      <main className="mx-auto max-w-3xl px-6 py-24">
        <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-neutral-900">
          Fluid Interfaces
        </h1>
        <p className="mb-6 text-lg leading-relaxed text-neutral-600">
          This is an example page with standard content. The interactive gooey
          element lives on an overlay layer above this text. You can still
          scroll the page and read the content, while the fixed overlay sits
          comfortably on top.
        </p>
      </main>
    </div>
  );
}
