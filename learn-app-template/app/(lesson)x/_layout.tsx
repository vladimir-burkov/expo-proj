import { Stack, Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import AppHeader from '@/components/AppHeader';

export default function LessonLayout() {

  return (
    <Stack
    screenOptions={{
      headerStyle: {
        backgroundColor: '#684bbc',
      },
      headerTintColor: '#fff',
      headerTitleAlign: "center",
      headerTitleStyle: {
        // fontWeight: 'bold',
        fontSize: 14,
        paddingLeft: 15
      },
      headerShadowVisible: false,
    }}
  > 
    <Stack.Screen name="(lesson)" options={{ headerTitle: () => <AppHeader/> }}/>
  </Stack>
  //   <Stack
  //   screenOptions={{
  //     headerStyle: {
  //       backgroundColor: '#684bbc',
  //     },
  //     headerTintColor: '#fff',
  //     headerTitleAlign: "center",
  //     headerTitleStyle: {
  //       fontSize: 14,
  //       paddingLeft: 15
  //     },
  //   }}
  // > 
  // </Stack>

    //     <Tabs 
    //   screenOptions={{
    //     // tabBarPosition: 'top',
    //     headerShown: false
    //   }}
    // >
    //   <Tabs.Screen
    //     name="index"
    //     options={{
    //       title: 'Lesson',
    //       tabBarIcon: () => (
    //         <MaterialIcons name="menu-book" size={24} color={"black"} />
    //       ),
    //     }}
    //   />
    //   <Tabs.Screen
    //     name="practices"
    //     options={{
    //       title: 'Practices',
    //       tabBarIcon: () => (
    //         <MaterialIcons name="menu-book" size={24} color={"black"} />
    //       ),
    //     }}
    //   />
    // </Tabs>
  );
}

