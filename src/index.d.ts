export declare const FONT: string;
export declare const COLOURS: Record<"purple" | "purpleDeep" | "purpleTint" | "teal" | "pink" | "yellow" | "navy", string>;
export declare function escapeHtml(s: unknown): string;
export declare function paragraph(html: string): string;
export declare function link(href: string, text?: string): string;
export declare function button(href: string, label: string): string;
export declare function infoPanel(title: string, rows: ReadonlyArray<readonly [string, string]>): string;
export declare function note(kind: "info" | "success" | "warning" | "danger", title: string, text: string): string;
export interface WrapEmailOptions {
  title: string;
  /** Trusted HTML for the content card. Escape user values with escapeHtml. */
  bodyHtml: string;
  /** Absolute URL of the white linear logo. */
  logoUrl: string;
  orgName?: string;
  /** Trusted HTML for the footer. */
  footerHtml?: string;
  preheader?: string;
  lang?: string;
}
export declare function wrapEmail(o: WrapEmailOptions): string;
