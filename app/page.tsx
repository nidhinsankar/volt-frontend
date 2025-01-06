"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <main className="flex-1 pt-16">
        <section className="relative min-h-[80vh] flex items-center justify-center text-center px-4">
          <div className="relative z-10 max-w-4xl mx-auto space-y-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
            >
              <span className="text-coral-500 block mb-2">
                Discover Your Next Adventure with AI:
              </span>
              <span className="bg-gradient-to-r from-gray-900 to-gray-800 bg-clip-text text-transparent">
                Personalized Itineraries at Your Fingertips
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Your personal trip planner and travel curator, creating custom
              itineraries tailored to your interests and budget.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button
                size="lg"
                className="rounded-full px-8 py-6 text-lg font-medium"
              >
                Get Started, It{"'"}s Free
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
