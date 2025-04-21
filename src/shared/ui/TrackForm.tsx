import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { TrackFormValues } from "../model/types/trackFormValues";
import { zodResolver } from "@hookform/resolvers/zod";
import { Genre } from "@/entities/genres";
import { trackFormSchema } from "../model/schemas/trackFormSchema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./tailwind/form";
import { TextField } from "./TextField";
import { MultipleSelector } from "./MultipleSelector";
import { CoverLoader } from "./CoverLoader";

interface Props {
  values?: TrackFormValues;
  genres: Genre[];
  actions: React.ReactNode;
  onSubmit: (values: Omit<TrackFormValues, "genres"> & { genres: string[] }) => void;
}

export const TrackForm: React.FC<Props> = ({ values, actions, genres, onSubmit }) => {
  const [coverLoadingError, setCoverLoadingError] = useState("");
  const form = useForm<TrackFormValues>({
    resolver: zodResolver(trackFormSchema),
    defaultValues: {
      title: "",
      artist: "",
      album: "",
      coverImage: "",
      genres: [],
      ...values,
    },
  });
  const imageUrl = form.watch("coverImage");
  const options = useMemo(() => {
    return genres.map((item) => ({ label: item, value: item }));
  }, genres);
  const handleSubmit = form.handleSubmit(
    (values) => {
      if (coverLoadingError) {
        form.setError("coverImage", { message: coverLoadingError, type: "custom" });
        return;
      }
      onSubmit({
        ...values,
        genres: values.genres.map(({ value }) => value),
      });
    },
    (errors) => console.log({ errors }),
  );
  const handleCoverLoaderError = (error: string) => {
    if(error) {
      setCoverLoadingError(error);
      form.setError("coverImage", { message: error, type: "custom" });
    } else {
      setCoverLoadingError("");
      form.trigger("coverImage")
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField control={form.control} name="title" label="Title *" />
        <TextField control={form.control} name="artist" label="Artist *" />
        <FormField
          control={form.control}
          name="genres"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Genres *</FormLabel>
              <FormControl>
                <MultipleSelector
                  {...field}
                  value={field.value}
                  defaultOptions={options}
                  emptyIndicator={
                    <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                      No options
                    </p>
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <TextField control={form.control} name="album" label="Album" />
        <CoverLoader
          url={imageUrl || ""}
          control={form.control}
          name="coverImage"
          label="Cover image"
          onError={handleCoverLoaderError}
        />
        {actions}
      </form>
    </Form>
  );
};
