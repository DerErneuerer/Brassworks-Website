import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ProjectFilters({ searchTerm, setSearchTerm, sortKey, setSortKey }: any) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      <Input
        placeholder="Search project..."
        className="w-full sm:w-[20rem] bg-neutral-800 text-white placeholder-gray-400"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Select value={sortKey} onValueChange={setSortKey}>
        <SelectTrigger className="w-[12rem] bg-neutral-800 text-white border-neutral-600">
          <SelectValue placeholder="Sort by..." />
        </SelectTrigger>
        <SelectContent className="bg-neutral-800 text-white">
          <SelectItem value="default">Default</SelectItem>
          <SelectItem value="name">Name</SelectItem>
          <SelectItem value="ram">RAM</SelectItem>
          <SelectItem value="cpu">CPU</SelectItem>
          <SelectItem value="storage">Storage</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
