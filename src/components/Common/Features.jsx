import { Compass, DollarSign, TrendingUp, Target } from "lucide-react";
import { Card } from "../ui/Card";

export function Features() {
  const features = [
    {
      icon: Compass,
      title: "Personalized Career Matching",
      description: "Input student interests and strengths to receive tailored career recommendations that align with their unique profile.",
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      icon: DollarSign,
      title: "Scholarship Recommendations",
      description: "Instantly match students with 1000+ scholarships based on their academics, sports, interests, and financial situation.",
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      icon: TrendingUp,
      title: "College & Career Matching",
      description: "Get data-driven college and career suggestions based on CGPA, JEE/NEET scores, sports, and student aspirations.",
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      icon: Target,
      title: "Financial Analysis",
      description: "Understand each student's financial needs and match them with appropriate aid packages and affordable options.",
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    }
  ];

  return (
    <section id="features" className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything You Need in One Platform
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Streamline your counseling process and help more students find their perfect path.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="p-6 hover:shadow-xl transition-shadow border-2 border-gray-100">
                <div className={`${feature.bgColor} ${feature.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
