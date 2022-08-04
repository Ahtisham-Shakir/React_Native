import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Loading = () => {
  return (
    <View>
      <Text style={styles.h1}>Loading...</Text>
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
    h1:{
        fontSize: 25,
        color: '#039be5',
        textAlign:"center",
        marginVertical: 10,
        fontWeight: "bold"
    }
})