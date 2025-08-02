"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {  ProductColumn } from "./columns";
import { Button } from "@/components/ui/button";
import {
  CopyIcon,
  Edit,
  EditIcon,
  MoreHorizontalIcon,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { AlertModal } from "@/components/modals/alert-modal";

interface CellActionProps {
  data: ProductColumn;
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {

    const router = useRouter()
    const params = useParams()

    const [loading,setLoading] = useState(false)
    const [open, setOpen] = useState(false)

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("ID copied to clipboard");
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/products/${data.id}`);
      router.refresh();
      toast.success("Product deleted successfully");
    } catch (e) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
    <AlertModal 
    isOpen={open}
    onClose={()=>setOpen(false)}
    onConfirm={onDelete}
    loading={loading}

    />
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-0" size="icon">
          <span className="sr-only">Open Menu</span>
          <MoreHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={()=> onCopy(data.id)}>
          <CopyIcon />
          Copy ID
        </DropdownMenuItem>
        <DropdownMenuItem onClick={()=> router.push(`/${params.storeId}/products/${data.id}`)}>
          <Edit />
          Update
        </DropdownMenuItem>
        <DropdownMenuItem onClick={()=> setOpen(true)}>
          <Trash2 />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    
    </>
    
  );
};

export default CellAction;
