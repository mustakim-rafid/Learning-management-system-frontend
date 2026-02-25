"use client";

import { BookOpen } from "lucide-react";

export default function LMSLoadingPage() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-4 bg-background animate-fadeIn">

      <BookOpen className="h-12 w-12 text-primary animate-pulse" />

      <p className="text-sm text-muted-foreground">
        Preparing your learning experience...
      </p>

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}