import React from "react";
import { MdPlayArrow, MdPause } from "react-icons/md";
import AudioPlayer from "./components/Audio/AudioPlayer";

import { songs } from "./songs";
import { useTrack, useTrackIndex } from "@/shared/model";
import { usePlayerData } from "../lib/usePlayerData";

export function Page() {
    const track = useTrack()
    const trackIndex = useTrackIndex()
    const {setNextTrack, setPrevTrack} = usePlayerData()
    const [currentSongIndex, setCurrentSongIndex] = React.useState(-1);

    console.log({trackIndex});

    const [song, setSong] = React.useState<any>()
    

  return (
    <div className="flex flex-col h-full bg-slate-800 text-slate-300">
      <div className="container mx-auto px-6 py-8 flex-1">
        <h1 className="text-4xl font-bold mb-8">My Audio Player</h1>
        <ul>
          {songs.map((song, index) => (
            <li key={song.title} className="mb-1">
              <button
                onClick={() => setCurrentSongIndex(index)}
                className={`flex items-center py-4 px-3  w-full space-evenly rounded ${
                  currentSongIndex === index
                    ? "bg-amber-600 text-white"
                    : " hover:bg-amber-600 hover:text-white"
                }`}
              >
                <span className="text-sm">{index + 1 < 10 ? "0" + (index + 1) : index + 1}</span>
                <h2 className="flex-1">{song.title}</h2>
                <span>
                  {index === currentSongIndex ? <MdPause size={20} /> : <MdPlayArrow size={20} />}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto">
        <AudioPlayer
          key={trackIndex}
          currentSong={track}
          songCount={songs.length}
          songIndex={trackIndex}
          onNext={setNextTrack}
          onPrev={setPrevTrack}
        />
      </div>
    </div>
  );
}
