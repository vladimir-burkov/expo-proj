import ListItem from "@/components/core/ListItem";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";

export default function Index() {
  const days = [1,2,3,4,5,6,7,8];

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={days}
        contentContainerStyle={styles.content} 
        renderItem={({ item }) => (
          <ListItem item={item}/>
        )}     
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    // backgroundColor: '#fffaf7',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  content: {
    flexGrow: 1,
    gap: 15,
    padding: 15
  },
  item: {
    flexGrow: 1,
  }
});