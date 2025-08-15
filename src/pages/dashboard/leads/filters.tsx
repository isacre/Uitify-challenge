import type { LeadStatus } from "@/types";

export default function Filters(props: {
  search: string;
  setSearch: (search: string) => void;
  status: LeadStatus;
  setStatus: (status: LeadStatus) => void;
}) {
  const { search, setSearch, status, setStatus } = props;

  return (
    <div className="flex gap-1 w-full">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 rounded-md p-2 w-full"
        placeholder="Search for a lead by name or company"
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as LeadStatus)}
        className="border border-gray-300 rounded-md p-2 bg-black"
      >
        <option value="all">All</option>
        <option value="new">New</option>
        <option value="qualified">Qualified</option>
        <option value="contacted">Contacted</option>
        <option value="closed">Closed</option>
      </select>
    </div>
  );
}
