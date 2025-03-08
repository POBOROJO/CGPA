import {GraduationCap } from "lucide-react";
import Link from "next/link";
import React from "react";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
const Navbar = () => {
  return (
    <div>
      <header className="fixed w-full z-50 px-4 lg:px-6 h-14 flex items-center bg-[#030303]/50 backdrop-blur-md">
        <Link className="flex items-center justify-center" href="/">
          <GraduationCap className="h-6 w-6 text-white" />
          <span className="ml-2 text-lg font-semibold text-white hidden sm:inline">CGPA</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4">
        <SignedOut>
          <SignInButton>
            <button className="text-white hover:text-white/80 px-4 py-2">
              Sign in
            </button>
          </SignInButton>
          <SignUpButton>
            <button className="bg-white text-[#030303] hover:bg-white/90 px-4 py-2 rounded-lg">
              Sign up
            </button>
          </SignUpButton>
        </SignedOut>
        </nav>          
        <SignedIn><UserButton /></SignedIn>  
      </header>
    </div>
  );
};

export default Navbar;
