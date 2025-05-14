import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { PropsWithChildren } from 'react';
import { Modal, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

type Props = PropsWithChildren<{
  isVisible: boolean;
  title?: string;
  onClose: () => void;
}>;

export default function AppModal({ isVisible, title = 'Menu', children, onClose }: Props) {
  return (
    <View>
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
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
        {children}
      </View>
    </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    height: '50%',
    width: '100%',
    backgroundColor: '#25292e',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: 'absolute',
    bottom: 0,
  },
  titleContainer: {
    height: '14%',
    backgroundColor: '#464C55',
    gap: 16,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontSize: 16,
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -9999,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
});
