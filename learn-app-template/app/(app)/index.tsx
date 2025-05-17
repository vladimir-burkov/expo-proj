import LinkButton from "@/components/core/LinkButton";
import { useLessons } from "@/context/LessonsContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import {
  ScrollView, 
  Text, 
  View,
  StyleSheet,
  FlatList
} from "react-native";

type LessonItemProps = {
  id: string,
  title: string,
  iconName?: keyof typeof FontAwesome.glyphMap
};

export default function App() {
  return (
      <>
        <View style={styles.headerNotificationBar}>
          <Text>Войдите или зарегистрируйтесь, чтобы управлять вашей подпиской!</Text>
        </View>
        <LessonsList />
      </>
  );
}


function LessonsList() {
  const {lessons} = useLessons();

  return (
      <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={[styles.scrollView]}
      >
        <FlatList
          data={lessons}
          renderItem={({ item }) => (
            <LessonItem 
              id={item.id} 
              title={item.title} 
              iconName={item.icon as keyof typeof FontAwesome.glyphMap}
            />)
          }
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </ScrollView>
  );
}

function LessonItem(props: LessonItemProps) {
  const {id, title, iconName="expeditedssl"} = props;

  return <>
    <LinkButton
      href={{
        pathname: "/(app)/lesson/[lesson]",
        params: {
          lesson: id,
        },
      }}
      arrowVisible={true}
      size={"medium"}
    >
      <View style={styles.lessonButtonContent}>
        <FontAwesome style={styles.lessonButtonIcon} name={iconName} size={20} color="black" />
        <Text style={styles.lessonButtonText}>{title}</Text>
      </View>
    </LinkButton>
  </>
}


const styles = StyleSheet.create({
  scrollView: {
    maxWidth: 960,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: "auto",
    backgroundColor: "white"
  },
  headerNotificationBar: {
    backgroundColor:'#f9f2d7',
    fontSize: 14,
    paddingHorizontal: 20,
    paddingVertical: 12
  },
  lessonButtonText: {
    textAlign: "left",
    fontWeight: 400,
    fontSize: 16,
  },
  lessonButtonIcon: {
    minWidth: 20
  },
  lessonButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    flex: 1,
    minHeight: 60,
  },
  separator: {
    borderTopColor: '#eee',
    borderTopWidth: 1
  }
});