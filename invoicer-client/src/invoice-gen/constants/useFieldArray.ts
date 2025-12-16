import { useFieldArray } from "react-hook-form";
import { type ReceiptFormData } from "../constants/invoice";

export const useReceiptFormFields = (control: any) => {
  const { fields, append, remove } = useFieldArray<ReceiptFormData>({
    control,
    name: "items",
  });

  return { fields, append, remove };
};
