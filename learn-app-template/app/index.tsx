import ListItem from "@/components/core/ListItem";
import { FlatList, StyleSheet, View } from "react-native";

export default function Index() {
  const days = [1,2,3, 4, 5];

  return (
    <View style={styles.container}>
      <FlatList 
        data={days}
        contentContainerStyle={styles.content} 
        renderItem={({item}) => <ListItem item={item} />}      
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffaf7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    gap: 10
  }
});