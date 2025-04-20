import { SearchInput } from "@/features/tracks";
import { Section } from "./components/Section";
import { TrackList } from "./components/TrackList";

export const TracksPage = () => {
  return (
    <main>
      <div className="container mx-auto px-4 py-5">
        <h1 className="sr-only">Music Player</h1>
        <Section title="Your Tracks">
          <SearchInput />
          <TrackList />
        </Section>
      </div>
    </main>
  );
};
