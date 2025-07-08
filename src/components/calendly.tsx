"use client";

import {
  InlineWidget,
  PopupWidget,
  useCalendlyEventListener,
} from "react-calendly";
import { useEffect } from "react";
import { Button } from "./ui/button";

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

export function CalendlyInline({
  url,
  height = 630,
  prefill,
  utm,
}: CalendlyInlineProps) {
  // Listen for Calendly events
  useCalendlyEventListener({
    onProfilePageViewed: () => console.log("Profile page viewed"),
    onDateAndTimeSelected: () => console.log("Date and time selected"),
    onEventTypeViewed: () => console.log("Event type viewed"),
    onEventScheduled: (e) => {
      console.log("Event scheduled:", e.data.payload);
      // You can trigger analytics or other actions here
    },
  });

  return (
    <InlineWidget
      url={url}
      styles={{
        height: `${height}px`,
        width: "100%",
      }}
      prefill={prefill}
      utm={utm}
    />
  );
}

interface CalendlyPopupProps {
  url: string;
  text?: string;
  className?: string;
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

export function CalendlyPopup({
  url,
  text = "Schedule Meeting",

  prefill,
  utm,
}: CalendlyPopupProps) {
  return (
    <PopupWidget
      url={url}
      rootElement={document.getElementById("__next")!}
      text={text}
      textColor="#ffffff"
      color="#00a2ff"
      prefill={prefill}
      utm={utm}
    />
  );
}

// Alternative: Custom popup button with more control
export function CalendlyCustomPopup({
  url,
  children,
  className = "",
  prefill,
  utm,
}: {
  url: string;
  children: React.ReactNode;
  className?: string;
  prefill?: CalendlyPopupProps["prefill"];
  utm?: CalendlyPopupProps["utm"];
}) {
  const openCalendlyPopup = () => {
    if (typeof window !== "undefined" && window.Calendly) {
      window.Calendly.initPopupWidget({
        url,
        prefill,
        utm,
      });
    }
  };

  useEffect(() => {
    // Load Calendly script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <Button onClick={openCalendlyPopup} className={className}>
      {children}
    </Button>
  );
}
