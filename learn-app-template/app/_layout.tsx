import GrammanaHeader from "@/components/GrammanaHeader";
import { Stack } from "expo-router";
import { StyleSheet } from 'react-native';


export default function RootLayout() {


  
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
      <Stack.Screen name="index" options={{ headerTitle: (props) => <GrammanaHeader/> }}/>
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