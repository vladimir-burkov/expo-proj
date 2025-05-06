import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'

type LoadingProps = {
  loading: boolean
}

const Loader = ({loading}: LoadingProps) => {
  return (
    <>
      {loading && 
        <View style={styles.loader}>
            <ActivityIndicator  size="large" color="#684bbc" />
            <Text>Загрузка...</Text>
        </View>
      }
    </>
  )
}

export default Loader;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  loader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
});