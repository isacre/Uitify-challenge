import TableComponent from "@/components/tableComponent";
import useOpportunities from "@/hooks/useOpportunities";
import type { LeadStatus } from "@/types";
import { useState } from "react";
import ConvertLeadModal from "./modals/convertLead";
import EditLeadModal from "./modals/editLead";
import Lead from "./opportunity";

type LeadListFilters = {
  search: string;
  status: LeadStatus;
  currentSort: string | null;
};

export default function OpportunitiesList() {
  const savedFilters = handleGetSavedFilters();
  const [search, setSearch] = useState(savedFilters.search);
  const [status, setStatus] = useState(savedFilters.status);
  const [selectedLead, setSelectedLead] = useState<number | null>(null);
  const { opportunities, loading } = useOpportunities(search, status);
  const [modal, setModal] = useState<"edit" | "convert" | null>(null);

  function handleGetSavedFilters(): LeadListFilters {
    let savedFilters: LeadListFilters = {
      search: "",
      status: "all",
      currentSort: null,
    };
    if (localStorage.getItem("filter-opportunities")) {
      savedFilters = JSON.parse(
        localStorage.getItem("filter-opportunities") || "{}"
      );
    }
    return savedFilters;
  }

  return (
    <div className="flex flex-col gap-4 p-4 ">
      <div className="flex gap-1 w-full">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full"
          placeholder="Search for an opportunity by name or company"
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
        </select>
      </div>
      <EditLeadModal
        selectedLead={selectedLead}
        setSelectedLead={setSelectedLead}
        setModal={setModal}
        modal={modal}
      />
      <ConvertLeadModal
        selectedLead={selectedLead}
        setSelectedLead={setSelectedLead}
        setModal={setModal}
        modal={modal}
      />
      <TableComponent
        loading={loading}
        itemsCount={opportunities.length}
        columns={[
          { name: "Name" },
          { name: "Company" },
          { name: "Amount" },
          { name: "Stage" },
        ]}
      >
        {opportunities.map((opportunity) => {
          return (
            <Lead
              setSelectedLead={setSelectedLead}
              opportunity={opportunity}
              key={opportunity.id}
              setModal={setModal}
            />
          );
        })}
      </TableComponent>
    </div>
  );
}
