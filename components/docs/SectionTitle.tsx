interface SectionTitleProps {
  title: string;
  id?: string; 
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title, id }) => {
    return <h2 id={id} className="scroll-mt-[6rem] text-2xl font-semibold border-l-4 pl-3 border-green-500">{title}</h2>;
}  