import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button, ActivityIndicator }
    from 'react-native'
import axios from 'axios';
// import MultiSelect from 'react-native-multiple-select';
import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'
import RadioForm from 'react-native-simple-radio-button';
import useGlobalState from '../../context';
import { style } from 'deprecated-react-native-prop-types/DeprecatedTextPropTypes';


export default function AddEvent() {
    const { validate, isEditing, eventData, setEventData, fetchData, editId, setIsEditing, setEditId, loading, setLoading } = useGlobalState();

    const radio_props = [
        { label: 'private', value: 'private' },
        { label: 'public', value: 'public' }
    ];

    // options ===> Multiple users to select
    const [options, setOptions] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([])

    // execute when user add or remove
    function onMultiChange() {
        return (item) => setSelectedUsers(xorBy(selectedUsers, [item], 'id'))
    }

    // Fetching number of users in the database to store into the list
    useEffect(() => {
        axios.get('https://events-calender-backend.herokuapp.com/getusers').then((res) => {
            const usersArr = res.data;
            // Making the array according to select box requirements
            setOptions(usersArr.map(user => ({
                ...user,
                item: user.username,
                id: user._id
            }
            )))
        })
    }, [])

    // Whenever input value change
    const handleChange = (name, value) => {
        setEventData(state => (
            {
                ...state,
                [name]: value
            }
        ))
    }

    // Function to reset state
    const reset = () => {
        setEventData({
            eventName: '',
            eventDescription: '',
            eventType: '',
            privateUsers: []
        })
    }


    // Function to add data to the database
    const handleSubmit = () => {
        // making object format according to the database schema
        const eventObj = { ...eventData, privateUsers: selectedUsers }
        if (validate(eventObj) && isEditing) {
            setLoading(true)
            const updatedObj = { ...eventObj, _id: editId }
            axios.put('https://events-calender-backend.herokuapp.com/update', updatedObj).then(() => {
                alert("Event Updated Successfully")
                setLoading(false)
                fetchData()
                reset();
                setIsEditing(false);
                setEditId(null);
            }).catch((err) => {
                alert('Network error try again later!')
                setLoading(false)
            })
        }

        else if (validate(eventObj)) {
            setLoading(true)
            axios.post('https://events-calender-backend.herokuapp.com/addevent', eventObj).then(() => {
                alert("Data has been added successfully!");
                setLoading(false)
                fetchData()
                reset();
            }).catch(() => {
                alert('Network Error Try again later!')
                setLoading(false);
            })
        }
    }

    return (
        <View style={styles.container}>
            {loading && <ActivityIndicator style={styles.flexContainer} color={"blue"} size={"large"} />}
            {isEditing && <Text style={styles.h1}>Enter Updated values</Text>}
            <Text style={styles.label}>Event Name</Text>
            <TextInput
                value={eventData.eventName}
                style={styles.input}
                onChangeText={(val) => { handleChange('eventName', val) }} />

            <Text style={styles.label}>Event Description</Text>
            <TextInput
                value={eventData.eventDescription}
                style={styles.input}
                onChangeText={(val) => handleChange('eventDescription', val)} />

            <Text style={styles.label}>Choose Event Type</Text>
            <RadioForm radio_props={radio_props} initial={'public'}
                onPress={val => setEventData(s => ({ ...s, eventType: val }))} />
            {
                // Conditionally renderring multiSelect component
                eventData.eventType === 'private' && <View>
                    <Text style={styles.label}>Select Private users</Text>
                    <SelectBox
                        label="Select multiple"
                        options={options}
                        selectedValues={selectedUsers}
                        onMultiSelect={onMultiChange()}
                        onTapClose={onMultiChange()}
                        isMulti
                    />
                </View>
            }
            <Button
                title={isEditing ? 'Update Event' : 'Add event'}
                onPress={handleSubmit} />
        </View>
    )
}

const styles = StyleSheet.create({
    flexContainer:{
        flex: 1,
        justifyContent:"center",
        alignItems:"center"
    },
    container: {
        padding: 20
    },
    input: {
        borderWidth: 1,
        borderColor: "gray",
        borderStyle: "solid",
        marginVertical: 9,
        height: 40,
        borderRadius: 5
    },
    label: {
        color: "black",
        fontSize: 16
    },
    button: {
        backgroundColor: "#039be5",

    },
    h1: {
        fontSize: 24,
        textAlign: "center",
        marginBottom: 10,
        color: "#333"
    }
})