import type { Metadata } from "next";
import InteractionCheckerClient from "./InteractionCheckerClient";

export const metadata: Metadata = {
  title: "Supplement Interaction Checker — Check Your Stack",
  description:
    "Select your supplements and instantly see synergies, cautions, and timing conflicts. Evidence-based interaction data for safe supplement stacking.",
};

export default function InteractionCheckerPage() {
  return <InteractionCheckerClient />;
}
