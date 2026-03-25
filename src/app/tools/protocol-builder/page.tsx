import type { Metadata } from "next";
import ProtocolBuilderClient from "./ProtocolBuilderClient";

export const metadata: Metadata = {
  title: "Protocol Builder — Design Your Daily Supplement Schedule",
  description:
    "Build a personalized supplement protocol with optimal timing, food pairing, and cycling schedules. Evidence-based scheduling for maximum absorption.",
};

export default function ProtocolBuilderPage() {
  return <ProtocolBuilderClient />;
}
