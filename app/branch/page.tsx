"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GraduationCap, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { BorderBeam } from "@/components/magicui/border-beam";

const branches = [
  { id: "cse", name: "Computer Science Engineering", acronym: "CSE" },
  { id: "ete", name: "Electronics & Telecom. Engineering", acronym: "ETE" },
  { id: "me", name: "Mechanical Engineering", acronym: "ME" },
  { id: "ee", name: "Electrical Engineering", acronym: "EE" },
  { id: "ce", name: "Civil Engineering", acronym: "CE" },
  { id: "che", name: "Chemical Engineering", acronym: "CHE" },
  { id: "ie", name: "Instrumentation Engineering", acronym: "IE" },
  { id: "ipe", name: "Industrial & Power Engineering", acronym: "IPE" },
  { id: "eie", name: "Power Electronics & Instrumentation Engineering",acronym: "EIE",},
  { id: "eee", name: "Electrical & Electronics Engineering", acronym: "EEE" },
];

export default function BranchSelection() {
  const router = useRouter();
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);

  const handleBranchSelect = (branchId: string) => {
    setSelectedBranch(branchId);
    router.push(`/calculator?branch=${branchId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#030303]">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="/">
          <ArrowLeft className="h-5 w-5 text-white mr-2" />
          <GraduationCap className="h-6 w-6 text-white" />
          <span className="ml-2 text-lg font-semibold text-white">CGPA</span>
        </Link>
        <div className="ml-auto">
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">
            Select Your Branch
          </h1>
          <p className="text-white/60 mb-8">
            Choose your engineering branch to continue
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {branches.map((branch, index) => (
              <motion.div
                key={branch.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card
                  className={`p-6 cursor-pointer transition-all hover:scale-105 relative overflow-hidden ${
                    selectedBranch === branch.id
                      ? "bg-white/10 border-white/20"
                      : "bg-white/5 border-white/10 hover:bg-white/10"
                  }`}
                  onClick={() => handleBranchSelect(branch.id)}
                >
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {branch.acronym}
                  </h3>
                  <p className="text-white/60 text-sm">{branch.name}</p>
                  <BorderBeam
                    duration={6}
                    size={400}
                    className="from-transparent via-red-500 to-transparent"
                  />
                  <BorderBeam
                    duration={6}
                    delay={3}
                    size={400}
                    className="from-transparent via-blue-500 to-transparent"
                  />
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
