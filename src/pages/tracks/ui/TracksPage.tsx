import { SearchInput, AddTrackButton } from "@/features/tracks";
import { Section } from "./components/Section";
import { TrackList } from "./components/TrackList";
import { Player } from "./components/Player/Player";

export const TracksPage = () => {
  return (
    <main>
      <div className="main-container flex flex-col gap-y-10 mx-auto px-4 py-5">
        <h1 className="sr-only">Music Player</h1>
        <Section title="Now Playing">
          <Player />
        </Section>
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
