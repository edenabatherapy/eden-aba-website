import type { ReactNode } from "react";
import EdenNewsletter from "@/components/common/EdenNewsletter";
import Footer from "@/components/common/Footer";
import { EDEN_PAGE_SHELL } from "@/lib/eden-design-system";

type EdenPageShellProps = {
  children: ReactNode;
  header: ReactNode;
  newsletterSource?: string;
  className?: string;
};

/**
 * Shared page wrapper: Eden background rhythm, main landmark, newsletter, footer.
 */
export default function EdenPageShell({
  children,
  header,
  newsletterSource = "eden-newsletter",
  className = "",
}: EdenPageShellProps) {
  return (
    <div className={`${EDEN_PAGE_SHELL} ${className}`.trim()}>
      {header}
      <main id="main-content">{children}</main>
      <EdenNewsletter source={newsletterSource} />
      <Footer />
    </div>
  );
}
