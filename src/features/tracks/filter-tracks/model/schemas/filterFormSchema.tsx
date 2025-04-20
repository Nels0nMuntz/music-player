import { z } from "zod";

export const filterFormSchema = z.object({
  value: z.string().regex(/^[a-zA-Z0-9\s]*$/, {
    message: "Only Latin letters, numbers, and spaces are allowed",
  }),
});
