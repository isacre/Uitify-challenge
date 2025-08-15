import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface TabItem {
  value: string;
  label: string;
  content: React.ReactNode;
}

interface CustomTabsProps {
  tabs: TabItem[];
  defaultValue?: string;
  className?: string;
  tabsListClassName?: string;
  tabTriggerClassName?: string;
  tabsContentClassName?: string;
}

export default function TabsComponent({
  tabs,
  defaultValue,
  className = "",
  tabsListClassName = "before:bg-border relative h-auto w-full gap-0.5  p-0 before:absolute before:inset-x-0 before:bottom-0 before:h-px",
  tabTriggerClassName = "cursor-pointer bg-black overflow-hidden rounded-b-none border-x border-t py-2 data-[state=active]:z-10 data-[state=active]:shadow-none",
  tabsContentClassName = "",
}: CustomTabsProps) {
  const defaultTabValue = defaultValue || tabs[0]?.value || "";

  return (
    <Tabs defaultValue={defaultTabValue} className={className}>
      <TabsList className={tabsListClassName}>
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className={tabTriggerClassName}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent
          key={tab.value}
          value={tab.value}
          className={tabsContentClassName}
        >
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
