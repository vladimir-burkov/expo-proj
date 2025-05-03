import { StyleSheet, Text, View } from "react-native";

export default function User() {

  return (
    <View style={styles.container}>
      <Text>User</Text>
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