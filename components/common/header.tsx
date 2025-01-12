"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Header = () => {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full top-0 z-50 bg-white/60 backdrop-blur-xl border-b border-gray-200/30"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-violet-500 shadow-lg shadow-violet-500/25 transition-all duration-300 group-hover:shadow-violet-500/40 group-hover:scale-105" />
          <span className="text-xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-violet-600 to-violet-500 bg-clip-text text-transparent">
              GOT
            </span>
            rip AI
          </span>
        </Link>
        <div className="flex items-center space-x-6">
          <Link
            className={cn(
              buttonVariants({ variant: "outline" }),
              "border-violet-200 hover:border-violet-300 hover:bg-violet-50 transition-colors duration-300"
            )}
            href="/create-trip"
          >
            Create Trip
          </Link>
          <Link
            className={cn(
              buttonVariants({ variant: "default" }),
              "bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-600 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300"
            )}
            href="/dashboard"
          >
            Explore
          </Link>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
