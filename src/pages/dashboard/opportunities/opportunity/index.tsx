import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import type { OpportunityType } from "../../../../types/index";

export default React.memo(function Opportunity(props: {
  opportunity: OpportunityType;
}) {
  const { accountName, amount, name, stage } = props.opportunity;

  return (
    <TableRow className="cursor-pointer">
      <TableCell>{name}</TableCell>
      <TableCell>{accountName}</TableCell>
      <TableCell>{amount}</TableCell>
      <TableCell>{stage}</TableCell>
    </TableRow>
  );
});
