import { Stack } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function Auth() {

  return (
    <>
      <Stack.Screen options={{ title: "Auth" }} />
      <View>
        <Text>Auth aaa</Text>
      </View>
    </>
  );
}
