'use client'

import { useEffect, useState } from "react";
import Link from "next/link";

export default function NotFound() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="relative mt-16 justify-center overflow-hidden">
        <iframe src="https://brassmap.572.at/" width="100%" className="min-h-[93vh]">
        </iframe>
    </section>
  );
}
