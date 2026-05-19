"use client";
const announcements = [
  { icon: "🌱", text: "Farm Fresh Flowers" },
  { icon: "🌿", text: "Sustainable & Natural" },
  { icon: "🚚", text: "Delivered with Care" },
];
export default function AnnouncementBar() {
  return (
    <div className=" bg-[#FFF7F2] text-black text-xs font-medium py-2.5 px-4">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-6">
          {announcements.map((a) => (
            <span key={a.text} className="flex items-center gap-1.5">
              <span>{a.icon}</span>
              {a.text}
            </span>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-4 text-black/80">
          <span>📞 +91 98765 43210</span>
          <span>✉️ info@phoolmandi.com</span>
          <div className="flex gap-2 ml-2">
            <a href="#" className="hover:text-white transition-colors">FB</a>
            <a href="#" className="hover:text-white transition-colors">IG</a>
          </div>
        </div>
      </div>
    </div>
  );
}
