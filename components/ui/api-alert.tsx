"use client"

import { CopyIcon, ServerIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Badge, badgeVariants } from "./badge";
import { Button } from "./button";
import toast from "react-hot-toast";

interface ApiAlertProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const textMap: Record<ApiAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

const variantMap: Record<ApiAlertProps["variant"], "secondary" | "destructive" | "default" | "outline"> = {
  public: "secondary",
  admin: "destructive",
};

export const ApiAlert: React.FC<ApiAlertProps> = ({
  title,
  description,
  variant = "public",
}) => {

    const onCopy = (description:string) => {
        navigator.clipboard.writeText(description);
        toast.success("API Route copied to clipboard")

    }

  return (
    <Alert >
      <ServerIcon className="h-4 w-4" />
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge variant={variantMap[variant]}>
            {textMap[variant]}
        </Badge>
      </AlertTitle>
      <AlertDescription className="mt-4 flex items-center justify-between">
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
            {description}
        </code>
        <Button variant="ghost" size="icon" onClick={()=>{onCopy(description)}}>
            <CopyIcon className="h-4 w-4"/>
        </Button>
      </AlertDescription>
    </Alert>
  );
};
