"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useState } from "react";
import { MaterialIcon } from "@/components/shell/MaterialIcon";

export default function LoginPage() {
  const [email, setEmail] = useState("");

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-on-surface">
      <div className="absolute top-[-20%] left-[-10%] h-[50vw] w-[50vw] rounded-full bg-primary-container/20 blur-[120px] pointer-events-none animate-mesh" />
      <div className="absolute bottom-[-20%] right-[-10%] h-[40vw] w-[40vw] rounded-full bg-secondary-container/10 blur-[100px] pointer-events-none animate-mesh-slow" />

      <div className="relative z-10 mx-auto grid w-full max-w-5xl grid-cols-1 items-center gap-12 px-6 py-16 md:grid-cols-2 md:gap-24">
        <div className="hidden reveal animate-fade-in-up flex-col justify-center space-y-12 border-r border-outline-variant/15 pr-8 md:flex">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <MaterialIcon name="language" className="text-primary text-4xl" fill />
              <span className="font-headline text-2xl font-black tracking-tight">
                Sovereign Command
              </span>
            </div>
            <h1 className="font-headline text-5xl font-extrabold leading-[1.1] tracking-tight lg:text-6xl">
              Operational <br />
              <span className="bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent">
                Intelligence
              </span>
            </h1>
            <p className="max-w-md text-lg leading-relaxed text-on-surface-variant">
              Access high-stakes orchestration tools designed for scale, precision, and zero-latency decision making.
            </p>
          </div>
        </div>

        <div className="mx-auto w-full max-w-md">
          <div className="mouse-glow reveal animate-fade-in-up delay-100 relative overflow-hidden rounded-xl border border-outline-variant/20 bg-surface-container/60 p-8 shadow-[0_20px_40px_rgba(6,14,32,0.4)] backdrop-blur-2xl sm:p-10">
            <div className="absolute left-0 right-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            <div className="mb-8 text-center">
              <h2 className="font-headline text-2xl font-bold tracking-tight text-on-surface">
                Access Command
              </h2>
              <p className="mt-2 text-sm text-on-surface-variant">
                Authenticate to continue securely
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <button className="w-full flex items-center justify-center gap-3 bg-surface-container hover:bg-surface-bright transition-all duration-300 text-on-surface font-label font-medium text-sm py-3 px-4 rounded-lg border border-outline-variant/20 shadow-sm">
                <img
                  alt="Google"
                  className="w-5 h-5"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEaVzqV66Pru0wTiNgMuEzgE5u2B2f4nHxg1GV0ChZSvVPx5O3zLBjfXoA5CpJMoN7ukJbRwjRki1x7BshM6KxuZ1j9fgI2NG6WZFXLxp3nNRt18F_QpygEKSn4Y6smNBR4yQEGJhbbrIaPzLqllW8ZtfMZUjiYi6lLVOiBDTl8NMfKi8bkexJCLLVSO91dDREu70XzFbX50FuHoRw1TLkULa7tUHihe6LvxPBXqgCORC455f58Top3eNEdxPoIjRuMKi4J3Vrp9w"
                />
                Continue with Google
              </button>
              <button className="w-full flex items-center justify-center gap-3 bg-surface-container hover:bg-surface-bright transition-all duration-300 text-on-surface font-label font-medium text-sm py-3 px-4 rounded-lg border border-outline-variant/20 shadow-sm">
                <img
                  alt="Microsoft"
                  className="w-5 h-5"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJiR3eJkjsp_qm9bxO98-L2DUYiXOxIf_e3GHh4LJBDlcBpk3ipSRblLxgv4PGFcm6Jh_sIhZnTHrmLDIejfvI2iJNvwea_KzH4Fig_FgSjkd5Ka7HvOVXMmrU4KS14iFm7wa0gwKSBjGyrwi4jziPnu-TSGGzpj2cqMgtAqKppUnGB9U_M5cpjj51AWVHs5r00304EgsO9PuVCw9hMq1Y7UXNqUVdjtLGT0Hj_bPjc6r6aml4WaqDqeb-OhwkuX7JencjExu21Ww"
                />
                Continue with Microsoft
              </button>
            </div>
            <div className="flex items-center space-x-4 mb-8">
              <div className="flex-1 h-[1px] bg-outline-variant/20" />
              <span className="font-label text-xs font-medium text-outline uppercase tracking-widest">
                Or use email
              </span>
              <div className="flex-1 h-[1px] bg-outline-variant/20" />
            </div>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-1.5">
                <label className="block text-xs font-medium uppercase tracking-widest text-on-surface-variant">
                  Work Email
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <MaterialIcon name="mail" className="text-outline text-xl" />
                  </div>
                  <input
                    className="w-full rounded-lg border border-outline-variant/30 bg-surface-container-low py-3 pl-10 pr-4 text-sm text-on-surface placeholder:text-outline/50 focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-[0_0_15px_rgba(17,101,231,0.4)] focus:outline-none transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    type="email"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn-pipeline w-full rounded-lg bg-gradient-to-r from-primary to-primary-container px-4 py-3 text-sm font-bold text-on-primary shadow-[0_8px_16px_rgba(17,101,231,0.2)] hover:shadow-[0_8px_20px_rgba(17,101,231,0.3)] transition-all"
              >
                <span className="inline-flex items-center justify-center gap-2">
                  Send Magic Link
                  <MaterialIcon name="auto_awesome" className="text-lg" fill />
                </span>
              </button>
            </form>

            <div className="mt-8 border-t border-outline-variant/20 pt-6 text-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors"
              >
                Continue without signing in
                <MaterialIcon name="arrow_right_alt" className="text-lg" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

