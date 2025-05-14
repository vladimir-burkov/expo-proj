import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
const logo = require('@/assets/images/book1.svg');

const AppHeader = () => {
  return (
    <View style={styles.headerTitleContainer}>
      <View style={styles.textContainer}>
        <Image
          source={logo}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>Gramm<Text style={styles.up}>UP</Text></Text>
      </View>
      <View>
        <Text style={styles.subtitle}>Ελληνικά-A1</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerTitleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  image: {
    width: 30,
    height: 30,
    position: 'relative',
    top: 4,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'serif',
    color: 'white',
  },
  up: {
    color: 'chartreuse'
  },
  subtitle: {
    fontSize: 12,
    color: 'magenta',
    position: 'relative',
    bottom: 6,
    fontWeight: 500,    
    left: 16
  },

});

export default AppHeader;
