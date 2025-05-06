import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import ListItem from '@/components/core/ListItem';

export default function Index() {

  const data = [
    { id: '1', title: 'Area on\nthe map' },
    { id: '2', title: 'Area on\nthe map' },
    { id: '3', title: 'Area on\nthe map' },
    { id: '4', title: 'Area on\nthe map' },
    { id: '5', title: 'Area on\nthe map' },
    { id: '6', title: 'Area on\nthe map' },
    { id: '7', title: 'Area on\nthe map' },
    { id: '8', title: 'Area on\nthe map' },
    { id: '39', title: 'Area on\nthe map' },
    { id: '11', title: 'Area on\nthe map' },
    { id: '12', title: 'Area on\nthe map' },
    { id: '13', title: 'Area on\nthe map' },
    { id: '14', title: 'Area on\nthe map' },
    { id: '15', title: 'Area on\nthe map' },
    { id: '16', title: 'Area on\nthe map' },
  ];

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (<ListItem {...item}/>)}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
}

const styles = StyleSheet.create({
  separator: {
    height: 0.5,
    backgroundColor: '#eee',
  },
});