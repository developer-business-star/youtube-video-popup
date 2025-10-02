import React, { useState } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ModernHeader from '../src/components/ModernHeader';
import CategoryFilter from '../src/components/CategoryFilter';
import VideoGrid from '../src/components/VideoGrid';
import Loading from '../src/components/Loading';
import Error from '../src/components/Error';
import { useYouTubeData } from '../src/hooks/useYouTubeData';

const WebApp: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const { videos, loading, loadingMore, error, hasMore, searchVideos, getPopularVideos, loadMoreVideos } = useYouTubeData();

  const categories = [
    'All',
    'Deep House',
    'Playlists',
    'Chill-out music',
    'Live',
    'Acoustic guitar',
    'Music',
    'Brazilian Music',
    'Arrocha',
    'History',
    'Comedy',
  ];

  const handleSearch = (query: string): void => {
    if (query.trim()) {
      searchVideos(query);
    } else {
      getPopularVideos();
    }
  };

  const handleSignIn = (): void => {
    console.log('Sign in pressed');
    alert('Sign In clicked!');
  };

  const handleVoiceSearch = (): void => {
    console.log('Voice search pressed');
    alert('Voice search activated!');
  };

  const handleAppLauncher = (): void => {
    console.log('App launcher pressed');
    alert('App launcher opened!');
  };

  const handleGridMoreOptions = (): void => {
    console.log('More options pressed');
    alert('More options menu opened!');
  };

  const handleWatchLater = (video: any): void => {
    console.log('Watch later:', video.title);
    alert(`Added "${video.title}" to Watch Later`);
  };

  const handleAddToQueue = (video: any): void => {
    console.log('Add to queue:', video.title);
    alert(`Added "${video.title}" to Queue`);
  };

  const handleMoreOptions = (video: any): void => {
    console.log('More options:', video.title);
    alert(`More options for "${video.title}"`);
  };

  const handleCategorySelect = (category: string): void => {
    setSelectedCategory(category);
    if (category === 'All') {
      getPopularVideos();
    } else {
      // For now, just show popular videos for all categories
      getPopularVideos();
    }
  };

  return (
    <View style={styles.container}>
      <ModernHeader
        onSearch={handleSearch}
        onSignIn={handleSignIn}
        onVoiceSearch={handleVoiceSearch}
        onAppLauncher={handleAppLauncher}
        onMoreOptions={handleGridMoreOptions}
      />
      
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />

      {loading ? (
        <Loading message="Loading videos..." />
      ) : error ? (
        <Error message={error} onRetry={() => getPopularVideos()} />
      ) : (
        <VideoGrid
          videos={videos}
          loadingMore={loadingMore}
          hasMore={hasMore}
          onWatchLater={handleWatchLater}
          onAddToQueue={handleAddToQueue}
          onMoreOptions={handleMoreOptions}
          onLoadMore={loadMoreVideos}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default WebApp;