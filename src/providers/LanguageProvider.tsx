"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { tamil } from "@/data/tamil";
type Language = "en" | "ta";
const LanguageContext = createContext({ language: "en" as Language, setLanguage: (_: Language) => {} });
export function LanguageProvider({ children }: { children: ReactNode }) {
 const [language, setLanguage] = useState<Language>("en");
 useEffect(() => { try { if(localStorage.getItem("senthil-language") === "ta") setLanguage("ta"); } catch {} }, []);
 useEffect(() => { document.documentElement.lang = language; try { localStorage.setItem("senthil-language", language); } catch {} }, [language]);
 return <LanguageContext.Provider value={{language,setLanguage}}>{children}</LanguageContext.Provider>;
}
export function useLanguage() { return useContext(LanguageContext); }
export function translateText(text: string) {
 const key = text.replace(/\s+/g," ").trim();
 const translated = tamil[key] ?? tamil[key.toLowerCase()];
 if(translated !== undefined) return (text.match(/^\s*/)?.[0] ?? "") + translated + (text.match(/\s*$/)?.[0] ?? "");
 if(key.includes(", ")) return text.split(", ").map(part=>tamil[part] ?? part).join(", ");
 return text;
}
export function Localized({ children }: { children: ReactNode }) {
 const { language } = useLanguage();
 return <>{language === "ta" && typeof children === "string" ? translateText(children) : children}</>;
}
export function LanguageToggle() {
 const { language,setLanguage } = useLanguage();
 return <div className="language-toggle" role="group" aria-label="Language / மொழி">
  <button id="lang-btn-en" type="button" lang="en" aria-pressed={language === "en"} onClick={()=>setLanguage("en")}>EN</button>
  <button id="lang-btn-ta" type="button" lang="ta" aria-pressed={language === "ta"} onClick={()=>setLanguage("ta")}>தமிழ்</button>
 </div>;
}
