import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';

interface VideoHoverPopupProps {
  thumbnail: string;
  title: string;
  channel: string;
  channelLogo?: string;
  views: string;
  uploadTime?: string;
  isLive?: boolean;
  isVisible: boolean;
  position: { x: number; y: number };
  onWatchLater?: () => void;
  onAddToQueue?: () => void;
  onMoreOptions?: () => void;
}

const VideoHoverPopup: React.FC<VideoHoverPopupProps> = ({
  thumbnail,
  title,
  channel,
  channelLogo,
  views,
  uploadTime,
  isLive = false,
  isVisible,
  position,
  onWatchLater,
  onAddToQueue,
  onMoreOptions,
}) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.8));

  React.useEffect(() => {
    if (isVisible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <Animated.View
      style={[
        styles.popup,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      {/* Video Thumbnail */}
      <View style={styles.popupThumbnail}>
        <Image 
          source={{ uri: thumbnail }} 
          style={styles.popupThumbnailImage as any}
          resizeMode="cover"
        />
        {isLive && (
          <View style={styles.popupLiveBadge}>
            <View style={styles.popupLiveDot} />
            <Text style={styles.popupLiveText}>LIVE</Text>
          </View>
        )}
      </View>

      {/* Popup Content */}
      <View style={styles.popupContent}>
        {/* Title Row */}
        <View style={styles.titleRow}>
          <Text style={styles.popupTitle} numberOfLines={1}>
            {title}
          </Text>
          <TouchableOpacity style={styles.moreOptionsButton} onPress={onMoreOptions}>
            <View style={styles.moreOptionsDots}>
              <View style={styles.dot} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Channel Info */}
        <View style={styles.channelRow}>
          {channelLogo ? (
            <Image source={{ uri: channelLogo }} style={[styles.popupChannelLogo as any]} />
          ) : (
            <View style={styles.popupDefaultChannelLogo}>
              <Text style={styles.popupDefaultChannelText}>
                {channel.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
          <Text style={styles.popupChannelName}>{channel}</Text>
          <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedText}>✓</Text>
          </View>
        </View>

        {/* Views */}
        <Text style={styles.popupViews}>{views}</Text>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={onWatchLater}>
            <View style={styles.actionButtonIcon}>
              <Text style={styles.clockIcon}>🕐</Text>
            </View>
            <Text style={styles.actionButtonText}>Watch later</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={onAddToQueue}>
            <View style={styles.actionButtonIcon}>
              <Text style={styles.queueIcon}>📋</Text>
            </View>
            <Text style={styles.actionButtonText}>Add to queue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  popup: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 6,
    padding: 16,
    width: '100%',
    height: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 12,
    pointerEvents: 'auto',
    justifyContent: 'space-between',
  },
  popupThumbnail: {
    position: 'relative',
    marginBottom: 16,
    flex: 1,
  },
  popupThumbnailImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
    resizeMode: 'cover',
  },
  popupLiveBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: '#FF0000',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  popupLiveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
    marginRight: 4,
  },
  popupLiveText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  popupContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  popupTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#0F0F0F',
    lineHeight: 24,
    marginRight: 8,
  },
  moreOptionsButton: {
    padding: 4,
  },
  moreOptionsDots: {
    alignItems: 'center',
  },
  dot: {
    width: 4,
    height: 4,
    backgroundColor: '#606060',
    borderRadius: 2,
    marginBottom: 2,
  },
  channelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  popupChannelLogo: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F0F0F0',
    marginRight: 8,
  },
  popupDefaultChannelLogo: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  popupDefaultChannelText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#666666',
  },
  popupChannelName: {
    fontSize: 14,
    color: '#606060',
    marginRight: 4,
  },
  verifiedBadge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#606060',
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: 'bold',
  },
  popupViews: {
    fontSize: 12,
    color: '#606060',
    marginBottom: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 4,
  },
  actionButtonIcon: {
    marginRight: 6,
  },
  clockIcon: {
    fontSize: 15,
  },
  queueIcon: {
    fontSize: 15,
  },
  actionButtonText: {
    fontSize: 11,
    color: '#0F0F0F',
    fontWeight: '400',
  },
});

export default VideoHoverPopup;
