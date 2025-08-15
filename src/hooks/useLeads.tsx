import jsonData from "@/data/leads.json";
import useDebounce from "@/hooks/useDebounce";
import { useCallback, useEffect, useState } from "react";
import type { LeadStatus, LeadType } from "@/types/index";
import { useAppSelector } from "@/redux/hooks";
import { useDispatch } from "react-redux";
import { setLeadList, setLeadsData } from "@/redux/leads";

export default function useLeads(
  search: string,
  status: LeadStatus,
  currentSort: string | null
) {
  const [loading, setLoading] = useState(false);
  const { data, list } = useAppSelector((state) => state.leads);
  const dispatch = useDispatch();
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

  const handleFiltering = useCallback(
    function handleFiltering(search: string, status: LeadStatus) {
      saveFiltersLocally(search, status, currentSort);
      setLoading(true);
      const dataCopy = [...data];
      let filtered = dataCopy.filter(
        (lead) =>
          lead.name.toLowerCase().includes(search.toLowerCase().trim()) ||
          lead.company.toLowerCase().includes(search.toLowerCase().trim())
      );

      if (status !== "all") {
        filtered = filtered.filter((lead) => lead.status === status);
      }

      if (currentSort) {
        filtered = handleSortingByScore(currentSort, filtered as LeadType[]);
      }

      setTimeout(() => {
        dispatch(setLeadList(filtered as LeadType[]));
        setLoading(false);
      }, 1000);
    },
    [data, dispatch, currentSort]
  );

  // Initialize leads from localStorage or data.json
  useEffect(() => {
    const localStorageLeads = localStorage.getItem("leads");
    if (localStorageLeads) {
      dispatch(setLeadsData(JSON.parse(localStorageLeads)));
    } else {
      dispatch(setLeadsData(jsonData.leads as LeadType[]));
    }
  }, [dispatch]);

  useEffect(() => {
    if (data.length === 0) return;
    handleFiltering(search, status);
    //eslint-disable-next-line
  }, [status, currentSort, data, handleFiltering]);

  return { list, loading };
}
