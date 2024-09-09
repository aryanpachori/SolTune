import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BACKEND_URL } from "@/lib/config";

interface CreateSpaceDialogProps {
  open: boolean;
  onClose: () => void;
}
export default function CreateSpaceDialog({
  open,
  onClose,
}: CreateSpaceDialogProps) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const router = useRouter();

  async function handleCreateSpace() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/space/create`,
        {
          name,
          amount,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        const { space } = response.data;
        console.log("Space created:", space);
        router.push(`/space/${space.id}`);
      } else if (response.status >= 400 && response.status < 500) {
        console.error("Client error:", response.data);
      } else if (response.status >= 500 && response.status < 600) {
        console.error("Server error:", response.data);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <Button>Create New Space</Button>
      </DialogTrigger>
      <DialogContent className="bg-[#0D0D0D] p-6 rounded-lg w-[500px] max-w-full">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#B49FFF]">
            Create New Space
          </DialogTitle>
          <DialogDescription className="text-[#CCCCCC]">
            Add details for your new space.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 mt-6">
          <div className="grid gap-1">
            <Label htmlFor="name" className="text-[#CCCCCC]">
              Space Name
            </Label>
            <Input
              onChange={(e) => {
                setName(e.target.value);
              }}
              id="name"
              placeholder="John doe"
              className="bg-[#1A1A1A] border-[#4C4C4C] text-[#CCCCCC] rounded-lg"
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="amount" className="text-[#CCCCCC]">
              Min amount for adding songs(in SOL)
            </Label>
            <Input
              onChange={(e) => {
                setAmount(Number(e.target.value));
              }}
              id="amount"
              placeholder="1SOL"
              type="number"
              className="bg-[#1A1A1A] border-[#4C4C4C] text-[#CCCCCC] rounded-lg"
            />
          </div>
        </div>
        <DialogFooter className="mt-6 flex justify-end gap-2">
          <Button
            onClick={onClose}
            variant="secondary"
            className="bg-[#4C4C4C] text-[#CCCCCC]"
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreateSpace}
            className="bg-[#B49FFF] text-[#0D0D0D]"
          >
            Create Space
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
