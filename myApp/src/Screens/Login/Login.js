import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableHighlight } from 'react-native'
import useGlobalState from '../../context'
import axios from 'axios'

const Login = () => {

    const { setUser, loading, setLoading } = useGlobalState();

    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    })

    // Function to handle change in input values
    const handleChange = (name, val) => {
        setLoginData((state) => (
            {
                ...state,
                [name]: val
            }
        ))
    }

    // Function to login user
    const handleLogin = () => {
        if (!loginData.username || !loginData.password) {
            alert("Please fill all the fields")
        } else
            setLoading(true);
        axios.post('https://events-calender-backend.herokuapp.com/login', loginData).then((res) => {
            alert(res.data.message);
            setUser(res.data.username);
            setLoading(false)
        }).catch((err) => {
            setLoading(false)
            console.log(err);
        })
    }

    // Function to register user
    const handleRegister = () => {
        if (!loginData.username || !loginData.password) {
            alert("Please fill all the fields")
        } else
        setLoading(true);
            axios.post('https://events-calender-backend.herokuapp.com/register', loginData).then((res) => {
                setLoading(false);
                if (!res.data.message) {
                    alert('User already exit with this name');
                }
                alert(res.data.message);
                setUser(res.data.username);
            }).catch((err) => {
                alert('Network error')
                setLoading(false)
            })
    }

    return (
        <View style={styles.loginContainer}>
            <Text style={styles.h1}>LOGIN / REGISTER</Text>

            <TextInput style={styles.input} placeholder="Enter Username" onChangeText={(val) => handleChange('username', val)} />

            <TextInput style={styles.input} placeholder="Enter  Password" secureTextEntry onChangeText={(val) => handleChange('password', val)} />

            <TouchableHighlight style={styles.btn}
                onPress={handleLogin}>
                <Text style={styles.btnText}>LOGIN</Text>
            </TouchableHighlight>

            <TouchableHighlight style={styles.btn}
                onPress={handleRegister}>
                <Text style={styles.btnText}>REGISTER</Text>
            </TouchableHighlight>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    loginContainer: {
        // flex: 1,
        padding: 10,
        justifyContent: "center"
    },
    h1: {
        textAlign: 'center',
        fontSize: 25,
        color: '#333',
        marginVertical: 10
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        marginVertical: 5,
        height: 40,
        borderRadius: 3
    },
    btn: {
        backgroundColor: "#039be5",
        marginVertical: 5,
        paddingVertical: 10,
        borderRadius: 5
    },
    btnText: {
        textAlign: "center",
        color: "white"
    }
})