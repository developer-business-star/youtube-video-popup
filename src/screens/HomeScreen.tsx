import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';

const HomeScreen: React.FC = () => {
  const handleButtonPress = (): void => {
    console.log('Button pressed!');
  };

  return (
    <View style={styles.container}>
      <Header title="Welcome to React Native" />
      <View style={styles.content}>
        <Card title="Getting Started">
          <Text style={styles.text}>
            This is a sample React Native app with a proper project structure.
          </Text>
          <Button title="Press Me" onPress={handleButtonPress} />
        </Card>
        
        <Card title="Features">
          <Text style={styles.text}>
            • Organized folder structure{'\n'}
            • Reusable components{'\n'}
            • Proper configuration files{'\n'}
            • Ready for development
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
    marginBottom: 16,
  },
});

export default HomeScreen;
