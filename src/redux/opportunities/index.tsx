import type { OpportunityType } from "@/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface OpportunitiesState {
  data: OpportunityType[];
}

const initialState: OpportunitiesState = {
  data: [],
};

export const opportunitiesSlice = createSlice({
  name: "opportunities",
  initialState,
  reducers: {
    setOpportunities: (state, action: PayloadAction<OpportunityType[]>) => {
      state.data = action.payload;
    },
    updateOpportunity: (state, action: PayloadAction<OpportunityType>) => {
      state.data = state.data.map((opportunity) =>
        opportunity.id === action.payload.id ? action.payload : opportunity
      );
    },
  },
});

export const { setOpportunities, updateOpportunity } =
  opportunitiesSlice.actions;
export default opportunitiesSlice.reducer;
