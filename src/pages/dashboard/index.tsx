import TabsComponent from "@/components/tabsComponent";
import LeadsList from "./leads";
import OpportunitiesList from "./opportunities";
import { useNavigate, useParams } from "react-router-dom";

export default function Dashboard() {
  const { tab } = useParams();
  const navigate = useNavigate();
  return (
    <div>
      <TabsComponent
        defaultValue={tab || "leads"}
        tabs={[
          {
            value: "leads",
            label: "Leads",
            content: <LeadsList />,
            onClick: () => navigate("/leads"),
          },
          {
            value: "opportunities",
            label: "Opportunities",
            content: <OpportunitiesList />,
            onClick: () => navigate("/opportunities"),
          },
        ]}
      />
    </div>
  );
}
