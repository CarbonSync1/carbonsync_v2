'use client';


const plans = [
  {
    name: "Starter",
    desc: "For small teams beginning carbon tracking",
    features: [
      "Basic emission tracking",
      "Scope 1 & 2 dashboard",
      "Manual data entry",
      "Monthly carbon reports",
      "Basic Net Zero roadmap",
    ],
    button: "Get Started",
    highlighted: false,
  },
  {
    name: "Growth",
    desc: "For growing businesses managing multiple locations",
    features: [
      "Everything in Starter",
      "Scope 1, 2 & 3 tracking",
      "Supplier data collection",
      "AI emission insights",
      "Reduction recommendations",
      "Exportable compliance reports",
    ],
    button: "Start Free Demo",
    highlighted: true,
  },
  {
    name: "Professional",
    desc: "Advanced carbon intelligence",
    features: [
      "Everything in Growth",
      "Real-time analytics dashboard",
      "Custom emission factors",
      "Team collaboration",
      "Target tracking",
      "Audit-ready reports",
      "API integrations",
    ],
    button: "Talk to Sales",
    highlighted: false,
  },
  {
    name: "Enterprise",
    desc: "Complex enterprise Net Zero needs",
    features: [
      "Everything in Professional",
      "Unlimited business units",
      "Dedicated implementation support",
      "Advanced compliance workflows",
      "Custom integrations",
      "Enterprise security",
      "Priority support",
    ],
    button: "Contact Us",
    highlighted: false,
  },
];

const faqs = [
  {
    question: "Can I switch plans anytime?",
    answer: "Yes, you can upgrade or downgrade your plan at any time from your dashboard. Changes take effect in the next billing cycle.",
  },
  {
    question: "Do you offer custom emission factors?",
    answer: "Yes, the Professional and Enterprise plans allow you to input custom emission factors tailored to your specific operations and supply chain.",
  },
  {
    question: "Is my data secure?",
    answer: "Data security is our top priority. We use enterprise-grade encryption and are SOC2 Type II compliant to ensure your sustainability data is always protected.",
  },
  {
    question: "Can we integrate CarbonSync with our ERP?",
    answer: "Yes, our Professional and Enterprise plans include API access and pre-built integrations for major ERP and utility management systems.",
  },
];

