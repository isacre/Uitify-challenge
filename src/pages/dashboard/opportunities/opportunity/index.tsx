import ButtonComponent from "@/components/buttonComponent";
import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import type { OpportunityType } from "../../../../types/index";

export default React.memo(function Opportunity(props: {
  opportunity: OpportunityType;
  setModal: (modal: "edit" | "convert" | null) => void;
  setSelectedLead: (id: number) => void;
}) {
  const { accountName, amount, name, id, stage } = props.opportunity;
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
      <TableCell>{accountName}</TableCell>
      <TableCell>{amount}</TableCell>
      <TableCell>{stage}</TableCell>
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
