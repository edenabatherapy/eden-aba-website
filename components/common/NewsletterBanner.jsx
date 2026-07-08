/** Home page alias — same component as EdenNewsletter */
import EdenNewsletter from "@/components/common/EdenNewsletter";

export default function NewsletterBanner({ t: _t }) {
  return <EdenNewsletter source="homepage_newsletter" />;
}
