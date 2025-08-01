import ProjectCard from './project-card';
import { Button } from '@/components/ui/button';

export default function ProjectList({ projects, onDelete, onLoad, onDeactivate, onCreateNew }: any) {
  return (
    <div className="pb-20 pt-2 flex flex-wrap gap-x-6 gap-y-6 overflow-hidden">
      {projects.map((project: any) => (
        <ProjectCard
          key={project.id}
          {...project}
          onDelete={onDelete}
          onLoad={onLoad}
          onDeactivate={onDeactivate}
        />
      ))}
      <Button
        onClick={onCreateNew}
        className="border-[0.15rem] border-dashed border-stone-600 w-full max-w-[24.25rem] h-[9rem] rounded-md hover:bg-stone-300/10 bg-transparent"
      >
        <p className="text-stone-600 text-lg">+ New Project</p>
      </Button>
    </div>
  );
}
