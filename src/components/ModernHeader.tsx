import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';

interface HeaderProps {
  onSearch?: (query: string) => void;
  onSignIn?: () => void;
  onVoiceSearch?: () => void;
  onAppLauncher?: () => void;
  onMoreOptions?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onSearch,
  onSignIn,
  onVoiceSearch,
  onAppLauncher,
  onMoreOptions,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const handleSignIn = () => {
    if (onSignIn) {
      onSignIn();
    }
  };

  const handleVoiceSearch = () => {
    if (onVoiceSearch) {
      onVoiceSearch();
    }
  };

  const handleAppLauncher = () => {
    if (onAppLauncher) {
      onAppLauncher();
    }
  };

  const handleMoreOptions = () => {
    if (onMoreOptions) {
      onMoreOptions();
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Content Right */}
      <View style={styles.headerContentRight}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
         <TextInput
           style={styles.searchInput}
           placeholder="Search"
           placeholderTextColor="#9AA0A6"
           value={searchQuery}
           onChangeText={setSearchQuery}
           onSubmitEditing={handleSearch}
           returnKeyType="search"
         />
         
         {/* Search Icon */}
         <TouchableOpacity style={styles.searchIcon} onPress={handleSearch}>
           <View style={styles.searchIconContainer}>
             <View style={styles.searchIconCircle} />
             <View style={styles.searchIconHandle} />
           </View>
         </TouchableOpacity>
        </View>

        {/* Microphone Icon */}
        <TouchableOpacity style={styles.microphoneIcon} onPress={handleVoiceSearch}>
        <View style={styles.microphoneContainer}>
          <View style={styles.microphoneBody} />
          <View style={styles.microphoneStand} />
        </View>
        </TouchableOpacity>
      </View>

      {/* Header Content Left */}
      <View style={styles.headerContentLeft}>
        {/* App Launcher Icon (3x3 grid) */}
        <TouchableOpacity style={styles.appLauncherIcon} onPress={handleAppLauncher}>
         <View style={styles.gridContainer}>
           <View style={styles.gridRow}>
             <View style={styles.gridDot} />
             <View style={styles.gridDot} />
             <View style={styles.gridDot} />
           </View>
           <View style={styles.gridRow}>
             <View style={styles.gridDot} />
             <View style={styles.gridDot} />
             <View style={styles.gridDot} />
           </View>
           <View style={styles.gridRow}>
             <View style={styles.gridDot} />
             <View style={styles.gridDot} />
             <View style={styles.gridDot} />
           </View>
         </View>
        </TouchableOpacity>

        {/* More Options Icon (vertical dots) */}
        <TouchableOpacity style={styles.moreOptionsIcon} onPress={handleMoreOptions}>
         <View style={styles.dotsContainer}>
           <View style={styles.dot} />
           <View style={styles.dot} />
           <View style={styles.dot} />
         </View>
        </TouchableOpacity>

        {/* Sign In Button */}
        <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
         <View style={styles.signInContent}>
           <View style={styles.personIconContainer}>
             <View style={styles.personHead} />
             <View style={styles.personBody} />
           </View>
           <Text style={styles.signInText}>SIGN IN</Text>
         </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E8EAED',
    minHeight: 60,
    justifyContent: 'space-between'
  },
  headerContentRight: {
    width: '70%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  headerContentLeft: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#DADCE0',
    marginRight: 12,
    paddingHorizontal: 16,
    height: 40,
    width: '70%'
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#202124',
    paddingVertical: 8,
    borderRightWidth: 1,
    borderRightColor: 'rgb(218, 220, 224)',
    borderWidth: 0,
    outlineWidth: 0,
  },
  searchIcon: {
    marginLeft: 15,
    padding: 4,
  },
  microphoneIcon: {
    marginRight: 12,
    padding: 8,
  },
  appLauncherIcon: {
    marginRight: 12,
    padding: 8,
  },
  moreOptionsIcon: {
    marginRight: 12,
    padding: 8,
  },
  signInButton: {
    backgroundColor: '#1A73E8',
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#1A73E8',
  },
  signInContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signInText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  // Custom search icon
  searchIconContainer: {
    width: 16,
    height: 16,
    position: 'relative',
  },
  searchIconCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#5F6368',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  searchIconHandle: {
    width: 6,
    height: 2,
    backgroundColor: '#5F6368',
    position: 'absolute',
    bottom: 1,
    right: 1,
    transform: [{ rotate: '45deg' }],
  },
  // Custom microphone icon
  microphoneContainer: {
    width: 16,
    height: 16,
    position: 'relative',
  },
  microphoneBody: {
    width: 8,
    height: 10,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'black',
    position: 'absolute',
    top: 2,
    left: 4,
  },
  microphoneStand: {
    width: 2,
    height: 4,
    backgroundColor: 'black',
    position: 'absolute',
    bottom: 0,
    left: 7,
  },
  // Custom person icon
  personIconContainer: {
    width: 16,
    height: 16,
    marginRight: 6,
    position: 'relative',
  },
  personHead: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    top: 0,
    left: 4,
  },
  personBody: {
    width: 12,
    height: 8,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    bottom: 0,
    left: 2,
  },
  // Grid dots for app launcher
  gridContainer: {
    width: 20,
    height: 20,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  gridDot: {
    width: 4,
    height: 4,
    backgroundColor: '#5F6368',
    borderRadius: 2,
  },
  // Vertical dots for more options
  dotsContainer: {
    alignItems: 'center',
  },
  dot: {
    width: 4,
    height: 4,
    backgroundColor: '#5F6368',
    borderRadius: 2,
    marginBottom: 2,
  },
});

export default Header;
