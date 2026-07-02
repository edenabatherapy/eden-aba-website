interface Grecaptcha {
  ready(callback: () => void): void;
  execute(siteKey: string, options: { action: string }): Promise<string>;
  render(container: HTMLElement | string, parameters: { sitekey: string; theme?: string }): number;
  getResponse(widgetId?: number): string;
  reset(widgetId?: number): void;
}

interface Window {
  grecaptcha?: Grecaptcha;
  __EDEN_RECAPTCHA_SITE_KEY__?: string;
}
