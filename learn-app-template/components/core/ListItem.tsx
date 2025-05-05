import { Link } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";

type DayListItem = {
  item: number;
};

export default function ListItem ({item}: {item: number}) { 
  
  return (
      <Link 
        asChild
        style={styles.link}  
        href={{pathname: '/(lesson)/[id]', params: { id: item }}}
      >
        <Pressable style={styles.box}>
          <Text style={styles.text}>{item}</Text>
        </Pressable>
      </Link>
  )
}


const styles = StyleSheet.create({
  box: {
    backgroundColor: 'gray',
    height: 90,
    borderRadius: 15,
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