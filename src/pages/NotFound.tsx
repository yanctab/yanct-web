import { ArrowLeft } from "lucide-react";
import Logo from "@/components/Logo";

const NotFound = () => (
  <main className="relative flex min-h-screen items-center overflow-hidden bg-ink px-4 text-white md:px-8">
    <div className="grid-bg absolute inset-0" aria-hidden />
    <div className="relative mx-auto w-full max-w-xl text-center">
      <a href="/" aria-label="Mikro.io home" className="inline-block">
        <Logo dark />
      </a>
      <p className="mt-12 font-display text-7xl font-extrabold text-brand-400">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold md:text-3xl">Page not found</h1>
      <p className="mt-3 text-ink-400">
        The page you are looking for has moved or no longer exists.
      </p>
      <a href="/" className="btn-primary mt-10">
        <ArrowLeft className="h-4 w-4" /> Back to the home page
      </a>
    </div>
  </main>
);

export default NotFound;
