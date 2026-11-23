import { ArrowRight } from "lucide-react";
import { LINKS } from "@/links";
import Reveal from "./Reveal";

/** Step 2 of "Kom igång", between the teams list (step 1) and Svenskalag (step 3). */
const SignUp = () => (
  <section id="anmalan" className="pb-24 md:pb-32">
    <div className="container-page">
      <Reveal className="flex flex-col items-start gap-5 rounded-3xl bg-wine-500 p-8 text-white md:flex-row md:items-center md:justify-between md:p-10">
        <div>
          <p className="eyebrow text-ball">Steg 2 · Anmäl dig</p>
          <h2 className="font-display text-3xl font-extrabold md:text-4xl">Redo att testa?</h2>
          <p className="mt-2 max-w-2xl text-white/80">
            Fyll i formuläret ”Börja spela basket”. Anmälan är inte bindande och som ny spelare provar du på utan
            kostnad. Avgifterna för säsongen hittar du{" "}
            <a href={LINKS.fees} target="_blank" rel="noopener" className="underline underline-offset-4 hover:text-white">
              här
            </a>
            . Frågor? Mejla{" "}
            <a href={`mailto:${LINKS.email}`} className="underline underline-offset-4 hover:text-white">
              {LINKS.email}
            </a>
            .
          </p>
        </div>
        <a href={LINKS.signup} target="_blank" rel="noopener" className="btn-primary shrink-0 text-lg">
          Till anmälan <ArrowRight className="h-5 w-5" />
        </a>
      </Reveal>
    </div>
  </section>
);

export default SignUp;
