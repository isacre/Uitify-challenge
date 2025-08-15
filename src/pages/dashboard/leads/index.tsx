import TableComponent from "@/components/tableComponent";
import useLeads from "@/hooks/useLeads";
import type { LeadStatus } from "@/types";
import { useState } from "react";
import Lead from "./lead";
import EditLeadModal from "./modals/editLead";
import ConvertLeadModal from "./modals/convertLead";
import Filters from "./filters";

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
  const { list, loading } = useLeads(search, status, currentSort);
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
      <Filters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />
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
        itemsCount={list.length}
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
        {list.map((lead) => {
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
