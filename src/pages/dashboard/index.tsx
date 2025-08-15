import TabsComponent from "@/components/tabsComponent";
import LeadsList from "./leads";
import OpportunitiesList from "./opportunities";

export default function Dashboard() {
  return (
    <div>
      <TabsComponent
        tabs={[
          { value: "leads", label: "Leads", content: <LeadsList /> },
          {
            value: "opportunities",
            label: "Opportunities",
            content: <OpportunitiesList />,
          },
        ]}
      />
    </div>
  );
}
