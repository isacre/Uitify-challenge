import TableComponent from "@/components/tableComponent";
import useLeads from "@/hooks/useLeads";
import type { LeadStatus } from "@/types";
import { useState } from "react";
import Lead from "./lead";
/* import ConvertLeadModal from "./modals/convertLead";
import EditLeadModal from "./modals/editLead"; */

type LeadListFilters = {
  search: string;
  status: LeadStatus;
  currentSort: string | null;
};

export default function LeadsList() {
  const savedFilters = handleGetSavedFilters();
  const [search, setSearch] = useState(savedFilters.search);
  const [status, setStatus] = useState(savedFilters.status);
  const [selectedLead, setSelectedLead] = useState<number | null>(null);
  const [currentSort, setCurrentSort] = useState<string | null>(
    savedFilters.currentSort
  );
  const { leads, loading } = useLeads(search, status, currentSort);
  const [modal, setModal] = useState<"edit" | "convert" | null>(null);
  function handleGetSavedFilters(): LeadListFilters {
    let savedFilters: LeadListFilters = {
      search: "",
      status: "all",
      currentSort: null,
    };
    if (localStorage.getItem("filter")) {
      savedFilters = JSON.parse(localStorage.getItem("filter") || "{}");
    }
    return savedFilters;
  }

  return (
    <div className="flex flex-col gap-4 p-4 h-[calc(100vh-10rem)]">
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
        </select>
      </div>
      {/*     <EditLeadModal
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
      /> */}
      <TableComponent
        loading={loading}
        itemsCount={leads.length}
        columns={[
          { name: "Name" },
          { name: "Company" },
          { name: "Email" },
          { name: "Source" },
          { name: "Score", sortable: true },
          { name: "Status" },
          { name: "Convert" },
        ]}
        currentSort={currentSort}
        setCurrentSort={setCurrentSort}
      >
        {leads.map((lead) => {
          return (
            <Lead
              setSelectedLead={setSelectedLead}
              lead={lead}
              key={lead.id}
              setModal={setModal}
            />
          );
        })}
      </TableComponent>
    </div>
  );
}
