export function ImageBlock({ src, alt }: { src: string; alt: string }) {
    return (
      <div className="w-full rounded-sm overflow-hidden border border-gray-300">
        <img src={src} alt={alt} className="w-full h-auto object-contain" />
      </div>
    );
}  