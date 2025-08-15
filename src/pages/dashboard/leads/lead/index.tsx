import { TableCell, TableRow } from "@/components/ui/table";
import type { LeadType } from "../../../../types/index";
import ButtonComponent from "@/components/buttonComponent";
import React from "react";

export default React.memo(function Lead(props: {
  lead: LeadType;
  setModal: (modal: "edit" | "convert" | null) => void;
  setSelectedLead: (id: number) => void;
}) {
  const { company, email, name, score, source, status, id } = props.lead;
  const { setModal, setSelectedLead } = props;

  return (
    <TableRow
      onClick={() => {
        setSelectedLead(id);
        setModal("edit");
      }}
      className="cursor-pointer"
    >
      <TableCell>{name}</TableCell>
      <TableCell>{company}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{source}</TableCell>
      <TableCell>{score}</TableCell>
      <TableCell>{status}</TableCell>
      <TableCell
        onClick={(e) => {
          e.stopPropagation();
          setSelectedLead(id);
          setModal("convert");
        }}
      >
        <ButtonComponent text="Convert" />
      </TableCell>
    </TableRow>
  );
});
