import { useState, useEffect, useCallback } from 'react';
import { getPopularVideos, searchVideos, YouTubeVideo, YouTubeResponse } from '../services/YouTubeService';

interface UseYouTubeData {
  videos: YouTubeVideo[];
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  hasMore: boolean;
  searchVideos: (query: string) => void;
  getPopularVideos: () => void;
  loadMoreVideos: () => void;
  refreshVideos: () => void;
}

export const useYouTubeData = (): UseYouTubeData => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentQuery, setCurrentQuery] = useState<string>('');
  const [nextPageToken, setNextPageToken] = useState<string | undefined>(undefined);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchData = useCallback(async (query: string = '', pageToken?: string, append: boolean = false) => {
    if (append) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }
    setError(null);
    
    try {
      let response: YouTubeResponse;
      if (query) {
        response = await searchVideos(query, 12, pageToken);
      } else {
        response = await getPopularVideos(12, pageToken);
      }
      
      if (append) {
        setVideos(prevVideos => [...prevVideos, ...response.videos]);
      } else {
        setVideos(response.videos);
      }
      
      setNextPageToken(response.nextPageToken);
      setHasMore(!!response.nextPageToken);
    } catch (err: any) {
      console.error('Error fetching videos:', err);
      setError(err.message || 'An unknown error occurred');
    } finally {
      if (append) {
        setLoadingMore(false);
      } else {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchData(currentQuery);
  }, [fetchData, currentQuery]);

  const handleSearch = useCallback((query: string) => {
    setCurrentQuery(query);
    setNextPageToken(undefined);
    setHasMore(true);
  }, []);

  const handleGetPopularVideos = useCallback(() => {
    setCurrentQuery('');
    setNextPageToken(undefined);
    setHasMore(true);
  }, []);

  const loadMoreVideos = useCallback(() => {
    if (!loadingMore && hasMore && nextPageToken) {
      fetchData(currentQuery, nextPageToken, true);
    }
  }, [fetchData, currentQuery, nextPageToken, loadingMore, hasMore]);

  const handleRefreshVideos = useCallback(() => {
    setNextPageToken(undefined);
    setHasMore(true);
    fetchData(currentQuery);
  }, [fetchData, currentQuery]);

  return {
    videos,
    loading,
    loadingMore,
    error,
    hasMore,
    searchVideos: handleSearch,
    getPopularVideos: handleGetPopularVideos,
    loadMoreVideos,
    refreshVideos: handleRefreshVideos,
  };
};
