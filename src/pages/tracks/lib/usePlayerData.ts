import { useCallback, useEffect, useState } from "react";
import { useSorting, useFilters, usePagination, useSearchText } from "@/shared/model";
import {
  useTrack,
  useTrackIndex,
  useList,
  useIsInitialized,
  usePlayerActions,
  useDirection,
  useIsListUpdated,
} from "@/shared/model";
import { useDebounce } from "@/shared/lib";
import { useTracksQuery } from "../api/useTracksQuery";

export const usePlayerData = () => {
  const list = useList();
  const track = useTrack();
  const trackIndex = useTrackIndex();
  const isInitialized = useIsInitialized();
  const direction = useDirection();
  const {
    setTrack,
    setTrackIndex,
    setList,
    setIsInitialized,
    setDirection,
    setIsWaitingForNewList,
    setIsListUpdated,
  } = usePlayerActions();
  const sorting = useSorting();
  const filters = useFilters();
  const pagination = usePagination();
  const searchText = useSearchText();
  const isListUpdated = useIsListUpdated();
  const debouncedSearchText = useDebounce(searchText, 500);

  const [playerPagination, setPlayerPagination] = useState(pagination);

  const { tracksData, isLoadingTracks } = useTracksQuery({
    pagination: playerPagination,
    sorting: {
      sortBy: sorting[0]?.id,
      order: sorting[0]?.desc ? "desc" : "asc",
    },
    filters: {
      artist: filters.artist,
      genre: filters.genres,
    },
    search: debouncedSearchText,
  });

  const hasNext = !!tracksData?.meta && tracksData.meta.page < tracksData.meta.totalPages;
  const hasPrevious = playerPagination.pageIndex > 0;

  const setNextTrack = () => {
    setDirection("next");
    const nextTrackIndex = trackIndex + 1;
    if (list[nextTrackIndex]) {
      setTrack(list[nextTrackIndex]);
      setTrackIndex(nextTrackIndex);
    } else if (hasNext) {
      fetchNextPage();
      setIsWaitingForNewList(true);
    }
  };

  const setPrevTrack = () => {
    setDirection("previous");
    const prevTrackIndex = trackIndex - 1;
    if (prevTrackIndex < 0 && hasPrevious) {
      fetchPreviousPage();
      setIsWaitingForNewList(true);
    } else {
      setTrack(list[prevTrackIndex]);
      setTrackIndex(prevTrackIndex);
    }
  };

  const fetchNextPage = useCallback(() => {
    if (isLoadingTracks || !hasNext) return;
    setPlayerPagination({
      ...playerPagination,
      pageIndex: playerPagination.pageIndex + 1,
    });
  }, [playerPagination, hasNext, isLoadingTracks]);

  const fetchPreviousPage = useCallback(() => {
    if (isLoadingTracks || !hasPrevious) return;
    setPlayerPagination({
      ...playerPagination,
      pageIndex: playerPagination.pageIndex - 1,
    });
  }, [playerPagination, hasPrevious, isLoadingTracks]);

  // update list
  useEffect(() => {
    if (!tracksData?.data?.length) return;

    const listData = tracksData.data.filter(({ audioFile }) => !!audioFile);

    if (listData.length) {
      setList(listData);
      return;
    }

    if (direction === "next") {
      if (hasNext) {
        fetchNextPage();
        return;
      } else {
        setIsInitialized(true);
        return;
      }
    } else if (direction === "previous") {
      if (hasPrevious) {
        fetchPreviousPage();
        return;
      } else {
        setIsInitialized(true);
        return;
      }
    }
  }, [tracksData, hasNext, hasPrevious, direction, fetchNextPage]);

  useEffect(() => {
    setIsInitialized(true);
    setIsListUpdated(true);
  }, [list]);

  // set initial track
  useEffect(() => {
    if (isListUpdated && list.length && !track) {
      setTrack(list[0]);
      setTrackIndex(0);
      setIsListUpdated(false);
    }
  }, [list, isListUpdated, track]);

  // sync track
  useEffect(() => {
    // if (isListUpdated && isWaitingForNewList && list.length && track !== list[0]) {
    if (isListUpdated && list.length && track !== list[0]) {
      const nextTrackIndex = direction === "next" ? 0 : list.length - 1;
      setTrack(list[nextTrackIndex]);
      setTrackIndex(nextTrackIndex);
      setIsListUpdated(false);
      setIsWaitingForNewList(false);
    }
  }, [list, track, isListUpdated, direction]);

  // sync pagination
  useEffect(() => setPlayerPagination(pagination), [pagination]);

  return {
    isInitialized,
    hasNext,
    hasPrevious,
    track,
    trackIndex,
    setNextTrack,
    setPrevTrack,
  };
};
