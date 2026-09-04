import { useCmsFonts } from "../../features/fonts/use-fonts";

export function CmsFonts() {
  const { data: fonts } = useCmsFonts();

  if (
    !fonts?.minecraftRegular ||
    !fonts.minecraftBold ||
    !fonts.minecraftItalic
  ) {
    return null;
  }

  return (
    <style>{`
      @font-face {
        font-family: "minecraft";
        src: url("${fonts.minecraftRegular}") format("woff2");
        font-weight: 400;
        font-style: normal;
        font-display: swap;
      }

      @font-face {
        font-family: "minecraft";
        src: url("${fonts.minecraftBold}") format("woff2");
        font-weight: 700;
        font-style: normal;
        font-display: swap;
      }

      @font-face {
        font-family: "minecraft";
        src: url("${fonts.minecraftItalic}") format("woff2");
        font-weight: 400;
        font-style: italic;
        font-display: swap;
      }
    `}</style>
  );
}
