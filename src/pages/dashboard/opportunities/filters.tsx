import type { OpportunityStage } from "@/types";

export default function Filters(props: {
  search: string;
  setSearch: (search: string) => void;
  status: OpportunityStage;
  setStatus: (status: OpportunityStage) => void;
}) {
  const { search, setSearch, status, setStatus } = props;
  return (
    <div className="flex gap-1 w-full">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 rounded-md p-2 w-full"
        placeholder="Search for an opportunity by name or company"
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as OpportunityStage)}
        className="border border-gray-300 rounded-md p-2 bg-black"
      >
        <option value="all">All</option>
        <option value="prospect">Prospect</option>
        <option value="negotiation">Negotiation</option>
        <option value="won">Won</option>
        <option value="lost">Lost</option>
      </select>
    </div>
  );
}
