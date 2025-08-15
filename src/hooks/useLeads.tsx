import data from "@/data/leads.json";
import useDebounce from "@/hooks/useDebounce";
import { useEffect, useState } from "react";
import type { LeadStatus, LeadType } from "@/types/index";

export function useLeadsCore() {
  const leads = data.leads as LeadType[];

  function getLeadById(id: number | null): LeadType | undefined {
    if (!id) return undefined;
    return leads.find((lead: LeadType) => lead.id === id);
  }

  return { getLeadById, leads };
}

export default function useLeads(
  search: string,
  status: LeadStatus,
  currentSort: string | null
) {
  const localStorageLeads = localStorage.getItem("leads");
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState<LeadType[]>(
    localStorageLeads
      ? JSON.parse(localStorageLeads)
      : (data.leads as LeadType[])
  );
  console.log("ALI");

  useDebounce(() => handleFiltering(search, status), 500, [search]);

  function saveFiltersLocally(
    search: string,
    status: LeadStatus,
    currentSort: string | null
  ) {
    localStorage.setItem(
      "filter",
      JSON.stringify({ search, status, currentSort })
    );
  }
  function handleSortingByScore(currentSort: string | null, leads: LeadType[]) {
    if (currentSort) {
      const order = currentSort.split("&")[1];
      if (order === "desc") {
        leads.sort((a, b) => b.score - a.score);
      } else {
        leads.sort((a, b) => a.score - b.score);
      }
    }
    return leads;
  }

  function handleFiltering(search: string, status: LeadStatus) {
    saveFiltersLocally(search, status, currentSort);
    setLoading(true);
    let filtered = leads.filter(
      (lead) =>
        lead.name.toLowerCase().includes(search.toLowerCase()) ||
        lead.company.toLowerCase().includes(search.toLowerCase())
    );

    if (status !== "all") {
      filtered = filtered.filter((lead) => lead.status === status);
    }

    if (currentSort) {
      filtered = handleSortingByScore(currentSort, filtered as LeadType[]);
    }

    setTimeout(() => {
      setLeads(filtered as LeadType[]);
      setLoading(false);
    }, 1000);
  }

  useEffect(() => {
    if (status === "all" && !currentSort) {
      return;
    }
    handleFiltering(search, status);

    //eslint-disable-next-line
  }, [status, currentSort]);

  return { leads, setLeads, loading };
}
