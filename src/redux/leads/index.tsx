import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { LeadType } from "@/types";

interface LeadsState {
  data: LeadType[];
  list: LeadType[];
}

const initialState: LeadsState = {
  data: [],
  list: [],
};

export const leadsSlice = createSlice({
  name: "leads",
  initialState,
  reducers: {
    setLeadsData: (state, action: PayloadAction<LeadType[]>) => {
      state.data = action.payload;
    },
    setLeadList: (state, action: PayloadAction<LeadType[]>) => {
      state.list = action.payload;
    },
  },
});

export const { setLeadsData, setLeadList } = leadsSlice.actions;
export default leadsSlice.reducer;
