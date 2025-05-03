import { Link } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";

export default function ListItem ({item}: {item: number}) { 
  
  return (
    <Link style={styles.link} href={`/lesson2`} asChild>
      <Pressable style={styles.box}>
        <Text style={styles.text}>{item}</Text>
      </Pressable>
    </Link>
  )
}


const styles = StyleSheet.create({
  box: {
    backgroundColor: 'black',
    width: 200,
    height: 200,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'yellow',
    fontSize: 50
  },
  link: {
    color: 'green',
  }
});