import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link } from "expo-router";
import React from "react";
import {
  Pressable,
  ScrollView, 
  Text, 
  View,
  StyleSheet
} from "react-native";

export default function App() {
  return (
      <>
        <View style={styles.headerNotificationBar}>
          <Text>Войдите или зарегистрируйтесь, чтобы управлять своей подпиской!</Text>
        </View>
        <NotesList />
      </>
  );
}


function NotesList() {

  return (
      <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={[styles.scrollView]}
      >
        <Item1/>
        <Item2/>

      </ScrollView>
  );
}

function Item1() {
  return <Link
  style={{
    minWidth: 300,
    padding: 4,
    flex: 1,
    flexBasis: 300,
  }}

  href={{
    pathname: "/(app)/note/[note]",
    params: {
      note: 1,
    },
  }}
  asChild
>
<Pressable>
  {({ hovered, pressed }) => (
      <View
          style={{
            backgroundColor: "white",
            borderRadius: 12,
            overflow: "hidden",
            flex: 1,
          }}
      >
        <View
            style={[
              {
                flex: 1,
                paddingHorizontal: 20,
                paddingVertical: 12,
                transitionDuration: "200ms",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              },
              hovered && { backgroundColor: "rgba(0,0,0,0.1)" },
              pressed && { backgroundColor: "rgba(0,0,0,0.2)" },
            ]}
        >
          <View>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              item text 1 
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <FontAwesome
                name="chevron-right"
                size={16}
                color="#919497"
            />
          </View>
        </View>
      </View>
  )}
</Pressable>
</Link>
}


function Item2() {
  return <Link
  style={{
    minWidth: 300,
    padding: 4,
    flex: 1,
    flexBasis: 300,
  }}

  href={{
    pathname: "/(app)/note/[note]",
    params: {
      note: 2,
    },
  }}
  asChild
>
<Pressable>
  {({ hovered, pressed }) => (
      <View
          style={{
            backgroundColor: "white",
            borderRadius: 12,
            overflow: "hidden",
            flex: 1,
          }}
      >
        <View
            style={[
              {
                flex: 1,
                paddingHorizontal: 20,
                paddingVertical: 12,
                transitionDuration: "200ms",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              },
              hovered && { backgroundColor: "rgba(0,0,0,0.1)" },
              pressed && { backgroundColor: "rgba(0,0,0,0.2)" },
            ]}
        >
          <View>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              item text 2 
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <FontAwesome
                name="chevron-right"
                size={16}
                color="#919497"
            />
          </View>
        </View>
      </View>
  )}
</Pressable>
</Link>
}


const styles = StyleSheet.create({
  scrollView: {
    maxWidth: 960,
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: "auto",
  },
  headerNotificationBar: {
    backgroundColor:'#f9f2d7',
    fontSize: 14,
    padding: 4,
    paddingHorizontal: 8,
    paddingBottom: 6
  }
});