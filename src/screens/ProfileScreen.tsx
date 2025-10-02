import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Header from '../components/Header';
import Card from '../components/Card';

const ProfileScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Header title="Profile" />
      <View style={styles.content}>
        <Card title="User Information">
          <Text style={styles.text}>Name: John Doe</Text>
          <Text style={styles.text}>Email: john.doe@example.com</Text>
          <Text style={styles.text}>Location: New York, NY</Text>
        </Card>
        
        <Card title="Settings">
          <Text style={styles.text}>
            • Notifications enabled{'\n'}
            • Dark mode: Off{'\n'}
            • Language: English
          </Text>
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    marginBottom: 8,
  },
});

export default ProfileScreen;
