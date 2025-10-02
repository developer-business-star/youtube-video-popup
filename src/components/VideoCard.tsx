import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import VideoHoverPopup from './VideoHoverPopup';

interface VideoCardProps {
  thumbnail: string;
  title: string;
  channel: string;
  channelLogo?: string;
  views: string;
  duration: string;
  uploadTime?: string;
  isLive?: boolean;
  onPress?: () => void;
  onWatchLater?: () => void;
  onAddToQueue?: () => void;
  onMoreOptions?: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({
  thumbnail,
  title,
  channel,
  channelLogo,
  views,
  duration,
  uploadTime,
  isLive = false,
  onPress,
  onWatchLater,
  onAddToQueue,
  onMoreOptions,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPopupHovered, setIsPopupHovered] = useState(false);

  const handleMouseEnter = (event: any) => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handlePopupMouseEnter = () => {
    setIsPopupHovered(true);
  };

  const handlePopupMouseLeave = () => {
    setIsPopupHovered(false);
  };

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity 
        style={[styles.container]} 
        onPress={onPress}
        // @ts-ignore
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Thumbnail Container */}
        <View style={styles.thumbnailContainer}>
          <Image source={{ uri: thumbnail }} style={styles.thumbnail} />
          
          {/* Duration Badge */}
          {isLive ? (
            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>LIVE NOW</Text>
            </View>
          ) : (
            <View style={styles.durationBadge}>
              <Text style={styles.durationText}>{duration}</Text>
            </View>
          )}
        </View>

        {/* Video Info */}
        <View style={styles.videoInfo}>
          {/* Channel Logo */}
          <View style={styles.channelLogoContainer}>
            {channelLogo ? (
              <Image source={{ uri: channelLogo }} style={styles.channelLogo} />
            ) : (
              <View style={styles.defaultChannelLogo}>
                <Text style={styles.defaultChannelText}>
                  {channel.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
          </View>

          {/* Video Details */}
          <View style={styles.videoDetails}>
            {/* Title */}
            <Text style={styles.title} numberOfLines={2}>
              {title}
            </Text>

            {/* Channel Name */}
            <Text style={styles.channelName} numberOfLines={1}>
              {channel}
            </Text>

            {/* Views and Upload Time */}
            <Text style={styles.metaInfo}>
              {views} {uploadTime && `• ${uploadTime}`}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Hover Popup - Positioned above the card */}
      {(isHovered || isPopupHovered) && (
        <View 
          style={styles.popupContainer}
          // @ts-ignore
          onMouseEnter={handlePopupMouseEnter}
          onMouseLeave={handlePopupMouseLeave}
        >
          <VideoHoverPopup
            thumbnail={thumbnail}
            title={title}
            channel={channel}
            channelLogo={channelLogo}
            views={views}
            uploadTime={uploadTime}
            isLive={isLive}
            isVisible={isHovered || isPopupHovered}
            position={{ x: 0, y: 0 }}
            onWatchLater={onWatchLater}
            onAddToQueue={onAddToQueue}
            onMoreOptions={onMoreOptions}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    position: 'relative',
    width: '24%',
  },
  popupContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1000,
    pointerEvents: 'auto',
  },
  container: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    width: '100%'
  },
  thumbnailContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  thumbnail: {
    width: '100%',
    height: 210,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  durationText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  liveBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: '#FF0000',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
    marginRight: 4,
  },
  liveText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  videoInfo: {
    flexDirection: 'row',
    paddingHorizontal: 4,
  },
  channelLogoContainer: {
    marginRight: 8,
  },
  channelLogo: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0F0F0',
  },
  defaultChannelLogo: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultChannelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666666',
  },
  videoDetails: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0F0F0F',
    lineHeight: 20,
    marginBottom: 4,
  },
  channelName: {
    fontSize: 12,
    color: '#606060',
    marginBottom: 2,
  },
  metaInfo: {
    fontSize: 12,
    color: '#606060',
  },
});

export default VideoCard;
