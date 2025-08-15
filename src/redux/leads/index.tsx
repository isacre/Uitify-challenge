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
    setLeads: (state, action: PayloadAction<LeadType[]>) => {
      state.data = action.payload;
    },
    updateLead: (state, action: PayloadAction<LeadType>) => {
      state.data = state.data.map((lead) =>
        lead.id === action.payload.id ? action.payload : lead
      );
    },
    removeLead: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter((lead) => lead.id !== action.payload);
    },
    updateLeadList: (state, action: PayloadAction<LeadType[]>) => {
      state.list = action.payload;
    },
  },
});

export const { setLeads, updateLead, removeLead, updateLeadList } =
  leadsSlice.actions;
export default leadsSlice.reducer;
