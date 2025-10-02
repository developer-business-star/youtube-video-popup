// import { YOUTUBE_API_KEY } from '../config/environment';

export interface YouTubeVideo {
  id: string;
  thumbnail: string;
  title: string;
  channelTitle: string;
  channelLogo?: string;
  viewCount: string;
  duration: string;
  uploadTime: string;
  isLive: boolean;
}

const BASE_URL = 'https://www.googleapis.com/youtube/v3';

const formatDuration = (isoDuration: string): string => {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '';

  const hours = parseInt(match[1] || '0', 10);
  const minutes = parseInt(match[2] || '0', 10);
  const seconds = parseInt(match[3] || '0', 10);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  } else {
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
};

const formatViewCount = (views: string): string => {
  const numViews = parseInt(views, 10);
  if (numViews >= 1_000_000_000) return `${(numViews / 1_000_000_000).toFixed(1)}B views`;
  if (numViews >= 1_000_000) return `${(numViews / 1_000_000).toFixed(1)}M views`;
  if (numViews >= 1_000) return `${(numViews / 1_000).toFixed(1)}K views`;
  return `${numViews} views`;
};

const formatUploadTime = (publishedAt: string): string => {
  const date = new Date(publishedAt);
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`;
  if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return 'just now';
};

const fetchYouTubeData = async (endpoint: string, params: Record<string, string>): Promise<any> => {

  const query = new URLSearchParams({
    key: 'AIzaSyA7pulF5dQ1imPJDWnxhuXhHZyMmJrCAJQ',
    ...params,
  }).toString();

  const url = `${BASE_URL}${endpoint}?${query}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error.message || 'Failed to fetch YouTube data');
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error('YouTube API error:', error);
    throw new Error(`YouTube API Error: ${error.message}`);
  }
};

const processVideoItems = async (items: any[]): Promise<YouTubeVideo[]> => {
  const videoIds = items.map(item => item.id.videoId || item.id).join(',');
  const channelIds = items.map(item => item.snippet.channelId).join(',');

  const [videoDetailsResponse, channelDetailsResponse] = await Promise.all([
    fetchYouTubeData('/videos', {
      part: 'contentDetails,statistics,liveStreamingDetails',
      id: videoIds,
    }),
    fetchYouTubeData('/channels', {
      part: 'snippet',
      id: channelIds,
    }),
  ]);

  const channelLogos: { [key: string]: string } = {};
  channelDetailsResponse.items.forEach((channel: any) => {
    channelLogos[channel.id] = channel.snippet.thumbnails.default.url;
  });

  return items.map((item: any) => {
    const videoDetail = videoDetailsResponse.items.find((v: any) => v.id === (item.id.videoId || item.id));
    const isLive = item.snippet.liveBroadcastContent === 'live' || (videoDetail?.liveStreamingDetails && videoDetail.liveStreamingDetails.actualStartTime);

    return {
      id: item.id.videoId || item.id,
      thumbnail: item.snippet.thumbnails.high.url,
      title: item.snippet.title,
      channelTitle: item.snippet.channelTitle,
      channelLogo: channelLogos[item.snippet.channelId],
      viewCount: videoDetail ? formatViewCount(videoDetail.statistics.viewCount) : 'N/A',
      duration: videoDetail ? formatDuration(videoDetail.contentDetails.duration) : 'N/A',
      uploadTime: formatUploadTime(item.snippet.publishedAt),
      isLive: isLive,
    };
  });
};

export interface YouTubeResponse {
  videos: YouTubeVideo[];
  nextPageToken?: string;
}

export const getPopularVideos = async (maxResults: number = 12, pageToken?: string): Promise<YouTubeResponse> => {
  const params: Record<string, string> = {
    part: 'snippet,contentDetails,statistics,liveStreamingDetails',
    chart: 'mostPopular',
    regionCode: 'US',
    maxResults: maxResults.toString(),
  };
  
  if (pageToken) {
    params.pageToken = pageToken;
  }
  
  const data = await fetchYouTubeData('/videos', params);
  const videos = await processVideoItems(data.items);
  
  return {
    videos,
    nextPageToken: data.nextPageToken,
  };
};

export const searchVideos = async (query: string, maxResults: number = 12, pageToken?: string): Promise<YouTubeResponse> => {
  const params: Record<string, string> = {
    part: 'snippet',
    q: query,
    type: 'video',
    maxResults: maxResults.toString(),
  };
  
  if (pageToken) {
    params.pageToken = pageToken;
  }
  
  const data = await fetchYouTubeData('/search', params);
  const videos = await processVideoItems(data.items);
  
  return {
    videos,
    nextPageToken: data.nextPageToken,
  };
};
