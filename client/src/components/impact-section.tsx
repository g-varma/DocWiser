import { Star } from "lucide-react";

export default function ImpactSection() {
  const impactStats = [
    { number: "50K+", label: "Documents Processed" },
    { number: "98%", label: "Accessibility Score Improvement" },
    { number: "15K+", label: "People Helped Daily" },
    { number: "24/7", label: "Always Available" }
  ];

  const userStories = [
    {
      name: "Marcus J.",
      role: "Screen Reader User",
      quote: "For the first time, I can independently access my bank statements and medical bills. AccessiPDF gave me back control over my financial documents.",
      avatar: "M"
    },
    {
      name: "Sarah K.",
      role: "Accessibility Coordinator",
      quote: "AccessiPDF has revolutionized how our organization handles document accessibility. What used to take hours now takes minutes.",
      avatar: "S"
    }
  ];

  return (
    <section className="bg-white py-20" id="impact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Real-World Impact</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">See how AccessiPDF is transforming lives and creating independence for millions of people.</p>
        </div>

        {/* Impact Statistics */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {impactStats.map((stat, index) => (
            <div key={index} className="text-center fade-in" data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}>
              <div className={`text-4xl font-bold mb-2 ${
                index === 0 ? 'text-primary-500' : 
                index === 1 ? 'text-success-500' : 
                index === 2 ? 'text-accent-500' : 
                'text-primary-500'
              }`}>
                {stat.number}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* User Stories */}
        <div className="grid md:grid-cols-2 gap-8">
          {userStories.map((story, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-xl fade-in card-hover" data-testid={`story-${story.name.toLowerCase().replace(/\s+/g, '-')}`}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  {story.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{story.name}</div>
                  <div className="text-sm text-gray-600">{story.role}</div>
                </div>
              </div>
              <blockquote className="text-gray-700 italic mb-4">
                "{story.quote}"
              </blockquote>
              <div className="flex text-yellow-400" aria-label="5 star rating">
                {[1, 2, 3, 4, 5].map((starIndex) => (
                  <Star key={starIndex} className="w-5 h-5 fill-current" aria-hidden="true" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
