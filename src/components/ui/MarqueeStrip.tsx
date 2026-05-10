const items = [
  "🌹 Gulab", "Rose", "🌺 Rajnigandha", "Tuberose", "💐 Genda", "Marigold",
  "🌼 Gerbera", "🌸 Lily", "🌻 Sunflower", "🪷 Orchid",
  "🌹 Gulab", "Rose", "🌺 Rajnigandha", "Tuberose", "💐 Genda", "Marigold",
  "🌼 Gerbera", "🌸 Lily", "🌻 Sunflower", "🪷 Orchid",
];

export default function MarqueeStrip() {
  return (
    <div className="bg-darkgray py-4 overflow-hidden whitespace-nowrap">
      <div className="marquee-track inline-flex gap-8">
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3">
            <span className={`text-sm tracking-widest uppercase font-medium ${
              i % 2 === 0 ? "text-rose-300" : "text-white/40"
            }`}>
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-rose/40 flex-shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}
