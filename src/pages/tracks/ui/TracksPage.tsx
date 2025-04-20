import { SearchInput, AddTrackButton } from "@/features/tracks";
import { Section } from "./components/Section";
import { TrackList } from "./components/TrackList";

export const TracksPage = () => {
  return (
    <main>
      <div className="container mx-auto px-4 py-5">
        <h1 className="sr-only">Music Player</h1>
        <Section title="Your Tracks">
          <div className="w-full flex items-start justify-between gap-x-2">
            <SearchInput />
            <AddTrackButton />
          </div>
          <TrackList />
        </Section>
      </div>
    </main>
  );
};
