import { z } from "zod";
import { trackFormSchema } from "../schema/trackFormSchema";

export type TrackFormValues = z.infer<typeof trackFormSchema>;
