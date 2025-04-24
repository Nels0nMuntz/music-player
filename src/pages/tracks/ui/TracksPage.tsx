import { SearchInput, AddTrackButton, DeleteMultipleTraksButton } from "@/features/tracks";
import { Section } from "./components/Section";
import { TrackList } from "./components/TrackList";
import { AudioPlayer } from "./components/AudioPlayer/AudioPlayer";
import { usePlaylistIsInitialized } from "@/shared/model";
import { LoadingIndicator } from "@/shared/ui";

export const TracksPage = () => {
  const initialized = usePlaylistIsInitialized();
  return (
    <>
      <LoadingIndicator open={!initialized} />
      <main aria-disabled={initialized ? "false" : "true"}>
        <div className="main-container flex flex-col gap-y-10 mx-auto px-4 py-5">
          <h1 className="sr-only" data-testid="tracks-header">
            Music Player
          </h1>
          <Section title="Now Playing">
            <AudioPlayer />
          </Section>
          <Section title="Your Tracks">
            <div className="w-full flex flex-col-reverse xs:flex-row items-start justify-between gap-x-2 gap-y-3 mb-4">
              <div className="w-full flex items-center flex-wrap gap-x-4 gap-y-3">
                <SearchInput />
                <DeleteMultipleTraksButton />
              </div>
              <AddTrackButton />
            </div>
            <TrackList />
          </Section>
        </div>
      </main>
    </>
  );
};
