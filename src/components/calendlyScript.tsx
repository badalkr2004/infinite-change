import Script from "next/script";

export function CalendlyScript() {
  return (
    <Script
      src="https://assets.calendly.com/assets/external/widget.js"
      strategy="lazyOnload"
    />
  );
}
