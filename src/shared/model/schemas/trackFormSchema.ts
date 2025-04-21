import { z } from "zod";

const commonString = z
  .string()
  .min(1, { message: "This field is required" })
  .max(100, { message: "Too long" })
  .regex(/^[a-zA-Z0-9\s.,!?'"-_:/;]+$/, {
    message: "Only letters, numbers, spaces, and common symbols are allowed",
  });

export const trackFormSchema = z.object({
  title: commonString.max(50, { message: "Title must be 50 characters or fewer" }),
  artist: commonString.max(50, { message: "Artist name must be 50 characters or fewer" }),
  album: z
    .string()
    .max(50, { message: "Album name must be 50 characters or fewer" })
    .regex(/^[a-zA-Z0-9\s.,!?'"-_:/;]+$/, {
      message: "Only letters, numbers, spaces, and common symbols are allowed",
    })
    .optional()
    .or(z.literal("")),
  genres: z
    .array(z.object({ label: z.string(), value: z.string() }))
    .min(1, { message: "At least one genre is required." })
    .max(5, { message: "You can select up to 5 genres only." }),
  coverImage: z
    .string()
    .url({ message: "Cover image must be a valid URL." })
    .optional()
    .or(z.literal("")),
});
