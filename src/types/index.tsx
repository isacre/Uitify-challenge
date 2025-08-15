export type LeadStatus = "new" | "contacted" | "qualified" | "closed" | "all";
export type LeadSource = "LinkedIn" | "Website" | "Referral" | "Trade Show";
export type OpportunityStage =
  | "prospect"
  | "negotiation"
  | "won"
  | "lost"
  | "all";
export type LeadType = {
  id: number;
  name: string;
  company: string;
  email: string;
  source: LeadSource;
  score: number;
  status: LeadStatus;
};

export type LeadFormType = {
  name: string;
  company: string;
  email: string;
  source: LeadSource;
  score: number;
  status: LeadStatus;
};

export type OpportunityType = {
  id: number;
  name: string;
  stage: OpportunityStage;
  amount?: number;
  accountName: string;
};
