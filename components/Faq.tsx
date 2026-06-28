"use client";

import { useState } from "react";
import { PlusMinus } from "./Icons";

export type FaqItem = { q: string; a: string };

export default function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="faq">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div className="faq__item" key={i}>
            <button
              className="faq__q"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span>{item.q}</span>
              <span className="icon" aria-hidden="true"><PlusMinus /></span>
            </button>
            <div
              className="faq__a"
              style={{ maxHeight: isOpen ? "320px" : 0 }}
            >
              <div className="faq__a-inner">{item.a}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
