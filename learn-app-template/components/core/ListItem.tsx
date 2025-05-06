import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ListItemProps = {
  id: string;
  title: string;
};

export default function ListItem ({id}: ListItemProps) { 

  
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={() => {
      router.push({
        pathname: '/(lesson)/[id]',
        params: {
          id,
        },
      });
    }}>
      <View style={styles.iconBox}>
        <Ionicons name="book" size={24} color="#fff" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Title</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#333" />
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',

  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#999',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    color: '#fff',
    fontSize: 14,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    color: '#333',
  }
});