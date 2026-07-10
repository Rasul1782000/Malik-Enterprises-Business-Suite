import { User, Shield, MapPin, Building } from "lucide-react";
import teamMeeting from "../assets/images/industrial_team_meeting_1783725697388.jpg";

export default function About() {
  const leadershipHighlights = [
    {
      icon: User,
      title: "Malik Faisal Azeem",
      role: "Key Principal & Founder",
      desc: "Providing strong, localized executive guidance that couples global manufacturing standards with deep engineering excellence in Pakistan's industrial corridors."
    },
    {
      icon: MapPin,
      title: "Multan Industrial Hub",
      role: "46-C Industrial Estate",
      desc: "Ideally situated inside Multan's Phase-1 Industrial Estate, offering smooth logistics access across Southern Punjab and key national freight networks."
    },
    {
      icon: Shield,
      title: "Uncompromising Integrity",
      role: "Compliance & Safety Standards",
      desc: "Our machinery repair, chemical polymer compositions, and merchandise sourcing processes conform strictly to standard industrial security and quality guidelines."
    }
  ];

  return (
    <section className="bg-vn-surface py-16 sm:py-24 border-y border-white/5" id="about-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="max-w-3xl">
            <span className="font-mono text-[10px] font-medium uppercase tracking-widest text-vn-tertiary block mb-3">
              Who We Are
            </span>
            <h2 className="font-display italic text-4xl tracking-tight text-vn-primary sm:text-5xl" id="about-heading">
              A Multi-Disciplinary Pioneer in Pakistan’s Industrial Hub
            </h2>
            <p className="font-sans text-base text-vn-secondary mt-6 leading-relaxed">
              Founded with a vision to deliver premium manufacturing, resilient maintenance, and robust merchandising workflows, Malik Enterprises has evolved into a premier industrial brand in Multan. Under the leadership of Key Principal <strong>Malik Faisal Azeem</strong>, we deploy elite engineers and supply chain specialists to deliver quality products and reliable services to warehouses, industrial facilities, and retailers nationwide.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden border border-white/10 shadow-vn-card h-64 lg:h-80">
            <img src={teamMeeting} alt="Team Meeting" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {leadershipHighlights.map((hl, idx) => {
            const Icon = hl.icon;
            return (
              <div 
                key={idx}
                id={`about-highlight-${idx}`}
                className="flex flex-col rounded-lg border border-white/5 bg-vn-neutral p-6 shadow-vn-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-vn-card text-vn-tertiary mb-5 border border-white/10">
                  <Icon className="h-5 w-5" />
                </div>
                
                <h3 className="font-sans text-base font-medium text-vn-primary leading-snug">
                  {hl.title}
                </h3>
                
                <span className="text-[10px] font-mono font-medium text-vn-secondary uppercase tracking-widest mt-1 mb-4 block">
                  {hl.role}
                </span>

                <p className="font-sans text-sm text-vn-secondary leading-relaxed mt-auto">
                  {hl.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 rounded-lg bg-vn-neutral border border-white/10 p-8 sm:p-12 shadow-vn-card relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-5">
            <Building className="h-64 w-64 -mr-16 -mt-16 text-vn-primary" />
          </div>
          <div className="max-w-2xl relative z-10">
            <h3 className="font-display italic text-2xl sm:text-3xl tracking-tight mb-4 text-vn-primary">
              Our Core Pledge: Precision, Quality, Durability
            </h3>
            <div className="border-l-[3px] border-vn-tertiary pl-5 my-6">
              <p className="font-sans text-sm text-vn-secondary leading-relaxed italic">
                "We believe that industrial strength comes from attention to the smallest details. From custom polymer formulations to heavy gearbox repairs and warehousing integrity, Malik Enterprises is committed to empowering Pakistan's manufacturing sectors through excellence and trust."
              </p>
            </div>
            <div className="flex items-center space-x-3 mt-8">
              <div className="h-10 w-10 rounded-full bg-vn-card border border-white/10 flex items-center justify-center font-display italic text-lg text-vn-primary">
                ME
              </div>
              <div>
                <span className="text-[13px] font-semibold block text-vn-primary">The Malik Quality Seal</span>
                <span className="text-[10px] text-vn-secondary font-mono uppercase tracking-widest mt-0.5 block">Certified Industrial Excellence since 1998</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
