import type { Metadata } from "next";
import { NotFoundClient } from "./not-found.client";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "The page you are looking for does not exist. Return to the Guess Your Face homepage or start detecting faces.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/404" },
};

export default function NotFound() {
  return <NotFoundClient />;
}