import type { Metadata } from "next";
import DosageCalculatorClient from "./DosageCalculatorClient";

export const metadata: Metadata = {
  title: "Supplement Dosage Calculator — Personalized Dosing",
  description:
    "Get personalized supplement dosing based on your body weight, age, and goals. Evidence-based calculations from clinical research.",
};

export default function DosageCalculatorPage() {
  return <DosageCalculatorClient />;
}
