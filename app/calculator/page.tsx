"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowLeft, GraduationCap } from "lucide-react";
import Link from "next/link";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const branchCredits = {
  cse: [18, 20, 24, 22, 22, 22, 20, 18],
  ete: [18, 20, 24, 21, 23, 22, 22, 21],
  me: [18, 20, 19, 20, 24, 22, 25, 19],
  ee: [18, 20, 21.5, 22.5, 22, 22, 21, 18],
  ce: [18, 20, 23, 22, 27, 21, 20, 19],
  che: [18, 20, 20, 19, 23, 23, 20, 15],
  ie: [18, 20, 20.5, 22, 21, 22, 21, 18],
  ipe: [18, 20, 19, 20, 23, 22, 25, 19],
  eie: [18, 20, 19, 21, 23, 21, 21, 21],
  eee: [18, 20, 21.5, 22.5, 24, 22, 21, 18]
}

const branchNames = {
  cse: "Computer Science Engineering",
  ete: "Electronics & Telecom. Engineering",
  me: "Mechanical Engineering",
  ee: "Electrical Engineering",
  ce: "Civil Engineering",
  che: "Chemical Engineering"
}

function CalculatorContent() {
  const [sgpa, setSgpa] = useState<number[]>(Array(8).fill(0))
  const [cgpa, setCgpa] = useState<number | null>(null)
  const searchParams = useSearchParams()
  const branch = searchParams.get("branch") || "cse"

  const calculateCGPA = () => {
    let totalCredits = 0
    let weightedSum = 0
    const credits = branchCredits[branch as keyof typeof branchCredits]
    
    for (let i = 0; i < sgpa.length; i++) {
      if (sgpa[i] > 0) {
        weightedSum += sgpa[i] * credits[i]
        totalCredits += credits[i]
      }
    }
    
    const calculatedCGPA = totalCredits > 0 ? weightedSum / totalCredits : 0
    setCgpa(calculatedCGPA)
  }

  const handleSGPAChange = (semester: number, value: string) => {
    const newValue = parseFloat(value) || 0
    const newSgpa = [...sgpa]
    newSgpa[semester] = newValue
    setSgpa(newSgpa)
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#030303]">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="/branch">
          <ArrowLeft className="h-5 w-5 mr-2 text-white" />
          <GraduationCap className="h-6 w-6 text-white" />
          <span className="ml-2 text-lg font-semibold text-white">CGPA</span>
        </Link>
        <div className="ml-auto">
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </header>
      <div className="container mx-auto py-8 flex-1">
        <h1 className="text-3xl font-bold text-white text-center mb-2">CGPA Calculator</h1>
        <p className="text-white/60 text-center mb-8">
          {branchNames[branch as keyof typeof branchNames]}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {branchCredits[branch as keyof typeof branchCredits].map((credits, index) => (
            <Card key={index} className="p-4 bg-white/5 border-white/10">
              <div className="space-y-2">
                <Label htmlFor={`semester-${index + 1}`} className="text-white">
                  Semester {index + 1}
                </Label>
                <Input
                  id={`semester-${index + 1}`}
                  type="number"
                  min="0"
                  max="10"
                  step="0.01"
                  placeholder="Enter SGPA"
                  value={sgpa[index] || ""}
                  onChange={(e) => handleSGPAChange(index, e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                />
                <p className="text-sm text-white/60">Credits: {credits}</p>
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-8 flex flex-col items-center gap-4">
          <Button 
            onClick={calculateCGPA} 
            size="lg"
            className="bg-white text-[#030303] hover:bg-white/90"
          >
            Calculate CGPA
          </Button>
          {cgpa !== null && (
            <Card className="p-6 bg-white/5 border-white/10">
              <h2 className="text-2xl font-bold text-center text-white">
                Your CGPA: {cgpa.toFixed(2)}
              </h2>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

// Main component that wraps CalculatorContent in Suspense
export default function Calculator() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <CalculatorContent />
    </Suspense>
  );
}