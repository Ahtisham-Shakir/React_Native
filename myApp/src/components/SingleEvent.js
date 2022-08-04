import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import axios from 'axios'
import useGlobalState from '../context'

const SingleEvent = ({ eventName, id }) => {

  const { fetchData, setLoading, setIsEditing, setEditId } = useGlobalState();

  const deleteEvent = (id) => {
    setLoading(true)
    axios.delete(`https://events-calender-backend.herokuapp.com/delete/${id}`).then(() => {
      alert('Event Deleted Successfully!')
      fetchData()
    }).catch(() => {
      alert('Getting internal issue Try Again later!')
    })
  }


  const update = (id) => {
    setIsEditing(true);
    setEditId(id);
  }

  return (
    <View style={styles.eventContainer}>
      <Text style={styles.title}>{eventName}</Text>
      <Icon style={styles.icon} name={'edit'} color="green"
        onPress={() => update(id)} />
      <Icon style={styles.icon} name={'trash'} color="red"
        onPress={() => deleteEvent(id)} />
    </View>
  )
}

export default SingleEvent

const styles = StyleSheet.create({
  eventContainer: {
    flexDirection: "row",
    backgroundColor: '#bae3fc',
    margin: 5,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 5
  },
  title: {
    flex: 1,
    color: "#333"
  },
  icon: {
    fontSize: 16,
    marginHorizontal: 3
  }
})