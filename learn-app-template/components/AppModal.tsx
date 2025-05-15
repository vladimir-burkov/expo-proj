import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { PropsWithChildren } from 'react';
import { Modal, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useEffect, useState } from 'react'; 
import { useNavigation } from 'expo-router';



type Props = PropsWithChildren<{
  isVisible: boolean;
  title?: string;
  onClose: () => void;
}>;

export default function AppModal({ isVisible, title, children, onClose }: Props) {
  const navigation = useNavigation(); 
  useEffect(() => { 
    const unsubscribe = navigation.addListener('state', () => { onClose(); }); 
    return unsubscribe; 
  }, [navigation]);

  const containerStyles = StyleSheet.create({
    titleContainer: {
      height: '14%',
      backgroundColor: '#464C55',
      gap: 16,
      paddingHorizontal: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: title ? 'space-between' : "flex-end",
    }
  });
  
  return (
    <View>
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalContent}>
        <View style={containerStyles.titleContainer}>
          {title && <Text style={styles.title}>{title}</Text>}
          <Pressable onPress={onClose}>
            <MaterialIcons name="close" color="#fff" size={22} />
          </Pressable>
        </View>
        {isVisible && 
          <TouchableWithoutFeedback onPress={onClose}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
        }
        <View style={styles.headerModalMenuContainer}>
          {children}
        </View>  
      </View>
    </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    height: '40%',
    width: '100%',
    backgroundColor: '#25292e',
    position: 'absolute',
    bottom: 0,
  },
  title: {
    color: '#fff',
    fontSize: 16,
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    height: '100%',
    left: 0,
    right: 0,
    zIndex: -9999,
  },
  headerModalMenuContainer: {
    flex: 1,
    padding: 16,
    justifyContent: "center"
  }
});
