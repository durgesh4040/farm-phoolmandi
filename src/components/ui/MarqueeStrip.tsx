const items = [
  "🌹 Gulab",
  "Rose",
  "🌺 Rajnigandha",
  "Tuberose",
  "💐 Genda",
  "Marigold",
  "🌼 Gerbera",
  "🌸 Lily",
  "🌻 Sunflower",
  "🪷 Orchid",
];
export default function MarqueeStrip() {
  return (
    <div className="overflow-hidden bg-black py-4">
      <div className="flex marquee gap-8">
        {[...items, ...items].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 shrink-0"
          >
            <span className="text-white uppercase tracking-widest text-sm">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
          </div>
        ))}
      </div>
    </div>
  );
}