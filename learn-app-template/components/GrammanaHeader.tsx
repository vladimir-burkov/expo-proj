import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
const logo = require('@/assets/images/book1.svg');

const GrammanaHeader = () => {
  return (
    <View style={styles.container}>
      <Image
        source={logo}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.textContainer}>
        {/* <Text style={styles.title}>Grammie | Ελληνικά</Text> */}
        <Text style={styles.title}>
          Grammie <Text  style={styles.split}>|</Text> <Text style={styles.subtitle}>Ελληνικά</Text>
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
    // position: 'relative',
    // bottom: 4,
  },
  textContainer: {
    justifyContent: 'center',
    // position: 'relative',
    // bottom: -4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'serif',
    color: 'white',
  },
  subtitle: {
    fontSize: 12,
    color: 'chartreuse',
  },
  split: {
    color: "magenta"
  },  

});

export default GrammanaHeader;
