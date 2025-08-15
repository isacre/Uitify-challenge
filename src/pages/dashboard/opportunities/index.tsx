import TableComponent from "@/components/tableComponent";
import useOpportunities from "@/hooks/useOpportunities";
import type { OpportunityStage } from "@/types";
import { useState } from "react";
import Opportunity from "./opportunity";
import Filters from "./filters";

type OpportunitiesListFilters = {
  search: string;
  status: OpportunityStage;
  currentSort: string | null;
};

export default function OpportunitiesList() {
  const savedFilters = handleGetSavedFilters();
  const [search, setSearch] = useState(savedFilters.search);
  const [status, setStatus] = useState(savedFilters.status);
  const { list, loading } = useOpportunities(search, status);

  function handleGetSavedFilters(): OpportunitiesListFilters {
    let savedFilters: OpportunitiesListFilters = {
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
      <Filters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />
      <TableComponent
        loading={loading}
        itemsCount={list.length}
        columns={[
          { name: "Name" },
          { name: "Company" },
          { name: "Amount" },
          { name: "Stage" },
        ]}
      >
        {list.map((opportunity) => {
          return <Opportunity opportunity={opportunity} key={opportunity.id} />;
        })}
      </TableComponent>
    </div>
  );
}
