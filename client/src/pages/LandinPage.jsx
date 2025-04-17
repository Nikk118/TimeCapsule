import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navbar */}
      

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Preserve Memories for the Future
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
          Capture your thoughts, photos, and messages today to unlock them in the future. 
          A digital time capsule for you and your loved ones.
        </p>
        <div className="space-x-4">
          <Link 
            to="/login" 
            className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
          >
            Create Your Capsule
          </Link>
         
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Time Capsule?</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              icon: "⏳",
              title: "Set Your Date",
              desc: "Choose when your capsule unlocks—1 year, 5 years, or even decades later."
            },
            {
              icon: "🔒",
              title: "Secure Storage",
              desc: "Encrypted and stored safely until your chosen reveal date."
            },
            {
              icon: "🎁",
              title: "Surprise Yourself",
              desc: "Rediscover forgotten memories and see how much you've grown."
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-sm text-center">
              <span className="text-4xl mb-4 inline-block">{feature.icon}</span>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-6">Ready to Begin Your Journey?</h2>
          <p className="text-xl mb-8 opacity-90">
            Sign up now and send a message to your future self—it's free and takes just 2 minutes!
          </p>
          <Link 
            to="/signup" 
            className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-50 transition inline-block"
          >
            Get Started
          </Link>
        </div>
      </section>

    
      
    </div>
  );
}