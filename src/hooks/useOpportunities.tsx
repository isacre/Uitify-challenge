import useDebounce from "@/hooks/useDebounce";
import { useState } from "react";
import type { LeadStatus, OpportunityType } from "@/types/index";

export default function useOpportunities(search: string, status: LeadStatus) {
  const localStorageOpportunities = localStorage.getItem("opportunities");
  const [loading, setLoading] = useState(false);
  const [opportunities, setOpportunities] = useState<OpportunityType[]>(
    localStorageOpportunities ? JSON.parse(localStorageOpportunities) : []
  );
  useDebounce(() => handleFiltering(search, status), 500, [search]);

  function saveFiltersLocally(search: string, status: LeadStatus) {
    localStorage.setItem(
      "filter-opportunities",
      JSON.stringify({ search, status })
    );
  }

  function handleFiltering(search: string, status: LeadStatus) {
    saveFiltersLocally(search, status);
    setLoading(true);
    const filtered = opportunities.filter(
      (opportunity: OpportunityType) =>
        opportunity.name.toLowerCase().includes(search.toLowerCase()) ||
        opportunity.accountName.toLowerCase().includes(search.toLowerCase())
    );

    setTimeout(() => {
      setOpportunities(filtered as OpportunityType[]);
      setLoading(false);
    }, 1000);
  }

  return { opportunities, setOpportunities, loading };
}
