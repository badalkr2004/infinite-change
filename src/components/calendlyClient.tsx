// components/calendly-client.tsx
"use client";

import {
  InlineWidget,
  PopupWidget,
  useCalendlyEventListener,
} from "react-calendly";
import { useEffect, useState } from "react";

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

export function CalendlyInlineClient({
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

export function CalendlyPopupClient({
  url,
  text = "Schedule Meeting",
  className = "",
  prefill,
  utm,
}: CalendlyPopupProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className={className} disabled>
        {text}
      </button>
    );
  }

  return (
    <PopupWidget
      url={url}
      rootElement={document.getElementById("__next") || document.body}
      text={text}
      textColor="#ffffff"
      color="#00a2ff"
      //   className={className}
      prefill={prefill}
      utm={utm}
    />
  );
}

export function CalendlyCustomPopupClient({
  url,
  children,
  className = "",
  prefill,
  utm,
}: {
  url: string;
  children: React.ReactNode;
  className?: string;
  prefill?: CalendlyInlineProps["prefill"];
  utm?: CalendlyInlineProps["utm"];
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;

    script.onload = () => {
      setIsLoaded(true);
    };

    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const openCalendlyPopup = () => {
    if (isLoaded && window.Calendly) {
      window.Calendly.initPopupWidget({
        url,
        prefill,
        utm,
      });
    }
  };

  return (
    <button
      onClick={openCalendlyPopup}
      className={className}
      disabled={!isLoaded}
    >
      {children}
    </button>
  );
}
