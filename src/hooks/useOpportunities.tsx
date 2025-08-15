import useDebounce from "@/hooks/useDebounce";
import { useAppSelector } from "@/redux/hooks";
import {
  setOpportunitiesData,
  setOpportunitiesList,
} from "@/redux/opportunities";
import type { OpportunityStage, OpportunityType } from "@/types/index";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function useOpportunities(
  search: string,
  status: OpportunityStage
) {
  const [loading, setLoading] = useState(false);
  const { data, list } = useAppSelector((state) => state.opportunities);
  const dispatch = useDispatch();
  useDebounce(() => handleFiltering(search, status), 500, [search]);

  function saveFiltersLocally(search: string, status: OpportunityStage) {
    localStorage.setItem("filter", JSON.stringify({ search, status }));
  }

  const handleFiltering = useCallback(
    function handleFiltering(search: string, status: OpportunityStage) {
      saveFiltersLocally(search, status);
      setLoading(true);
      const dataCopy = [...data];
      let filtered = dataCopy.filter(
        (opportunity) =>
          opportunity.name
            .toLowerCase()
            .includes(search.toLowerCase().trim()) ||
          opportunity.accountName
            .toLowerCase()
            .includes(search.toLowerCase().trim())
      );

      if (status !== "all") {
        filtered = filtered.filter(
          (opportunity) => opportunity.stage === status
        );
      }

      setTimeout(() => {
        dispatch(setOpportunitiesList(filtered as OpportunityType[]));
        setLoading(false);
      }, 1000);
    },
    [data, dispatch]
  );

  // Initialize leads from localStorage or data.json
  useEffect(() => {
    const localStorageOpportunities = localStorage.getItem("opportunities");
    if (localStorageOpportunities) {
      dispatch(setOpportunitiesData(JSON.parse(localStorageOpportunities)));
    }
  }, [dispatch]);

  useEffect(() => {
    if (data.length === 0) return;
    handleFiltering(search, status);
    //eslint-disable-next-line
  }, [status, data, handleFiltering]);

  return { list, loading };
}
