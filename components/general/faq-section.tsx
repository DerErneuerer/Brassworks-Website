"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What happens if my balance runs out?",
    answer: "If your balance runs out, your server will stop immediately. Depending on its total runtime, you have either 3 or 24 hours to top up your account with Zenth and restart the server. Servers that have been running for more than 6 hours receive a 24-hour grace period."
  },
  {
    question: "How long can I restore my server?",
    answer: "Snapshots are retained for 30 days. You can restore your server at any time within this period. After 30 days, the snapshot is automatically deleted. For critical servers, we recommend maintaining a sufficient balance or setting up automatic payments to avoid any risk of data loss."
  },
  {
    question: "Why is hourly billing better than a subscription?",
    answer: "Hourly billing gives you complete control over your costs. You only pay for the time your server is active—no charges during downtime. This model is perfect for servers that don't need to be online 24/7, such as for weekend gaming sessions with friends."
  },
  {
    question: "How does the snapshot system work?",
    answer: "When your server stops, we automatically create a snapshot after either 3 or 24 hours, depending on the server's total runtime. This snapshot preserves the entire server state and is stored efficiently using LZ4 compression. You can fully restore your server within 30 days by adding funds and requesting a restore. The process usually takes just a few minutes."
  },
  {
    question: "Can I upgrade my server specs later?",
    answer: "Yes! You can upgrade your server specifications at any time. Upgrades are applied immediately, while downgrades take effect the next time the server restarts. Your hourly rate will adjust automatically based on the new configuration."
  },
  {
    question: "Do you offer custom solutions for larger communities?",
    answer: "Absolutely! For larger gaming communities with specific needs, we offer custom hosting solutions featuring dedicated resources, priority support, and tailored pricing. Please contact our sales team for more details."
  },
  {
    question: "Is there a minimum commitment period?",
    answer: "No, there are no minimum commitments. You can use our services for just a few hours if needed and only pay for what you actually use. Enjoy full flexibility with no long-term contracts or obligations."
  },
  {
    question: "How secure are your servers?",
    answer: "Security is our top priority. We use high-performance hardware with redundancy, regular security updates, DDoS protection, and daily backups. All data is securely stored, and we strictly follow industry best practices for server security."
  }
];

export function FaqSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.querySelector('.faq-section');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section className="py-20 faq-section">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground text-lg">
            Find answers to common questions about our game server hosting services.
            If you don't see your question here, feel free to contact us.
          </p>
        </div>

        <div 
          className={cn(
            "max-w-3xl mx-auto transition-all duration-500",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, idx) => (
              <AccordionItem 
                key={idx} 
                value={`item-${idx}`}
                className={cn(
                  "transition-all duration-500",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <AccordionTrigger className="text-lg font-medium py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}