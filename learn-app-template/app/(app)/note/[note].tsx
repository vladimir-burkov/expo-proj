import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Note() {

  return (
      <>
        <Stack.Screen options={{ title: "Note" }} />
        <View style={styles.container}>
          <View style={styles.main}>
            <Item/>
          </View>
        </View>
      </>
  );
}

function Item() {
  return (
      <View style={{ paddingVertical: 12 }}>
        <Text style={styles.title}>title</Text>
        <Text style={{ fontSize: 16 }}>children</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 36,
    marginBottom: 8,
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
});