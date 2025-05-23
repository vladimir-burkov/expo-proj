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
  lessonid: string,
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
  const {lessons} = useLessons(); /// 

  return (
      <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={[styles.scrollView]}
      >
        <FlatList
          data={lessons}
          renderItem={({ item }) => (
            <LessonItem 
              lessonid={item.lessonid} 
              title={item.title} 
              iconName={item.icon as keyof typeof FontAwesome.glyphMap}
            />)
          }
          keyExtractor={(item) => item.lessonid}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </ScrollView>
  );
}

function LessonItem(props: LessonItemProps) {
  const {lessonid, title, iconName="expeditedssl"} = props;

  const buttonStyle = StyleSheet.create({
    plainButton: {
      flex: 1,
      transitionDuration: "200ms",
      flexDirection: "row",
      alignItems: 'center',
      paddingLeft: 20,
      paddingRight: 16
    },
    plainButtonHovered: {
      backgroundColor: "rgba(0,0,0,0.1)"
    },
    plainButtonPressed: {
      backgroundColor: "rgba(0,0,0,0.1)"
    },
  });

  const chevronStyle = {
    size: 16,
    color: "#919497"
  };

  return <>
    <LinkButton
      href={{
        pathname: "/(app)/lesson/[lesson]",
        params: {
          lesson: lessonid,
        },
      }}
      buttonStyle={buttonStyle}
      chevronStyle={chevronStyle}
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
    minHeight: 65,
  },
  separator: {
    borderTopColor: '#eee',
    borderTopWidth: 1
  }
});