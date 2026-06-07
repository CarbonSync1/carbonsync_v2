'use client'

export default function StickyCTA() {
  return (
    <button
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:bg-emerald-500 transition-colors cursor-pointer"
      onClick={() => {
        const event = new CustomEvent('openDemoModal');
        window.dispatchEvent(event);
      }}
    >
      Book a Demo
    </button>
  );
}
