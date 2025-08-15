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
  const { getLeadById, leads } = useLeadsCore();
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
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!data.email) {
      return window.alert("Email is required");
    }
    if (!emailRegex.test(data.email)) {
      return window.alert("Invalid email");
    }
    const leadIndex = leads.findIndex(
      (lead: LeadType) => lead.id === selectedLead
    );
    if (leadIndex === -1) {
      return window.alert("Lead not found");
    }
    const LeadsCopy = JSON.parse(JSON.stringify(leads));
    LeadsCopy[leadIndex] = { ...data, id: selectedLead };
    localStorage.setItem("leads", JSON.stringify(LeadsCopy));
    setModal(null);
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
