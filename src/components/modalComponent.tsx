import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import LoadingSpinner from "./loadingSpinner";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  header: string;
  children: React.ReactNode;
  formId: string;
  loading?: boolean;
}
export default function ModalComponent(props: Props) {
  const { isOpen, setIsOpen, header, children, formId, loading } = props;
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5 bg-black">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4 text-base">
            {header}
          </DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto h-full my-6">
          <div className="px-6  h-full oveflow-y-auto">
            {loading ? <LoadingSpinner height="h-full" /> : children}
          </div>
        </div>

        <DialogFooter className="border-t px-6 py-4">
          <DialogClose asChild disabled={loading}>
            <Button
              type="button"
              variant="outline"
              className="bg-black"
              disabled={loading}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            form={formId}
            type="submit"
            variant={"outline"}
            className="bg-black"
            disabled={loading}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
