import LinkButton from "@/components/core/LinkButton";
import { useLessons } from "@/context/LessonsContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import {
  ScrollView, 
  Text, 
  View,
  StyleSheet
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
          <Text>Войдите или зарегистрируйтесь, чтобы управлять своей подпиской!</Text>
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
        {lessons.map((item) => 
          <LessonItem 
            key={item.id}
            id={item.id} 
            title={item.title} 
            iconName={item.icon as keyof typeof FontAwesome.glyphMap}
          />
        )}
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
      size={"large"}
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
    flexBasis: 300,
    minHeight: 60,
    maxWidth: 300
  }
});