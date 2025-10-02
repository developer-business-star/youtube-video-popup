import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import VideoCard from './VideoCard';

interface VideoData {
  id: string;
  thumbnail: string;
  title: string;
  channel: string;
  channelLogo?: string;
  views: string;
  duration: string;
  uploadTime?: string;
  isLive?: boolean;
}

interface VideoGridProps {
  videos: VideoData[];
  onVideoPress?: (video: VideoData) => void;
  onWatchLater?: (video: VideoData) => void;
  onAddToQueue?: (video: VideoData) => void;
  onMoreOptions?: (video: VideoData) => void;
}

const VideoGrid: React.FC<VideoGridProps> = ({ 
  videos, 
  onVideoPress, 
  onWatchLater, 
  onAddToQueue, 
  onMoreOptions 
}) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.grid}>
        {videos.map((video, index) => (
          <VideoCard
            key={video.id}
            thumbnail={video.thumbnail}
            title={video.title}
            channel={video.channel}
            channelLogo={video.channelLogo}
            views={video.views}
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
});

export default VideoGrid;
