import Inputs from "@/components/inputs";
import ModalComponent from "@/components/modalComponent";
import { useAppSelector } from "@/redux/hooks";
import { setLeadsData } from "@/redux/leads";
import { addOpportunity } from "@/redux/opportunities";
import type { OpportunityStage, OpportunityType } from "@/types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

type OpportunityFormType = Omit<OpportunityType, "id">;

export default function ConvertLeadModal(props: {
  selectedLead: number | null;
  setSelectedLead: (lead: number | null) => void;
  setModal: (modal: "edit" | "convert" | null) => void;
  modal: "edit" | "convert" | null;
}) {
  const dispatch = useDispatch();
  const { selectedLead, setSelectedLead, setModal, modal } = props;
  const [simulateError, setSimulateError] = useState(false);
  const leadsList = useAppSelector((state) => state.leads.data);
  const opportunitiesData = useAppSelector((state) => state.opportunities);
  const data = useAppSelector((state) => state.leads.data);
  const leadIndex = leadsList.findIndex((lead) => lead.id === selectedLead);
  const lead = leadsList[leadIndex];
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      amount: undefined,
      accountName: lead?.company || "",
      stage: "prospect" as OpportunityStage,
      name: lead?.name || "",
    },
  });

  function simulatedLeadConversionRequest(
    leadId: number,
    opportunity: OpportunityFormType,
    simulateError: boolean
  ) {
    const p = new Promise((resolve, reject) => {
      if (simulateError) {
        reject(new Error("Simulated error"));
        return;
      }
      const leadIndex = data.findIndex((lead) => lead.id === leadId);
      if (leadIndex === -1) {
        reject(new Error("Lead not found"));
        return;
      }

      Object.keys(opportunity).forEach((key) => {
        if (
          opportunity[key as keyof OpportunityFormType] === "" &&
          key !== "amount"
        ) {
          reject(new Error(`${key} is required`));
          return;
        }
      });
      dispatch(addOpportunity({ ...opportunity, id: leadId }));
      dispatch(setLeadsData(data.filter((lead) => lead.id !== leadId)));
      localStorage.setItem(
        "leads",
        JSON.stringify(data.filter((lead) => lead.id !== leadId))
      );
      localStorage.setItem(
        "opportunities",
        JSON.stringify([
          { ...opportunity, id: leadId },
          ...opportunitiesData.data,
        ])
      );

      setTimeout(() => {
        resolve(true);
      }, 2000);
    });
    return p;
  }

  function onSubmit(data: OpportunityFormType) {
    setLoading(true);
    simulatedLeadConversionRequest(selectedLead as number, data, simulateError)
      .then(() => {
        window.alert("Lead converted successfully");
        setSelectedLead(null);
        setModal(null);
      })
      .catch((err) => {
        window.alert(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    if (lead) {
      reset({
        amount: undefined,
        accountName: lead?.company || "",
        stage: "prospect" as OpportunityStage,
        name: lead?.name || "",
      });
    }
  }, [lead, reset]);

  return (
    <ModalComponent
      header="Convert Lead"
      isOpen={selectedLead !== null && modal === "convert"}
      setIsOpen={(isOpen: boolean) => {
        if (!isOpen) {
          setSelectedLead(null);
          setModal(null);
        }
      }}
      formId="convert_lead_form"
      loading={loading}
    >
      <form
        id="convert_lead_form"
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={"flex flex-col gap-4"}>
          <Inputs.TextWithLabel
            title="Name"
            id="name"
            {...register("name")}
            type="text"
            required
          />
          <Inputs.SelectWithLabel
            title="Stage"
            id="stage"
            {...register("stage")}
            required
          >
            <option value="prospect">Prospect</option>
            <option value="negotiation">Negotiation</option>
            <option value="won">Won</option>
            <option value="lost">Lost</option>
          </Inputs.SelectWithLabel>
          <Inputs.TextWithLabel
            title="Account Name"
            id="accountName"
            {...register("accountName")}
            type="text"
            required
          />
          <Inputs.TextWithLabel
            title="Amount"
            type="number"
            id="amount"
            {...register("amount")}
          />
        </div>
        <Inputs.CheckboxWithLabel
          checked={simulateError}
          setChecked={setSimulateError}
          label="Simulate error"
        />
      </form>
    </ModalComponent>
  );
}
