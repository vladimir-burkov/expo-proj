import AppHeader from "@/components/AppHeader";
import AppModal from '@/components/AppModal';
import LinkButton from "@/components/core/LinkButton";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Stack } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";

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
                headerTitle: AppHeader,
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
      <AppModal isVisible={isModalVisible} onClose={onModalClose}>
        <MenuLinks/>
      </AppModal>
    </View>
  );
}

function MenuLinks() {

  return <>
      <LinkButton 
        href={{
          pathname: "/auth"
        }} 
        center={true}
      >
        <View style={styles.buttonContent}>
        <MaterialCommunityIcons name="login-variant" size={20} color="black" />
          <Text>Войти/Регистрация</Text>
        </View>
      </LinkButton>
      <LinkButton 
        href={{
          pathname: "/(app)/note/[note]",
          params: {
            note: 1,
          },
        }} 
        type="primary" 
        center={true}
      >
        <View style={styles.buttonContent}>
          <MaterialIcons name="attach-money" size={20} color="white" />
          <Text>Купить подписку</Text>
        </View>
      </LinkButton>
      <LinkButton 
        href={{
          pathname: "/(app)/note/[note]",
          params: {
            note: 1,
          },
        }}
        center={true}
      >
          <View style={styles.buttonContent}>
            <MaterialIcons name="wallet-giftcard" size={20} color="black" />
            <Text>Промо код</Text>
          </View>
      </LinkButton>
      <LinkButton 
        href={{
          pathname: "/(app)/note/[note]",
          params: {
            note: 1,
          },
        }}
        center={true}
      >
          <View style={styles.buttonContent}>
          <MaterialIcons name="mail-outline" size={20} color="black" />            
          <Text>Контакты</Text>
          </View>
      </LinkButton>  
  </>
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
  },
  buttonContent: {
    flex: 1,
    gap: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  menuLinksList: {
    gap: 8
  }
});
