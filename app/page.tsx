"use client";

import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const FloatingElement = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{
      duration: 0.8,
      delay,
      ease: [0.21, 1.11, 0.81, 0.99],
    }}
  >
    {children}
  </motion.div>
);

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <section className="relative min-h-screen flex items-center justify-center">
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-violet-50/50" />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-20 left-1/4 w-96 h-96 bg-violet-200/30 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"
            />
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 py-32 text-center">
            <AnimatePresence>
              {mounted && (
                <>
                  <FloatingElement>
                    <motion.div
                      className="inline-block mb-4 px-6 py-2 rounded-full bg-white/50 backdrop-blur-sm border border-purple-100 shadow-sm"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent font-medium">
                        ✨ Your AI-Powered Travel Companion
                      </span>
                    </motion.div>
                  </FloatingElement>

                  <FloatingElement delay={0.1}>
                    <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-8">
                      <span className="inline-block bg-gradient-to-r from-purple-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                        Discover Your Next
                      </span>
                      <br />
                      <motion.span
                        className="inline-block bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent"
                        animate={{
                          backgroundPosition: ["0%", "100%"],
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                      >
                        Adventure with AI{" "}
                        <motion.span
                          animate={{
                            rotate: [0, 10, 0],
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="inline-block"
                        >
                          <Sparkles className="inline-block w-12 h-12 text-violet-500" />
                        </motion.span>
                      </motion.span>
                    </h1>
                  </FloatingElement>

                  <FloatingElement delay={0.2}>
                    <h2 className="text-4xl sm:text-5xl font-semibold text-gray-800 mb-8">
                      Personalized Itineraries
                      <br />
                      at Your Fingertips
                    </h2>
                  </FloatingElement>

                  <FloatingElement delay={0.3}>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
                      Your personal trip planner and travel curator, creating
                      custom itineraries tailored to your interests and budget.
                    </p>
                  </FloatingElement>

                  <FloatingElement delay={0.4}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        size="lg"
                        className="text-lg px-8 py-6 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300"
                        asChild
                      >
                        <Link href="/create-trip" className="group">
                          Get Started, It&apos;s Free
                          <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </motion.div>
                  </FloatingElement>

                  {/* Floating Decorative Elements */}
                  <motion.div
                    className="absolute left-10 top-1/4 w-4 h-4 rounded-full bg-purple-400"
                    animate={{
                      y: [0, 20, 0],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="absolute right-10 bottom-1/4 w-6 h-6 rounded-full bg-violet-400"
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                  />
                </>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>
    </div>
  );
}
