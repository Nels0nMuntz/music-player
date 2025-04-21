import { z } from "zod";
import { trackFormSchema } from "../schemas/trackFormSchema";

export type TrackFormValues = z.infer<typeof trackFormSchema>;
