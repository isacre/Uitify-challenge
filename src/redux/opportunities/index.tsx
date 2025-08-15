import type { OpportunityType } from "@/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface OpportunitiesState {
  data: OpportunityType[];
  list: OpportunityType[];
}

const initialState: OpportunitiesState = {
  data: [],
  list: [],
};

export const opportunitiesSlice = createSlice({
  name: "opportunities",
  initialState,
  reducers: {
    setOpportunitiesData: (state, action: PayloadAction<OpportunityType[]>) => {
      state.data = action.payload;
    },
    setOpportunitiesList: (state, action: PayloadAction<OpportunityType[]>) => {
      state.list = action.payload;
    },
  },
});

export const { setOpportunitiesData, setOpportunitiesList } =
  opportunitiesSlice.actions;
export default opportunitiesSlice.reducer;
