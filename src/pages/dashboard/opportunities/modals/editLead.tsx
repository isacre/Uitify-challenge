import Inputs from "@/components/inputs";
import ModalComponent from "@/components/modalComponent";
import { useLeadsCore } from "@/hooks/useLeads";
import type { LeadType } from "@/types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type LeadFormType = Omit<LeadType, "id">;

export default function EditLeadModal(props: {
  selectedLead: number | null;
  setSelectedLead: (lead: number | null) => void;
  setModal: (modal: "edit" | "convert" | null) => void;
  modal: "edit" | "convert" | null;
}) {
  const { selectedLead, setSelectedLead, setModal, modal } = props;
  const { getLeadById } = useLeadsCore();
  const lead = getLeadById(selectedLead);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: lead?.name || "",
      company: lead?.company || "",
      email: lead?.email || "",
      source: lead?.source || "LinkedIn",
      score: lead?.score || 0,
      status: lead?.status || "new",
    },
  });

  function onSubmit(data: LeadFormType) {
    console.log(data);
  }

  useEffect(() => {
    if (lead) {
      reset({
        name: lead.name,
        company: lead.company,
        email: lead.email,
        source: lead.source,
        score: lead.score,
        status: lead.status,
      });
    }
  }, [lead, reset]);

  return (
    <ModalComponent
      header="Edit Lead"
      isOpen={selectedLead !== null && modal === "edit"}
      setIsOpen={(isOpen: boolean) => {
        if (!isOpen) {
          setSelectedLead(null);
          setModal(null);
        }
      }}
      formId="edit-lead-form"
    >
      <form
        id="edit-lead-form"
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Inputs.TextWithLabel
          id="email"
          title="Email"
          type="email"
          {...register("email")}
          required
        />
        <Inputs.SelectWithLabel
          id="status"
          title="Status"
          {...register("status")}
        >
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="qualified">Qualified</option>
          <option value="closed">Closed</option>
        </Inputs.SelectWithLabel>
        <Inputs.TextWithLabel
          id="name"
          title="Name"
          type="text"
          {...register("name")}
          disabled
        />
        <Inputs.TextWithLabel
          id="company"
          title="Company"
          type="text"
          {...register("company")}
          disabled
        />

        <Inputs.TextWithLabel
          id="source"
          title="Source"
          type="text"
          {...register("source")}
          disabled
        />
        <Inputs.TextWithLabel
          id="score"
          title="Score"
          type="number"
          {...register("score")}
          disabled
        />
      </form>
    </ModalComponent>
  );
}
