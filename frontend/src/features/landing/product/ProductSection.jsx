export const Product = () => {
  return (
    <section className="bg-gray-50 py-16 px-6 md:px-16">
      {/* HERO */}
      <div className="grid md:grid-cols-2 gap-10 items-center mb-20">
        {/* Left */}
        <div>
          <p className="text-sm text-blue-600 font-semibold mb-2">
            PRODUCT OVERVIEW
          </p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Build your flow.
          </h1>
          <p className="text-gray-600 mb-6">
            Stop fighting your software. Nexus CRM provides the intuitive
            structure that lets your team focus on relationships, not busywork.
          </p>

          <div className="flex gap-4">
            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
              Get Started
            </button>
            <button className="border border-gray-300 px-5 py-2 rounded-lg font-medium hover:bg-gray-100 transition">
              Learn More
            </button>
          </div>
        </div>

        {/* Right */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop"
            alt="dashboard"
            className="rounded-xl shadow-xl"
          />

          {/* Floating Card */}
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg w-56">
            <p className="text-sm font-semibold mb-1">Designed for Clarity</p>
            <p className="text-xs text-gray-500 mb-2">
              A clean interface with intuitive navigation.
            </p>
            <p className="text-blue-600 font-bold text-lg">99%</p>
            <p className="text-xs text-gray-500">
              Uptime for our platform reliability.
            </p>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div className="mb-20">
        <p className="text-sm text-blue-600 font-semibold mb-2">
          CORE FEATURES
        </p>
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          The tools to architect success.
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Centralized Inbox",
              desc: "Unify all conversations across email, chat, and messaging apps.",
            },
            {
              title: "Smart Automation",
              desc: "Eliminate routine tasks with rule-based workflows.",
            },
            {
              title: "Real-time Analytics",
              desc: "Track performance and gain actionable insights instantly.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition"
            >
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* INFO SECTION */}
      <div className="grid md:grid-cols-2 gap-10 items-center mb-20">
        {/* Left */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Master your data without the friction.
          </h2>
          <p className="text-gray-600 mb-6">
            Gain real-time insights and streamline workflows with tools designed
            for clarity and efficiency.
          </p>

          <ul className="space-y-3">
            <li className="bg-white p-4 rounded-lg border shadow-sm">
              🔹 Layered architecture
            </li>
            <li className="bg-white p-4 rounded-lg border shadow-sm">
              🔹 Universal search
            </li>
          </ul>
        </div>

        {/* Right */}
        <img
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop"
          alt="data analytics dashboard"
          className="rounded-xl shadow-xl"
        />
      </div>

      {/* CTA */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Ready to curate your workflow?
        </h2>
        <p className="text-gray-600 mb-6">
          Join thousands of teams already using Nexus CRM.
        </p>

        <div className="flex justify-center gap-4">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition">
            Start Your Free Trial
          </button>
          <button className="border border-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition">
            Book a Live Demo
          </button>
        </div>
      </div>
    </section>
  );
};
