import { Metadata } from 'next'
import { ArrowRight, GraduationCap } from "lucide-react"
import Link from "next/link"
import { HeroGeometric } from "@/components/shape-landing-hero"
import { RainbowButton } from "@/components/ui/rainbow-button"
import Navbar from '@/components/navbar'
import { SignedIn, SignInButton, UserButton } from '@clerk/nextjs'
export const metadata: Metadata = {
  title: 'CGPA Calculator - Your Academic Journey',
  description: 'Calculate your CGPA easily with our advanced calculator',
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#030303]">
      <Navbar />
      <main className="flex-1">
        <HeroGeometric 
          badge="CGPA Calculator"
          title1="Calculate Your"
          title2="CGPA"
        />
        <div className="relative z-10 flex justify-center -mt-32">
          <SignInButton>
            <RainbowButton>Get Started</RainbowButton>
          </SignInButton>
        </div>
      </main>
      <footer className="relative z-10 flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center justify-center px-4 md:px-6 text-white/60">
        <p className="text-xs">
          Made by Parijat Bhattacharjee with ❤️
        </p>
      </footer>
    </div>
  )
}