"use client";

import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import ScrollReveal from "../../components/ScrollReveal";
import AnalyticsLink from "../../components/AnalyticsLink";
import PackageModal from "./PackageModal";

interface Package {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: readonly string[];
  cta: string;
  popular: boolean;
}

interface PricingSectionProps {
  packages: readonly Package[];
}

export default function PricingSection({ packages }: PricingSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  const handlePackageClick = (pkg: Package) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <section id="packages" className="py-20 px-6 bg-card/40">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal direction="up" delay={0}>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Choose Your Package
            </h2>
            <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
              Flexible plans that scale with your needs. No long-term commitment required.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {packages.map((pkg, index) => (
              <ScrollReveal key={pkg.id} direction="up" delay={0.1 + index * 0.1}>
                <div
                  className={`relative bg-card border rounded-3xl p-6 lg:p-8 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                    pkg.popular
                      ? "border-accent shadow-lg shadow-accent/10"
                      : "border-border hover:border-accent/30"
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="px-4 py-1 rounded-full bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wider">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{pkg.description}</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold">{pkg.price}</span>
                      <span className="text-muted-foreground">{pkg.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8 flex-grow">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check size={18} className="text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handlePackageClick(pkg)}
                    className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                      pkg.popular
                        ? "bg-accent text-accent-foreground hover:bg-accent/90"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {pkg.cta}
                    <ArrowRight size={16} />
                  </button>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal direction="up" delay={0.4}>
            <p className="text-center text-muted-foreground text-sm mt-8">
              Need a custom package?{" "}
              <AnalyticsLink
                href="/contact?src=monthly_content_custom"
                event="monthly_content_pricing_custom"
                className="text-accent hover:underline underline-offset-4"
              >
                Let&apos;s talk
              </AnalyticsLink>
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Package Modal */}
      {selectedPackage && (
        <PackageModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          packageName={selectedPackage.name}
          packageId={selectedPackage.id}
        />
      )}
    </>
  );
}






