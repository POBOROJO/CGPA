import { Metadata } from 'next'
import { ArrowRight, GraduationCap } from "lucide-react"
import Link from "next/link"
import { HeroGeometric } from "@/components/ui/shape-landing-hero"
import { RainbowButton } from "@/components/ui/rainbow-button"

export const metadata: Metadata = {
  title: 'CGPA Calculator - Your Academic Journey',
  description: 'Calculate your CGPA easily with our advanced calculator',
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#030303]">
      <header className="fixed w-full z-50 px-4 lg:px-6 h-14 flex items-center bg-[#030303]/50 backdrop-blur-md">
        <Link className="flex items-center justify-center" href="/">
          <GraduationCap className="h-6 w-6 text-white" />
          <span className="ml-2 text-lg font-semibold text-white">CGPA Calculator</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4">
          <Link href="/login">
            <button className="text-white hover:text-white/80 px-4 py-2">Login</button>
          </Link>
          <Link href="/signup">
            <button className="bg-white text-[#030303] hover:bg-white/90 px-4 py-2 rounded-lg">
              Sign up
            </button>
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <HeroGeometric 
          badge="CGPA Calculator"
          title1="Calculate Your"
          title2="Academic Success"
        />
        <div className="relative z-10 flex justify-center -mt-32">
          <Link href="/signup">
            <RainbowButton>Get Started Now</RainbowButton>
          </Link>
        </div>
      </main>
      <footer className="relative z-10 flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 text-white/60">
        <p className="text-xs">
          © 2024 CGPA Calculator. All rights reserved.
        </p>
      </footer>
    </div>
  )
}