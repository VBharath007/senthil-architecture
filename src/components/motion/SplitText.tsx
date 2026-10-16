"use client";
import { Localized } from "@/providers/LanguageProvider";
export function SplitText({text,className=""}: {text:string;className?:string;delay?:number}) {return <span className={className}><Localized>{text}</Localized></span>;}
