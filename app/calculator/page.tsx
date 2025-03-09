"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { ArrowLeft, GraduationCap } from "lucide-react";
import Link from "next/link";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

const branchCredits = {
  cse: [18, 20, 24, 22, 22, 22, 20, 18],
  ete: [18, 20, 24, 21, 23, 22, 22, 21],
  me: [18, 20, 24, 22, 22, 22, 20, 18],
  ee: [18, 20, 24, 22, 22, 22, 20, 18],
  ce: [18, 20, 24, 22, 22, 22, 20, 18],
  che: [18, 20, 24, 22, 22, 22, 20, 18]
}

const branchNames = {
  cse: "Computer Science Engineering",
  ete: "Electronics & Telecom. Engineering",
  me: "Mechanical Engineering",
  ee: "Electrical Engineering",
  ce: "Civil Engineering",
  che: "Chemical Engineering"
}

export default function Calculator() {
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
    <div className="min-h-screen flex flex-col">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link
          className="flex items-center justify-center"
          href="/branch-selection"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          <GraduationCap className="h-6 w-6" />
          <span className="ml-2 text-lg font-semibold">CGPA Calculator</span>
        </Link>
      </header>
      <div className="container mx-auto py-8 flex-1">
        <h1 className="text-3xl font-bold text-center mb-2">CGPA Calculator</h1>
        <p className="text-muted-foreground text-center mb-8">
          {branchNames[branch as keyof typeof branchNames]}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {branchCredits[branch as keyof typeof branchCredits].map(
            (credits, index) => (
              <Card key={index} className="p-4">
                <div className="space-y-2">
                  <Label htmlFor={`semester-${index + 1}`}>
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
                  />
                  <p className="text-sm text-muted-foreground">
                    Credits: {credits}
                  </p>
                </div>
              </Card>
            )
          )}
        </div>
        <div className="mt-8 flex flex-col items-center gap-4">
          <Button onClick={calculateCGPA} size="lg">
            Calculate CGPA
          </Button>
          {cgpa !== null && (
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-center">
                Your CGPA: {cgpa.toFixed(2)}
              </h2>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
