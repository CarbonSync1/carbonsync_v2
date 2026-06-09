import { Star, Navigation, ArrowRight } from "lucide-react";

export default function LocationMap() {
  return (
    <div className="flex flex-col items-center py-32 bg-gray-50/20 px-8 md:px-16 border-t border-gray-100">
      <div className="text-center mb-16 animate-fade-in">
        <div className="inline-flex items-center justify-center bg-green-100/50 text-green-700 px-4 py-1.5 rounded-full text-[12px] font-bold uppercase tracking-wider mb-6 border border-green-200/50 cursor-default">
          Visit Us
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">Our Presence</h2>
      </div>

      <div className="w-full max-w-7xl relative h-[600px] bg-white rounded-[40px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.06)] border-[12px] border-white animate-slide-up group">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112117.82421376805!2d77.30156945!3d28.5355161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5a43173357b%3A0x37ffce30c87cc03f!2sNoida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1714545939281!5m2!1sen!2sin" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Maps CarbonSync Location"
          className="transition-all duration-1000"
        ></iframe>

        {/* Info Card Overlay */}
        <div className="absolute bottom-10 left-10 right-10 md:right-auto bg-white/95 backdrop-blur-md p-8 md:p-10 rounded-[32px] shadow-2xl border border-white/50 max-w-md flex flex-col md:flex-row justify-between gap-8 translate-y-4 group-hover:translate-y-0 transition-all duration-700">
          <div className="flex-grow">
            <h3 className="font-bold text-gray-900 text-2xl mb-3 tracking-tight">CarbonSync India</h3>
            <p className="text-[15px] text-gray-500 font-medium leading-relaxed mb-6">
              Corporate Office, Sector 62,<br />Noida, Uttar Pradesh 201301
            </p>
            
            <div className="flex items-center gap-2.5 mb-6">
              <span className="text-sm font-bold text-gray-900">4.9</span>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <span className="text-[11px] text-gray-400 font-bold ml-1 uppercase tracking-wider">24 Reviews</span>
            </div>

            <a href="https://www.google.com/maps/place/Noida,+Uttar+Pradesh/@28.5355161,77.30156945,12z" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[13px] font-bold text-green-600 hover:text-green-700 transition-colors group/link">
              Open in Google Maps <ArrowRight size={16} className="transition-transform group-hover/link:translate-x-1" />
            </a>
          </div>
          
          <a href="https://www.google.com/maps/dir//Sector+62,+Noida,+Uttar+Pradesh+201301" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0 md:pl-8 no-underline">
             <div className="w-16 h-16 flex items-center justify-center text-white bg-green-600 rounded-2xl cursor-pointer hover:bg-green-700 transition-all shadow-xl shadow-green-500/20 hover:scale-110 active:scale-95 mb-3">
               <Navigation size={28} />
             </div>
             <span className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">Directions</span>
          </a>
        </div>
      </div>
    </div>
  );
}
