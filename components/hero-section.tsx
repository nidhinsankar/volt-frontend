import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-950 dark:to-purple-900" />
      <div className="relative container pt-32 pb-20">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
            Discover Your Next Adventure with AI{" "}
            <Sparkles className="inline-block w-8 h-8 text-purple-400" />
          </h1>
          <h2 className="text-3xl sm:text-5xl font-semibold text-gray-800 dark:text-gray-200">
            Personalized Itineraries at Your Fingertips
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            Your personal trip planner and travel curator, creating custom
            itineraries tailored to your interests and budget.
          </p>
          <Button size="lg" className="text-lg px-8" asChild>
            <Link href="/get-started">Get Started, It&apos;s Free</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
