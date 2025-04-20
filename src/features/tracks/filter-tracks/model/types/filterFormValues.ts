import { z } from "zod";
import { filterFormSchema } from "../schemas/filterFormSchema";

export type FilterFormValues = z.infer<typeof filterFormSchema>;
