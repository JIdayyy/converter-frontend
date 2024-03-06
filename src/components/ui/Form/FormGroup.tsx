import { ReactNode } from "react";
import { Label } from "@/components/ui/label";

export default function FormGroup({
  children,
  label,
}: Readonly<{ children: ReactNode; label: string }>) {
  return (
    <div className={"flex w-full align-middle items-center justify-between"}>
      <Label>{label}</Label>
      {children}
    </div>
  );
}
