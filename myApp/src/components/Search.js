import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

const Search = ({ search, setSearch }) => {
    return (
        <View style={styles.searchContainer}>
            <TextInput style={styles.searchBar}
                placeholder="Search Events"
                value={search}
                onChangeText={val => setSearch(val)} />
            <View style={styles.iconBg}><Icon style={styles.searchIcon} name={'search'} /></View>
        </View>
    )
}

export default Search

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 10
    },
    searchBar: {
        borderWidth: 1,
        borderColor:"gray",
        width: "70%",
        height: 40
    },
    iconBg: {
        backgroundColor: "#333",
        justifyContent: "center",
        alignItems: "center",
        width: "10%"
    },
    searchIcon: {
        fontSize: 15,
        color: "#fff"
    }
})