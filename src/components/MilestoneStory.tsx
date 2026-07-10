'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

export default function MilestoneStory() {
  return (
    <section id="milestone" className="relative bg-white py-16 md:py-20 px-[5%] overflow-hidden border-t border-slate-100">
      <div className="max-w-[1000px] mx-auto">
        
        {/* Story Text Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center max-w-[720px] mx-auto mb-10 md:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-text-dark leading-tight tracking-tight mb-4">
            A Milestone Worth Remembering
          </h2>
          <p className="text-base text-text-muted leading-relaxed">
            CarbonSynq Earth was officially launched during our visit to Indonesia. This photograph captures the moment our vision became a reality marking the beginning of our mission to help organizations measure, manage, and reduce their carbon emissions through intelligent carbon accounting.
          </p>
        </motion.div>

        {/* Large Story Image Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          className="group relative rounded-3xl overflow-hidden shadow-lg border border-slate-100/50 aspect-[16/10] sm:aspect-[16/9] w-full"
        >
          {/* Subtle Hover Zoom Image */}
          <div className="relative w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.02]">
            <Image
              src="/indonesia-launch.jpg"
              alt="CarbonSynq Earth Launch in Indonesia"
              fill
              priority
              className="object-cover object-center"
              sizes="(max-w-1000px) 100vw, 1000px"
            />
          </div>

          {/* Slight Dark Gradient Overlay for Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />

          {/* Text Overlay (Bottom-Left) */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 flex flex-col items-start gap-2 sm:gap-3 text-white">
            
            {/* Badge: Indonesia */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-wide text-white/95">
              <MapPin className="w-3.5 h-3.5 text-eco-dark fill-white/20" />
              Indonesia
            </span>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">
              CarbonSynq Earth Launch
            </h3>

            {/* Caption */}
            <p className="text-xs sm:text-sm text-white/80 font-medium italic">
              "The moment our vision became reality."
            </p>

          </div>

        </motion.div>

      </div>
    </section>
  );
}
