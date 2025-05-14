import GrammanaHeader from "@/components/GrammanaHeader";
import UserModal from '@/components/UserModal';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Stack } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

// export const unstable_settings = {
//   initialRouteName: "index",
// };

type Props = {
  onPress: () => void;
};

export default function AppLayout() {
  return (
        <Stack>
          <Stack.Screen
              name="index"
              options={{
                headerStyle: {
                  backgroundColor: '#684bbc',
                },
                headerTintColor: '#fff',
                headerTitleAlign: "center",
                headerTitleStyle: {
                  fontSize: 14,
                  paddingLeft: 15
                },
                headerTitle: GrammanaHeader,
                headerLeft: HeaderButton
              }}
          />
        </Stack>
  );
}

function HeaderButton() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const onModalOpen = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };
  return (
    <View style={styles.headerButton}>
      <MenuButton onPress={onModalOpen}/>
      <UserModal isVisible={isModalVisible} onClose={onModalClose}>
        A list of emoji component will go here
      </UserModal>  
    </View>
  );
}

function MenuButton({ onPress }: Props) {
  return (
    <View>
      <Pressable onPress={onPress}>
        <MaterialCommunityIcons name="menu-open" size={30} color="white"/> 
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    paddingLeft: 16,
    alignItems: 'center',
    color: 'white'
  }
});

      // <Link
      //     href="/sign-out"
      //     onPress={(ev) => {
      //       ev.preventDefault();
      //     }}
      //     asChild
      // >
      //   <Pressable
      //       style={{
      //         flexDirection: "row",
      //         display: "flex",
      //         alignItems: "center",
      //         paddingRight: 8,
      //       }}
      //   >
      //     <Text
      //         style={{
      //           fontWeight: "normal",
      //           paddingHorizontal: 8,
      //           fontSize: 16,
      //         }}
      //     >
      //       Sign Out 
      //     </Text>
      //     <FontAwesome name="sign-out" size={24} color="black" />
      //   </Pressable>
      // </Link>