export default function CarbonSyncPricingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb33_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb33_1px,transparent_1px)] bg-[size:60px_60px]" />

      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <h1
              className="text-5xl font-bold leading-tight"
            >
              Choose the Right Plan for Your
              <span className="block bg-gradient-to-r from-green-500 to-cyan-500 bg-clip-text text-transparent">
                Net Zero Journey
              </span>
            </h1>

            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Flexible carbon management plans built for startups,
              growing businesses, and enterprises to track emissions,
              reduce footprint, and accelerate Net Zero goals.
            </p>

            <div className="mt-10 flex gap-4">
              <button className="px-6 py-3 rounded-2xl bg-gradient-to-r from-green-500 to-cyan-500 text-white font-semibold shadow-lg hover:scale-105 transition">
                Book Demo
              </button>

              <button className="px-6 py-3 rounded-2xl border border-gray-300 hover:border-green-400 transition">
                View Features
              </button>
            </div>
          </div>

          <div
            className="relative flex justify-center"
          >
            <div className="w-[420px] h-[320px] rounded-[32px] bg-gradient-to-br from-green-100 to-cyan-100 shadow-2xl border border-white/50 backdrop-blur-xl p-6">
              <div className="bg-white rounded-2xl p-5 shadow-lg">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Carbon Analytics</h3>
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>

                <div className="mt-8 flex items-end gap-4 h-40">
                  <div className="w-12 bg-green-400 rounded-t-xl h-20" />
                  <div className="w-12 bg-cyan-400 rounded-t-xl h-28" />
                  <div className="w-12 bg-green-500 rounded-t-xl h-36" />
                  <div className="w-12 bg-cyan-500 rounded-t-xl h-24" />
                </div>
              </div>

              <div className="absolute -top-6 -right-6 w-24 h-24 bg-green-400 rounded-3xl blur-2xl opacity-40" />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-cyan-400 rounded-3xl blur-2xl opacity-40" />
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl p-[1px] ${
                plan.highlighted
                  ? "bg-gradient-to-r from-green-500 to-cyan-500 shadow-2xl"
                  : "bg-gray-200"
              }`}
            >
              <div className="h-full rounded-3xl bg-white p-8">
                {plan.highlighted && (
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-green-500 to-cyan-500 text-white text-xs font-semibold">
                    Most Popular
                  </div>
                )}

                <h3 className="text-2xl font-bold">{plan.name}</h3>

                <p className="mt-3 text-gray-500">{plan.desc}</p>

                <button
                  className={`mt-8 w-full py-3 rounded-2xl font-semibold transition ${
                    plan.highlighted
                      ? "bg-gradient-to-r from-green-500 to-cyan-500 text-white hover:scale-105"
                      : "border border-gray-300 hover:border-green-400"
                  }`}
                >
                  {plan.button}
                </button>

                <div className="mt-8 space-y-4">
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-3 text-sm text-gray-600"
                    >
                      <div className="mt-1 w-2 h-2 rounded-full bg-green-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-24 text-center">
        <p className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em] mb-10">
          Trusted by global sustainability leaders
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-10 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
          <span className="text-3xl font-black tracking-tighter">ECOFLOW</span>
          <span className="text-3xl font-black tracking-tighter">GREENWATT</span>
          <span className="text-3xl font-black tracking-tighter">TERRAFORM</span>
          <span className="text-3xl font-black tracking-tighter">SOLARCITY</span>
          <span className="text-3xl font-black tracking-tighter">PUREAIR</span>
        </div>
      </section>

      <section className="relative z-10 max-w-4xl mx-auto px-6 pb-24">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold">Frequently Asked Questions</h2>
          <p className="mt-4 text-gray-600 text-lg">
            Everything you need to know about our plans and features.
          </p>
        </div>

        <div className="grid gap-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="group rounded-3xl border border-gray-100 bg-white p-8 hover:border-green-200 transition-all shadow-sm hover:shadow-md"
            >
              <h4 className="text-xl font-bold text-gray-900 flex items-center gap-4">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]" />
                {faq.question}
              </h4>
              <p className="mt-4 text-gray-600 leading-relaxed pl-6 text-lg">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div
            >
              <h2 className="text-5xl font-bold leading-tight">
                Have questions? <br />
                <span className="bg-gradient-to-r from-green-500 to-cyan-500 bg-clip-text text-transparent">
                  Let's talk.
                </span>
              </h2>
              <p className="mt-6 text-gray-600 text-lg leading-relaxed">
                Our team of sustainability experts is here to help you find the
                perfect carbon management plan for your organization's unique
                Net Zero journey.
              </p>

              <div className="mt-12 space-y-8">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 shadow-sm">
                    <svg
                      className="w-7 h-7"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Email us</h4>
                    <p className="text-gray-500">hello@carbonsync.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-cyan-50 flex items-center justify-center text-cyan-600 shadow-sm">
                    <svg
                      className="w-7 h-7"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Our HQ</h4>
                    <p className="text-gray-500">London, United Kingdom</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="bg-white rounded-[40px] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-green-400/5 rounded-full blur-3xl -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-cyan-400/5 rounded-full blur-3xl -ml-20 -mb-20" />

            <form
              action="https://formspree.io/f/xojyggok"
              method="POST"
              className="relative z-10 space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="John Doe"
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 focus:bg-white transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">
                    Work Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="john@company.com"
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">
                  Interested in
                </label>
                <select
                  name="subject"
                  className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 focus:bg-white transition-all appearance-none"
                >
                  <option>Growth Plan Inquiry</option>
                  <option>Enterprise Custom Quote</option>
                  <option>Request a Platform Demo</option>
                  <option>General Sustainability Support</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">
                  How can we help?
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell us about your organization's goals..."
                  className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 focus:bg-white transition-all resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-5 rounded-2xl bg-gradient-to-r from-green-500 to-cyan-500 text-white font-bold shadow-xl shadow-green-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
              >
                Send Message
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-24">
        <div className="rounded-[40px] bg-gradient-to-r from-green-500 to-cyan-500 p-[1px] shadow-2xl">
          <div className="rounded-[40px] bg-white px-10 py-16 text-center">
            <h2 className="text-4xl font-bold">
              Ready to simplify your Net Zero journey?
            </h2>

            <p className="mt-4 text-gray-600 text-lg">
              Start tracking emissions and accelerate sustainability with
              CarbonSync.
            </p>

            <button className="mt-8 px-10 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-cyan-500 text-white font-bold hover:scale-105 transition shadow-lg">
              Get Started for Free
            </button>
          </div>
        </div>
      </section>

      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        <div className="rounded-[40px] bg-gray-900 p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -ml-32 -mb-32" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white">
                Stay updated on sustainability
              </h2>
              <p className="mt-4 text-gray-400 text-lg">
                Join 5,000+ sustainability leaders receiving our weekly
                insights on carbon tracking and Net Zero strategies.
              </p>
            </div>
            <form className="flex gap-4">
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
              />
              <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-cyan-500 text-white font-bold hover:scale-105 transition-all">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="relative z-10 max-w-7xl mx-auto px-6 py-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-500 to-cyan-500" />
          <span className="text-xl font-bold tracking-tight text-gray-900">CarbonSync</span>
        </div>
        <p className="text-gray-500 text-sm">
          © 2026 CarbonSync Technologies. All rights reserved.
        </p>
        <div className="flex gap-8 text-sm font-medium text-gray-600">
          <a href="#" className="hover:text-green-600 transition">Privacy Policy</a>
          <a href="#" className="hover:text-green-600 transition">Terms of Service</a>
          <a href="#" className="hover:text-green-600 transition">Cookie Settings</a>
        </div>
      </footer>
    </div>
  );
}
