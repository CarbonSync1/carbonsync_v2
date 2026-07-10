'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Factory, 
  Landmark, 
  GraduationCap, 
  Globe, 
  Check, 
  Users, 
  ChevronRight,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { useCases, UseCaseData } from '@/data/useCases';

// Map icon names to Lucide icon components
const IconMap = {
  Factory: Factory,
  Landmark: Landmark,
  GraduationCap: GraduationCap,
  Globe: Globe,
};

export default function InteractiveUseCases() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeUseCase = useCases[activeIndex];

  // Helper to get the correct icon component
  const getIcon = (name: keyof typeof IconMap, className?: string) => {
    const IconComp = IconMap[name];
    return IconComp ? <IconComp className={className} /> : null;
  };

  return (
    <section id="use-cases" className="relative bg-[#f8fafc] py-20 md:py-24 px-[5%] overflow-hidden border-t border-slate-100">
      {/* Decorative gradient backgrounds */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-eco-dark/5 rounded-full blur-3xl -translate-y-1/2 -z-10" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-eco-dark/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-[750px] mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-eco-dark/10 text-eco-dark text-[11px] font-bold uppercase tracking-widest mb-4">
            Industries & Use Cases
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-dark leading-tight tracking-tight mb-4">
            CarbonSync Across Every Industry
          </h2>
          <p className="text-base text-text-muted leading-relaxed">
            See how CarbonSync helps organizations measure, manage, and reduce carbon emissions across different sectors.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT PANEL: Vertical Selector on all viewport sizes */}
          <div className="md:col-span-4 flex flex-col justify-start">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 h-full flex flex-col justify-between">
              
              {/* Sidebar Header */}
              <div className="block mb-4 px-2">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                  Select Sector
                </h3>
                <p className="text-xs text-text-muted">Click to inspect industry requirements</p>
              </div>

              {/* Selector List: Always vertical */}
              <div className="flex flex-col gap-2 w-full">
                {useCases.map((useCase, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={useCase.id}
                      type="button"
                      // Switch on Click only (both desktop and mobile)
                      onClick={() => setActiveIndex(idx)}
                      className={`relative flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-left transition-all duration-300 ease-out select-none group cursor-pointer w-full ${
                        isActive 
                          ? 'text-white font-semibold scale-[1.02] shadow-md shadow-eco-dark/15 z-10' 
                          : 'text-text-dark bg-transparent hover:bg-slate-50 border border-transparent'
                      }`}
                    >
                      {/* Active sliding background (Framer Motion layoutId) using dark eco green */}
                      {isActive && (
                        <motion.div
                          layoutId="activeIndustryBg"
                          className="absolute inset-0 bg-eco-dark rounded-xl -z-10"
                          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                        />
                      )}

                      {/* Icon */}
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                        isActive ? 'bg-white/20 text-white' : 'bg-eco-dark/10 text-eco-dark group-hover:scale-105'
                      }`}>
                        {getIcon(useCase.iconName, "w-5 h-5")}
                      </div>

                      {/* Info */}
                      <div className="min-w-0 pr-2">
                        <div className="text-sm font-bold truncate leading-snug">
                          {useCase.name}
                        </div>
                        {useCase.subtitle && (
                          <div className={`text-[10px] truncate leading-normal transition-colors duration-300 ${
                            isActive ? 'text-white/80' : 'text-text-muted'
                          }`}>
                            {useCase.subtitle}
                          </div>
                        )}
                      </div>

                      {/* Right Indicator Arrow */}
                      <ChevronRight className={`block w-4 h-4 ml-auto transition-all duration-300 ${
                        isActive ? 'text-white translate-x-0.5' : 'text-slate-300 group-hover:text-eco-dark'
                      }`} />
                    </button>
                  );
                })}
              </div>

              {/* Sidebar Footer */}
              <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-50 text-[11px] text-text-muted px-2">
              </div>

            </div>
          </div>

          {/* RIGHT PANEL: Dynamic Content Panel */}
          <div className="md:col-span-8">
            <div className="relative min-h-[580px] h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between h-full"
                >
                  
                  {/* Card Content Wrapper */}
                  <div className="p-6 sm:p-8">
                    
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-50">
                      <div className="flex items-center gap-4">
                        {/* Animated Icon Wrapper */}
                        <motion.div 
                          initial={{ scale: 0.8, rotate: -10 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                          className="w-14 h-14 bg-eco-dark/15 text-eco-dark rounded-xl flex items-center justify-center shadow-inner"
                        >
                          {getIcon(activeUseCase.iconName, "w-7 h-7")}
                        </motion.div>
                        <div>
                          <h3 className="text-2xl font-bold text-text-dark flex items-center gap-2">
                            {activeUseCase.name}
                          </h3>
                          <p className="text-xs text-text-muted mt-0.5">{activeUseCase.subtitle}</p>
                        </div>
                      </div>

                      {/* Tag for sector specificity */}
                      <span className="self-start sm:self-center px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-[11px] font-semibold text-text-muted flex items-center gap-1.5">
                        <Users className="w-3 h-3 text-eco-dark" />
                        Enterprise Standard
                      </span>
                    </div>

                    {/* Description & Primary Users Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 py-6 border-b border-slate-50">
                      
                      {/* Left: Short Description */}
                      <div className="lg:col-span-2">
                        <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2.5">
                          Description
                        </h4>
                        <p className="text-sm sm:text-base text-text-muted leading-relaxed">
                          {activeUseCase.description}
                        </p>
                      </div>

                      {/* Right: Primary Users */}
                      <div className="bg-slate-50/50 rounded-xl p-4 border border-slate-100/50 self-start">
                        <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-eco-dark" />
                          Primary Users
                        </h4>
                        <div className="flex flex-col gap-2">
                          {activeUseCase.primaryUsers.map((user) => (
                            <span 
                              key={user}
                              className="inline-flex items-center text-xs font-semibold text-text-dark bg-white border border-slate-100 px-3 py-1.5 rounded-lg shadow-2xs"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-eco-dark mr-2" />
                              {user}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Challenges vs Solution Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-6">
                      
                      {/* Column 1: Business Challenges */}
                      <div>
                        <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                          Business Challenges
                        </h4>
                        <ul className="space-y-3">
                          {activeUseCase.businessChallenges.map((challenge, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-sm text-text-muted leading-relaxed">
                              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center mt-0.5">
                                <span className="text-[10px] font-bold">!</span>
                              </span>
                              <span>{challenge}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Column 2: CarbonSync Solution */}
                      <div>
                        <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-eco-dark" />
                          CarbonSync Solution
                        </h4>
                        <ul className="space-y-3">
                          {activeUseCase.carbonsyncSolution.map((solution, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-sm text-text-muted leading-relaxed">
                              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-eco-dark/10 text-eco-dark flex items-center justify-center mt-0.5">
                                <Check className="w-3 h-3 stroke-[3]" />
                              </span>
                              <span className="text-text-dark font-medium">{solution}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                    </div>

                  </div>

                  {/* Footer Banner: Key Value Delivered (Darker Green Theme) */}
                  <div className="bg-eco-dark/5 border-t border-eco-dark/10 px-6 py-5 sm:px-8">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6 justify-between">
                      <div className="flex-shrink-0">
                        <h4 className="text-[10px] font-extrabold text-eco-dark uppercase tracking-widest mb-0.5">
                          Key Value Delivered
                        </h4>
                        <span className="text-xs text-eco-dark font-semibold">Quantifiable Benefits</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-1 lg:pl-4">
                        {activeUseCase.keyBenefits.map((benefit, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <span className="flex-shrink-0 w-2 h-2 rounded-full bg-eco-dark" />
                            <span className="text-xs font-bold text-slate-800 leading-snug">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
