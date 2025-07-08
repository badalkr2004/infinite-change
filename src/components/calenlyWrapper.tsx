// components/calendly-wrapper.tsx
"use client";

import dynamic from "next/dynamic";
import { ComponentType } from "react";

// Define the props interfaces
interface CalendlyInlineProps {
  url: string;
  height?: number;
  prefill?: {
    name?: string;
    email?: string;
    customAnswers?: Record<string, string>;
  };
  utm?: {
    utmCampaign?: string;
    utmSource?: string;
    utmMedium?: string;
    utmContent?: string;
    utmTerm?: string;
  };
}

interface CalendlyPopupProps {
  url: string;
  text?: string;
  className?: string;
  prefill?: CalendlyInlineProps["prefill"];
  utm?: CalendlyInlineProps["utm"];
}

// Loading component
const CalendlyLoading = () => (
  <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
      <p className="text-gray-600">Loading Calendly...</p>
    </div>
  </div>
);

// Dynamic imports without SSR
export const CalendlyInline = dynamic(
  () => import("./calendlyClient").then((mod) => mod.CalendlyInlineClient),
  {
    ssr: false,
    loading: () => <CalendlyLoading />,
  }
) as ComponentType<CalendlyInlineProps>;

export const CalendlyPopup = dynamic(
  () => import("./calendlyClient").then((mod) => mod.CalendlyPopupClient),
  {
    ssr: false,
    loading: () => (
      <button className="bg-blue-500 text-white px-4 py-2 rounded opacity-50 cursor-not-allowed">
        Loading...
      </button>
    ),
  }
) as ComponentType<CalendlyPopupProps>;

export const CalendlyCustomPopup = dynamic(
  () => import("./calendlyClient").then((mod) => mod.CalendlyCustomPopupClient),
  {
    ssr: false,
    loading: () => (
      <button className="bg-blue-500 text-white px-4 py-2 rounded opacity-50 cursor-not-allowed">
        Loading...
      </button>
    ),
  }
) as ComponentType<{
  url: string;
  children: React.ReactNode;
  className?: string;
  prefill?: CalendlyInlineProps["prefill"];
  utm?: CalendlyInlineProps["utm"];
}>;
