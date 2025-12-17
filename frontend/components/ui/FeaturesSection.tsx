import { Users, Shield, BarChart3, Smartphone, Zap, Globe, LucideIcon } from "lucide-react";

/**
 * OPTIMIZATION: Features array moved outside component
 * - Prevents recreation on every render
 * - Uses LucideIcon type reference instead of inline JSX
 * - Array is stable reference (same object identity across renders)
 */
interface Feature {
  IconComponent: LucideIcon;
  title: string;
  description: string;
}

const features: readonly Feature[] = [
  {
    IconComponent: Users,
    title: "Smart User Management",
    description:
      "Seamlessly manage members, staff, and visitors with role-based access control",
  },
  {
    IconComponent: Shield,
    title: "Biometric Security",
    description:
      "Advanced fingerprint and facial recognition for secure workspace access",
  },
  {
    IconComponent: BarChart3,
    title: "Real-time Analytics",
    description:
      "Track workspace utilization, member engagement, and revenue insights",
  },
  {
    IconComponent: Smartphone,
    title: "Mobile-First Design",
    description:
      "Native mobile apps for seamless check-ins and workspace bookings",
  },
  {
    IconComponent: Zap,
    title: "Automated Billing",
    description:
      "Flexible subscription models with integrated payment processing",
  },
  {
    IconComponent: Globe,
    title: "Blockchain Integration",
    description:
      "Transparent payments and immutable audit logs powered by Stellar",
  },
] as const;

const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="relative z-10 px-4 py-30 bg-[#f8fafc] backdrop-blur-sm"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Powerful Features Coming Your Way
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the next generation of workspace management with
            cutting-edge technology
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.IconComponent;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1"
              >
                <div className="bg-gradient-to-br from-blue-100 to-teal-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
