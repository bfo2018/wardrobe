import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center pt-24">
      <p className="text-gold text-xs uppercase tracking-[0.3em] mb-4">404</p>
      <h1 className="font-display text-4xl text-ivory mb-4">Page Not Found</h1>
      <p className="text-ivory/60 mb-8">
        This outfit seems to have been returned already.
      </p>
      <ButtonLink href="/" variant="primary" shimmer>
        Back to Home
      </ButtonLink>
    </div>
  );
}
