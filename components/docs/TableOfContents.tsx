"use client";

import { useEffect, useState } from "react";

type Heading = {
  id: string;
  text: string;
};

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const headingElements = Array.from(document.querySelectorAll("h2[id]")) as HTMLHeadingElement[];

    const headingData = headingElements.map((heading) => ({
      id: heading.id,
      text: heading.innerText,
    }));

    setHeadings(headingData);

    const onScroll = () => {
      const offsets = headingElements.map((el) => ({
        id: el.id,
        top: el.getBoundingClientRect().top,
      }));

      const visible = offsets.filter((o) => o.top < 150);
      if (visible.length) {
        setActiveId(visible[visible.length - 1].id);
      }
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="space-y-2 border-l-2 border-gray-200 pl-4">
      {headings.map(({ id, text }) => (
        <a
          key={id}
          href={`#${id}`}
          className={`block text-sm font-medium transition-colors duration-200 ${
            activeId === id ? "text-green-600" : "text-gray-600 hover:text-gray-400"
          }`}
        >
          {text}
        </a>
      ))}
    </div>
  );
}