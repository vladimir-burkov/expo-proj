import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const GrammanaHeader = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://www.svgrepo.com/show/509616/book1.svg' }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>Grammana</Text>
        <Text style={styles.subtitle}>
          <Text style={styles.subtitleBorder}></Text>
          <Text style={styles.subtitleText}>Ελληνικά</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'transparent', // change if you need background
  },
  image: {
    width: 30,
    height: 30,
    position: 'relative',
    bottom: 4,
  },
  textContainer: {
    justifyContent: 'center',
    position: 'relative',
    bottom: -4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'serif',
    color: 'white',
  },
  subtitle: {
    textAlign: 'right',
    fontSize: 12,
    color: '#90c9ff',
  },
  subtitleBorder: {
    borderLeftWidth: 2,
    borderLeftColor: 'wheat',
    lineHeight: 8,
    fontSize: 8,
    position: "relative",
    bottom: 1
  },  
  subtitleText: {
    paddingLeft: 6,
  },
});

export default GrammanaHeader;
