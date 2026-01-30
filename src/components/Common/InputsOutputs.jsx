import { ArrowRight, Award, Calculator, Heart, TrendingUp, Wallet, Trophy, GraduationCap, Briefcase } from "lucide-react";
import { Card } from "../ui/Card";

export function InputsOutputs() {
  const inputs = [
    { icon: Heart, label: "Student Interests", color: "text-pink-600", bgColor: "bg-pink-100" },
    { icon: Calculator, label: "CGPA & Board %", color: "text-blue-600", bgColor: "bg-blue-100" },
    { icon: Trophy, label: "Sports & Activities", color: "text-orange-600", bgColor: "bg-orange-100" },
    { icon: TrendingUp, label: "JEE/NEET Scores", color: "text-purple-600", bgColor: "bg-purple-100" },
    { icon: Wallet, label: "Financial Situation", color: "text-green-600", bgColor: "bg-green-100" }
  ];

  const outputs = [
    { icon: GraduationCap, label: "College Matches", color: "text-blue-600", bgColor: "bg-blue-100" },
    { icon: Briefcase, label: "Career Paths", color: "text-purple-600", bgColor: "bg-purple-100" },
    { icon: Award, label: "Scholarships", color: "text-green-600", bgColor: "bg-green-100" }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Simple Inputs, Powerful Outputs
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enter key student data and receive comprehensive recommendations in seconds
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
          {/* Inputs */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-center lg:text-left">Student Inputs</h3>
            <div className="space-y-4">
              {inputs.map((input, index) => {
                const Icon = input.icon;
                return (
                  <Card key={index} className="p-4 border-2 border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                      <div className={`${input.bgColor} ${input.color} w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="font-semibold">{input.label}</span>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center items-center">
            <div className="hidden lg:block">
              <ArrowRight className="h-12 w-12 text-blue-600" />
            </div>
            <div className="lg:hidden rotate-90">
              <ArrowRight className="h-12 w-12 text-blue-600" />
            </div>
          </div>

          {/* Outputs */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-center lg:text-left">PathFinder Results</h3>
            <div className="space-y-4">
              {outputs.map((output, index) => {
                const Icon = output.icon;
                return (
                  <Card key={index} className="p-6 border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3">
                      <div className={`${output.bgColor} ${output.color} w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <span className="font-bold text-lg block">{output.label}</span>
                        <span className="text-sm text-gray-600">Personalized recommendations</span>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        {/* Value Proposition */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full">
            <span className="font-semibold">5 inputs → 3 comprehensive output categories</span>
          </div>
        </div>
      </div>
    </section>
  );
}
