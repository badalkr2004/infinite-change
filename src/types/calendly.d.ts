declare global {
  interface Window {
    Calendly: {
      initPopupWidget: (options: {
        url: string;
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
      }) => void;
      closePopupWidget: () => void;
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
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
      }) => void;
    };
  }
}

export {};
