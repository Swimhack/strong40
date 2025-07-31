import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import TeamSignupForm from "./TeamSignupForm";

interface TeamSignupModalProps {
  trigger: React.ReactNode;
}

export default function TeamSignupModal({ trigger }: TeamSignupModalProps) {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <TeamSignupForm onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
}