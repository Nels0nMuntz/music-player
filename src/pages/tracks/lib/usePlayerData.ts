import { useCallback, useEffect, useState } from "react";
import { useSorting, useFilters, usePagination, useSearchText } from "@/shared/model";
import {
  useTrack,
  useTrackIndex,
  useList,
  usePlayerActions,
  useDirection,
  useIsListUpdated,
  useHasNext,
  useHasPrevious,
} from "@/shared/model";
import { useDebounce } from "@/shared/lib";
import { useTracksQuery } from "../api/useTracksQuery";

export const usePlayerData = () => {
  const list = useList();
  const track = useTrack();
  const trackIndex = useTrackIndex();
  const direction = useDirection();
  const hasNextPage = useHasNext();
  const hasPreviousPage = useHasPrevious();
  const {
    setTrack,
    setTrackIndex,
    setList,
    setIsInitialized,
    setDirection,
    setIsWaitingForNewList,
    setIsListUpdated,
    setHasPrevious,
    setHasNext,
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

  const setNextTrack = () => {
    setDirection("next");
    const nextTrackIndex = trackIndex + 1;
    // console.log("next", {trackIndex, nextTrackIndex, nextItem: list[nextTrackIndex], hasNext});

    if (list[nextTrackIndex]) {
      setTrack(list[nextTrackIndex]);
      setTrackIndex(nextTrackIndex);
    } else if (hasNextPage) {
      fetchNextPage();
      setIsWaitingForNewList(true);
    }
  };

  const setPrevTrack = () => {
    setDirection("previous");
    const prevTrackIndex = trackIndex - 1;
    // console.log("previous", {trackIndex, prevTrackIndex, nextItem: list[prevTrackIndex], hasPrevious});
    if (prevTrackIndex < 0 && hasPreviousPage) {
      fetchPreviousPage();
      setIsWaitingForNewList(true);
    } else {
      setTrack(list[prevTrackIndex]);
      setTrackIndex(prevTrackIndex);
    }
  };

  const fetchNextPage = useCallback(() => {
    if (isLoadingTracks || !hasNextPage) return;
    const newPageIndex = playerPagination.pageIndex + 1;
    setPlayerPagination({
      ...playerPagination,
      pageIndex: newPageIndex,
    });
  }, [playerPagination, hasNextPage, isLoadingTracks]);

  const fetchPreviousPage = useCallback(() => {
    if (isLoadingTracks || !hasPreviousPage) return;
    const newPageIndex = playerPagination.pageIndex - 1;
    setPlayerPagination({
      ...playerPagination,
      pageIndex: newPageIndex,
    });
  }, [playerPagination, hasPreviousPage, isLoadingTracks]);

  // update list
  useEffect(() => {
    if (!tracksData?.data?.length) return;
    const listData = tracksData.data.filter(({ audioFile }) => !!audioFile);
    if (listData.length) {
      setList(listData);
    }
  }, [tracksData]);

  useEffect(() => {
    if (!tracksData?.data?.length) return;
    const listData = tracksData.data.filter(({ audioFile }) => !!audioFile);
    if (listData.length) return;
    if (direction === "next") {
      if (hasNextPage) {
        fetchNextPage();
        return;
      }
    } else if (direction === "previous") {
      if (hasPreviousPage) {
        fetchPreviousPage();
        return;
      }
    }
  }, [tracksData, hasNextPage, hasPreviousPage, direction, fetchNextPage, fetchPreviousPage]);

  useEffect(() => {
    setIsListUpdated(true);
  }, [list]);

  useEffect(() => {
    if (track) {
      setIsInitialized(true);
    }
  }, [track]);

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

  // sync hasPreviousPage
  useEffect(() => setHasPrevious(playerPagination.pageIndex > 0), [playerPagination]);

  // sync hasNextPage
  useEffect(
    () => setHasNext(tracksData ? tracksData.meta.page < tracksData.meta.totalPages : false),
    [tracksData],
  );

  return { setNextTrack, setPrevTrack };
};
