import { Lesson } from "@/context/LessonsContext";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ListItem ({id, title, icon}: Lesson) { 

  
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
        <FontAwesome name={icon || 'info'} size={18} color="#686868" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <FontAwesome style={styles.arrowRight} name="angle-right" size={24} color="#333" />
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
    width: 35,
    height: 35,
    borderRadius: 10,
    backgroundColor: '#eeeeee',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: '600',
    fontSize: 14,
    color: '#333',
  },
  arrowRight: {
    paddingLeft: 12
  }
});