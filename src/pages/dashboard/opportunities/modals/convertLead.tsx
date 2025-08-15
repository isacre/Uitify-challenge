import Inputs from "@/components/inputs";
import ModalComponent from "@/components/modalComponent";
import { useLeadsCore } from "@/hooks/useLeads";
import type { OpportunityStage, OpportunityType } from "@/types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type OpportunityFormType = Omit<OpportunityType, "id">;

export default function ConvertLeadModal(props: {
  selectedLead: number | null;
  setSelectedLead: (lead: number | null) => void;
  setModal: (modal: "edit" | "convert" | null) => void;
  modal: "edit" | "convert" | null;
}) {
  const { selectedLead, setSelectedLead, setModal, modal } = props;
  const { getLeadById, convertLeadToOpportunity } = useLeadsCore();
  const lead = getLeadById(selectedLead);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      amount: undefined,
      accountName: lead?.company || "",
      stage: "prospect" as OpportunityStage,
      name: lead?.name || "",
    },
  });

  function onSubmit(data: OpportunityFormType) {
    if (selectedLead) {
      convertLeadToOpportunity(selectedLead);
    }
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
      </form>
    </ModalComponent>
  );
}
