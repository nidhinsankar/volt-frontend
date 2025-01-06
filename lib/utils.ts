import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseClean = (response: string) => {
  return response
    .replace(/```(?:json)?\n?|```/g, "")
    .replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, "$1") // Remove comments
    .replace(/^\s+|\s+$/g, "") // Trim whitespace
    .replace(/\n/g, "") // Remove newlines
    .replace(/,\s*}/g, "}") // Remove trailing commas in objects
    .replace(/,\s*\]/g, "]") // Remove trailing commas in arrays
    .replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":') // Quote unquoted keys
    .replace(/:\s*'/g, ': "') // Replace single quotes with double quotes
    .replace(/'\s*([,}])/g, '"$1');
};
