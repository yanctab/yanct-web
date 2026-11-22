import { useEffect } from "react";

const NotFound = () => {
  useEffect(() => {
    document.title = "Airball! – BK50";
  }, []);

  return (
    <main className="court-bg flex min-h-screen flex-col items-center justify-center bg-wine-800 px-4 text-center text-white">
      <img src="/bk50-logo.png" alt="" className="h-28 w-auto animate-bounce-ball rounded-full bg-white p-1" />
      <p className="mt-8 font-display text-8xl font-extrabold text-ball md:text-9xl">404</p>
      <h1 className="mt-2 font-display text-3xl font-extrabold md:text-5xl">Airball!</h1>
      <p className="mt-4 max-w-md text-white/75">
        Sidan <code className="rounded bg-white/10 px-1.5 py-0.5">{window.location.pathname}</code> missade korgen helt.
      </p>
      <a href="/" className="btn-primary mt-8">
        Tillbaka till planen
      </a>
    </main>
  );
};

export default NotFound;
