import GrammanaHeader from "@/components/GrammanaHeader";
import IconButton from "@/components/IconButton";
import { Stack } from "expo-router";
import { Image, Text, View, StyleSheet } from 'react-native';



export default function RootLayout() {

  function LogoTitle() {
    return (
      <>
        <Image style={styles.image} source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} />
        <Text>Home Screen</Text>
      </>
    );
  }

  
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#684bbc',
        },
        headerTintColor: '#fff',
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerShadowVisible: false
      }}
    > 
      <Stack.Screen name="lessons" options={{ title: 'Lessons' }}/>      
      <Stack.Screen name="index" options={{ headerTitle: (props) => <GrammanaHeader/> }}/>

      {/* <Stack.Screen name="index" options={{ headerTitle: (props) => <HumburgerButtonTitle {...props}/> }}/> */}
    </Stack>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 50,
    height: 50,
  },
});