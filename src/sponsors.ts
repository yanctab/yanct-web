/**
 * Current sponsors, as listed on www.bk50.se. Logos live in public/sponsors/.
 * Leave `url` out when we don't have a confirmed link for the sponsor.
 * The full section (`Sponsors`) is on the welcome page; the other pages show the logos in their footers.
 */
export const SPONSORS: { name: string; logo: string; url?: string }[] = [
  { name: "Sparbanken Skåne", logo: "/sponsors/sparbanken-skane.png", url: "https://www.sparbankenskane.se/" },
  { name: "LKF – Lunds Kommuns Fastighets AB", logo: "/sponsors/lkf.png", url: "https://www.lkf.se/" },
  { name: "Kraftringen", logo: "/sponsors/kraftringen.png", url: "https://www.kraftringen.se/" },
  { name: "Aprotech Engineering", logo: "/sponsors/aprotech.png" },
  { name: "Tricon", logo: "/sponsors/tricon.png" },
];
