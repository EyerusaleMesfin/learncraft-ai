"use client";

import { useState } from "react";

const steps = [
  {
    title: "Choose your track",
    description:
      "Start by selecting AI Development, App Development, or Web Development. Then choose a skill level that fits where you are today.",
    accent: "bg-orange-100 text-orange-900"
  },
  {
    title: "Unlock your next build",
    description:
      "Beginners study resources first and then unlock a project. Intermediate and advanced learners start with a skill check and unlock materials plus the next project after scoring 50% or more.",
    accent: "bg-teal-100 text-teal-900"
  }
];

export function HomeStepper() {
  const [currentStep, setCurrentStep] = useState(0);
  const step = steps[currentStep];

  return (
    <div className="card p-8 md:p-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <span className="pill">Two-step walkthrough</span>
          <h2 className="section-title">How Learn Craft AI works</h2>
          <p className="section-copy">
            The home page keeps the story simple: choose the right path, then earn
            access to the next learning step.
          </p>
        </div>
        <button
          type="button"
          className="btn-primary"
          onClick={() => setCurrentStep((prev) => (prev + 1) % steps.length)}
        >
          Next
        </button>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.35fr_0.65fr]">
        <div className="flex gap-3 lg:flex-col">
          {steps.map((item, index) => (
            <div
              key={item.title}
              className={`rounded-2xl border p-4 ${
                index === currentStep
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-200 bg-slate-50 text-slate-600"
              }`}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.25em]">
                Step {index + 1}
              </p>
              <p className="mt-2 text-sm font-semibold">{item.title}</p>
            </div>
          ))}
        </div>

        <div className={`rounded-[32px] p-8 ${step.accent}`}>
          <p className="text-sm font-semibold uppercase tracking-[0.25em]">
            Learning flow
          </p>
          <h3 className="mt-4 text-3xl font-bold">{step.title}</h3>
          <p className="mt-4 max-w-2xl text-base leading-7">{step.description}</p>
        </div>
      </div>
    </div>
  );
}
