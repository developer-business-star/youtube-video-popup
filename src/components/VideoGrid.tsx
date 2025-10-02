import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator, Text } from 'react-native';
import VideoCard from './VideoCard';
import { YouTubeVideo } from '../services/YouTubeService';

interface VideoGridProps {
  videos: YouTubeVideo[];
  loadingMore?: boolean;
  hasMore?: boolean;
  onVideoPress?: (video: YouTubeVideo) => void;
  onWatchLater?: (video: YouTubeVideo) => void;
  onAddToQueue?: (video: YouTubeVideo) => void;
  onMoreOptions?: (video: YouTubeVideo) => void;
  onLoadMore?: () => void;
}

const VideoGrid: React.FC<VideoGridProps> = ({ 
  videos, 
  loadingMore = false,
  hasMore = false,
  onVideoPress, 
  onWatchLater, 
  onAddToQueue, 
  onMoreOptions,
  onLoadMore
}) => {
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 20;
    
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
      if (hasMore && !loadingMore && onLoadMore) {
        onLoadMore();
      }
    }
  };

  // Web-compatible scroll detection with throttling
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleScrollEvent = () => {
      // Clear previous timeout
      clearTimeout(timeoutId);
      
      // Throttle scroll events
      timeoutId = setTimeout(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Trigger when user is within 100px of the bottom
        if (scrollTop + windowHeight >= documentHeight - 100) {
          console.log('Auto-loading more videos...');
          if (hasMore && !loadingMore && onLoadMore) {
            onLoadMore();
          }
        }
      }, 100); // Throttle to 100ms
    };

    // Add scroll listener to window
    window.addEventListener('scroll', handleScrollEvent);
    
    return () => {
      window.removeEventListener('scroll', handleScrollEvent);
      clearTimeout(timeoutId);
    };
  }, [hasMore, loadingMore, onLoadMore]);

  return (
         <ScrollView 
           ref={scrollViewRef}
           style={styles.container} 
           showsVerticalScrollIndicator={false}
           showsHorizontalScrollIndicator={false}
           onScroll={handleScroll}
           scrollEventThrottle={400}
           // @ts-ignore
           data-scroll-container="true"
         >
      <View style={styles.grid}>
        {videos.map((video, index) => (
          <VideoCard
            key={`${video.id}-${index}`}
            thumbnail={video.thumbnail}
            title={video.title}
            channel={video.channelTitle}
            channelLogo={video.channelLogo}
            views={video.viewCount}
            duration={video.duration}
            uploadTime={video.uploadTime}
            isLive={video.isLive}
            onPress={() => onVideoPress?.(video)}
            onWatchLater={() => onWatchLater?.(video)}
            onAddToQueue={() => onAddToQueue?.(video)}
            onMoreOptions={() => onMoreOptions?.(video)}
          />
        ))}
      </View>
      
      {/* Loading indicator for more videos */}
      {loadingMore && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2196F3" />
          <Text style={styles.loadingText}>Loading more videos...</Text>
        </View>
      )}
      
      {/* End of results indicator */}
      {!hasMore && videos.length > 0 && (
        <View style={styles.endContainer}>
          <Text style={styles.endText}>No more videos to load</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    // @ts-ignore - Web-specific styles
    scrollbarWidth: 'none', // Firefox
    msOverflowStyle: 'none', // IE/Edge
    '&::-webkit-scrollbar': {
      display: 'none', // Chrome/Safari
    },
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 15,
  },
  loadingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  loadingText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#606060',
  },
  endContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  endText: {
    fontSize: 14,
    color: '#9AA0A6',
    fontStyle: 'italic',
  },
});

export default VideoGrid;
