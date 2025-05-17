import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
const logo = require('@/assets/images/book1.svg');
import AppModal from '@/components/AppModal';
import LinkButton from "@/components/core/LinkButton";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";

type HeaderButtonProps = {
  onPress: () => void;
};

export const AppHeader = () => {
  return (
    <>
      <View style={styles.headerTitleContainer}>
        <View style={styles.textContainer}>
          <Image
            source={logo}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.title}>Gramm<Text style={styles.up}>UP</Text></Text>
        </View>
        <View>
          <Text style={styles.subtitle}>Ελληνικά-A1</Text>
        </View>
      </View>
    </>
  );
};

export function HeaderButton() {
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
        href={{pathname: "/auth"}} 
        center={true}
      >
        <View style={styles.buttonContent}>
        <MaterialCommunityIcons name="login-variant" size={20} color="black" />
          <Text>Войти/Регистрация</Text>
        </View>
      </LinkButton>
      <LinkButton 
        href={{pathname: "/buy"}} 
        type="primary" 
        center={true}
      >
        <View style={styles.buttonContent}>
          <MaterialIcons name="attach-money" size={20} color="white" />
          <Text style={{color: 'white'}}>Купить PREMIUM план</Text>
        </View>
      </LinkButton>
      <LinkButton 
        href={{pathname: "/buy"}}
        center={true}
      >
          <View style={styles.buttonContent}>
            <MaterialIcons name="wallet-giftcard" size={20} color="black" />
            <Text>Промо код</Text>
          </View>
      </LinkButton>
      <LinkButton 
        href={{pathname: "/contact"}}
        center={true}
      >
          <View style={styles.buttonContent}>
          <MaterialIcons name="mail-outline" size={20} color="black" />            
          <Text>Поддержка</Text>
          </View>
      </LinkButton>  
  </>
}

function MenuButton({ onPress }: HeaderButtonProps) {
  return (
    <View>
      <Pressable onPress={onPress}>
        <MaterialCommunityIcons name="menu-open" size={30} color="white"/> 
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  headerTitleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  image: {
    width: 30,
    height: 30,
    position: 'relative',
    top: 4,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'serif',
    color: 'white',
  },
  up: {
    color: 'chartreuse'
  },
  subtitle: {
    fontSize: 12,
    color: 'magenta',
    position: 'relative',
    bottom: 6,
    fontWeight: 500,    
    left: 16
  },
  headerNotificationBar: {
    backgroundColor:'#f9f2d7',
    fontSize: 14,
    padding: 4
  },
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
    justifyContent: "center",
    fontWeight: 400
  },
  menuLinksList: {
    gap: 8
  }
});


