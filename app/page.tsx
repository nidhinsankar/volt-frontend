"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-violet-50/50">
      <main className="flex-1 pt-16">
        <section className="relative h-screen flex items-center justify-center text-center px-4">
          {/* Background Elements */}

          <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-950 dark:to-purple-900" />
          <div className="relative  pt-32 pb-20">
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
                <Link href="/create-trip">Get Started, It&apos;s Free</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
// {/* <div className="absolute inset-0 overflow-hidden">
//             <div className="absolute top-20 left-1/4 w-64 h-64 bg-violet-200/30 rounded-full blur-3xl" />
//             <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-violet-300/20 rounded-full blur-3xl" />
//           </div>

//           {/* Content */}
//           <div className="relative z-10 max-w-5xl mx-auto space-y-8">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, ease: "easeOut" }}
//               className="space-y-6"
//             >
//               <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
//                 <span className="inline-block mb-4">
//                   <span className="bg-gradient-to-r from-violet-600 to-violet-500 bg-clip-text text-transparent">
//                     Discover Your Next Adventure
//                   </span>
//                 </span>
//                 <br />
//                 <span className="inline-block">
//                   with{" "}
//                   <span className="inline-flex items-center">
//                     AI
//                     <Sparkles className="w-8 h-8 ml-2 text-violet-500" />
//                   </span>
//                 </span>
//               </h1>

//               <motion.h2
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: 0.2 }}
//                 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-gray-900/80"
//               >
//                 Personalized Itineraries
//                 <br />
//                 at Your Fingertips
//               </motion.h2>
//             </motion.div>

//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.4 }}
//               className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-medium"
//             >
//               Your personal trip planner and travel curator, creating custom
//               itineraries tailored to your interests and budget.
//             </motion.p>

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.6 }}
//               className="flex justify-center gap-6"
//             >
//               <Link
//                 href={`/create-trip`}
//                 className={buttonVariants({
//                   variant: "outline",
//                   className:
//                     "rounded-full px-8 py-6 text-lg font-medium bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-600 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300 group",
//                 })}
//               >
//                 Get Started, It{"'"}s Free
//                 <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
//               </Link>
//             </motion.div>
//           </div> */}
