import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
const logo = require('@/assets/images/book1.svg');
import AppModal from '@/components/AppModal';
import LinkButton from "@/components/core/LinkButton";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import { FontAwesome } from '@expo/vector-icons';

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
            contentFit='contain'
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

  const buttonStyle = StyleSheet.create({
    plainButton: {
      flex: 1,
      transitionDuration: "200ms",
      flexDirection: "row",
      alignItems: 'center',
      paddingLeft: 20,
      paddingRight: 24,
      borderRadius: 8
    },
    plainButtonHovered: {
      backgroundColor: "rgba(255, 255, 255, 0.6)"
    },
    plainButtonPressed: {
      backgroundColor: "rgba(255, 255, 255, 0.6)"
    },
  });


  const buttonStyleOutline = {...buttonStyle,  plainButton: {...buttonStyle.plainButton, borderWidth: 2, borderColor: "#c215f0", backgroundColor: "#684bbc52"}}

  return <>
    <View style={styles.menuLinksList}>
      <LinkButton 
        href={{pathname: "/auth"}} 
        buttonStyle={buttonStyle}
      >
        <View style={styles.buttonContent}>
        <MaterialCommunityIcons name="login-variant" size={20} color="white" />
          <Text style={styles.buttonText}>Войти/Регистрация</Text>
        </View>
      </LinkButton>
      <LinkButton 
        href={{pathname: "/buy"}}
        buttonStyle={buttonStyleOutline} 
      >
        <View style={styles.buttonContent}>
          <MaterialIcons name="workspace-premium" size={20} color="#7fff00" />
          <Text style={{color: '#7fff00', fontWeight: '800'}}>Купить PREMIUM план</Text>
        </View>
      </LinkButton>
      <LinkButton 
        href={{pathname: "/buy"}}
        buttonStyle={buttonStyle} 
      >
          <View style={styles.buttonContent}>
            {/* <MaterialIcons name="wallet-giftcard" size={20} color="white" /> */}
            <MaterialCommunityIcons name="qrcode-plus" size={20} color="white" />
            {/* <FontAwesome name="barcode" size={20} color="white" /> */}
            <Text style={styles.buttonText}>Промо код</Text>
          </View>
      </LinkButton>
      <LinkButton 
        href={{pathname: "/contact"}}
        buttonStyle={buttonStyle} 
      >
          <View style={styles.buttonContent}>
          <MaterialIcons name="mail-outline" size={20} color="white" />            
          <Text style={styles.buttonText}>Поддержка</Text>
          </View>
      </LinkButton>  
    </View>
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
  headerButton: {
    paddingLeft: 16,
    alignItems: 'center',
    color: 'white'
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    flex: 1,
    minHeight: 45,
  },
  buttonText: {
    color: "white"
  },
  menuLinksList: {
    gap: 12,
  }
});


