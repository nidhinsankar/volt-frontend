"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TagCloudProps {
  tags: string[];
  activeTag?: string | undefined | null;
  onTagClick: (tag: string) => void;
}

export function TagCloud({ tags, activeTag, onTagClick }: TagCloudProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const initialTagCount = 20;

  const visibleTags = isExpanded ? tags : tags.slice(0, initialTagCount);
  const hasMoreTags = tags.length > initialTagCount;

  return (
    <div className="space-y-4">
      <motion.div className="flex flex-wrap gap-2" layout>
        <AnimatePresence initial={false}>
          {visibleTags.map((tag, index) => (
            <motion.div
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2, delay: index * 0.02 }}
            >
              <Badge
                variant={activeTag === tag ? "default" : "secondary"}
                className={`
                  px-3 py-1 cursor-pointer text-sm font-normal
                  ${
                    activeTag === tag
                      ? "bg-primary/90 hover:bg-primary text-primary-foreground"
                      : "bg-secondary/40 hover:bg-secondary/50"
                  }
                `}
                onClick={() => onTagClick(tag)}
              >
                {tag}
              </Badge>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {hasMoreTags && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          {isExpanded ? (
            <>
              Show Less <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              Show More ({tags.length - initialTagCount} more){" "}
              <ChevronDown className="h-4 w-4" />
            </>
          )}
        </Button>
      )}
    </div>
  );
}
