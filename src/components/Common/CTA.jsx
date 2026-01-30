import { ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";

export function CTA({ onGetStarted }) {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative order-2 md:order-1">
            <div className="absolute inset-0 bg-white/10 rounded-3xl blur-2xl"></div>
            <img
              src="https://images.unsplash.com/photo-1543269865-cbf427effbad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwc3VjY2VzcyUyMGNvbGxlZ2V8ZW58MXx8fHwxNzM3NzU0MjU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Students succeeding"
              className="relative rounded-3xl shadow-2xl w-full h-auto"
            />
          </div>

          <div className="order-1 md:order-2">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Counseling?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join counselors across the country who are helping students find their perfect path. Spend less time researching and more time guiding.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={onGetStarted} className="bg-white text-blue-600 hover:bg-gray-100 text-lg">
                Try PathFinder Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg border-white text-white hover:bg-white/10">
                Schedule a Demo
              </Button>
            </div>
            
            <div className="mt-8 flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-blue-300 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-purple-300 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-green-300 border-2 border-white"></div>
                </div>
                <span className="text-blue-100">500+ counselors helping 10,000+ students</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
