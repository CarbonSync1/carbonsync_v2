import { Target, TrendingDown, ShieldCheck, Globe, ArrowUpRight } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Target size={28} />,
      title: "Measure Accurately",
      description: "Real-time tracking of carbon emissions across your entire operations with precision metrics.",
      color: "from-blue-500/10 to-blue-500/5",
      iconColor: "text-blue-600",
    },
    {
      icon: <TrendingDown size={28} />,
      title: "Reduce Strategically",
      description: "Data-driven strategies designed to cut footprint and operational costs effectively.",
      color: "from-emerald-500/10 to-emerald-500/5",
      iconColor: "text-emerald-600",
    },
    {
      icon: <ShieldCheck size={28} />,
      title: "Offset Responsibly",
      description: "Access to high-integrity, verified carbon credits and globally recognized climate projects.",
      color: "from-green-500/10 to-green-500/5",
      iconColor: "text-green-600",
    },
    {
      icon: <Globe size={28} />,
      title: "Achieve Net Zero",
      description: "Future-proof your business by reaching your sustainability milestones and ESG goals.",
      color: "from-teal-500/10 to-teal-500/5",
      iconColor: "text-teal-600",
    },
  ];

  return (
    <div className="bg-white py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-50/50 blur-[120px] rounded-full -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-50/50 blur-[120px] rounded-full -z-10"></div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-slate-50 text-slate-500 px-4 py-1.5 rounded-full text-[12px] font-black uppercase tracking-widest mb-6 border border-slate-100">
              Our Capabilities
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Comprehensive Solutions for <br />
              <span className="text-green-600">Climate Leadership</span>
            </h2>
          </div>
          <p className="text-slate-500 font-medium text-[16px] leading-relaxed max-w-sm">
            We provide the tools and expertise needed to transform your sustainability vision into measurable environmental impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group relative bg-white rounded-[32px] p-8 border border-slate-100 hover:border-green-500/30 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden cursor-default"
            >
              {/* Card Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-2xl bg-slate-50 ${feature.iconColor} flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110 group-hover:bg-white group-hover:shadow-lg shadow-slate-200/50`}>
                  {feature.icon}
                </div>
                
                <h3 className="font-black text-slate-900 mb-4 text-xl tracking-tight transition-colors duration-300 group-hover:text-green-700">
                  {feature.title}
                </h3>
                
                <p className="text-[14px] text-slate-500 font-medium leading-relaxed mb-8 transition-colors duration-300 group-hover:text-slate-600">
                  {feature.description}
                </p>

                <div className="flex items-center gap-2 text-[12px] font-black uppercase tracking-widest text-slate-400 group-hover:text-green-600 transition-colors">
                  Learn More <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
