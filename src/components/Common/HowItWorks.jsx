import { CheckCircle2 } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Enter Student Information",
      description: "Input student interests, CGPA, entrance exam scores, extracurricular activities, and financial situation into the platform."
    },
    {
      number: "02",
      title: "Get AI-Powered Matches",
      description: "Our algorithm analyzes the data and generates personalized college, career, and scholarship recommendations."
    },
    {
      number: "03",
      title: "Review Recommendations",
      description: "Explore curated lists of colleges, career paths, and scholarship opportunities tailored to each student."
    },
    {
      number: "04",
      title: "Guide Student Planning",
      description: "Use the insights to have informed conversations and help students make confident decisions about their future."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How PathFinder Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Four simple steps to help your students find their perfect path
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border-2 border-gray-100">
                <div className="text-5xl font-bold text-blue-100 mb-4">{step.number}</div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-blue-200"></div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6">
                Why Counselors Choose PathFinder
              </h3>
              <ul className="space-y-4">
                {[
                  "Save hours on research and planning for each student",
                  "Data-driven recommendations based on comprehensive student profiles",
                  "Updated scholarship database with new opportunities daily",
                  "Track multiple students and their unique pathways",
                  "Export reports for student meetings and parent conferences"
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl opacity-10 blur-2xl"></div>
              <img
                src="https://images.unsplash.com/photo-1768767099805-4b07e76094d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFkdWF0aW9uJTIwc3VjY2VzcyUyMGNlbGVicmF0aW9ufGVufDF8fHx8MTc2OTE4OTE4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Student success"
                className="relative rounded-2xl shadow-xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
