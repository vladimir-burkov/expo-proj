import MenuButton from '@/components/MenuButton';
import { StyleSheet, View } from 'react-native';

export default function LessonsScreen() {
  const onclick = () => {

  }
  
  return (
    <View style={styles.container}>
       <MenuButton icon="refresh" label="Reset" onPress={onclick} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
});
