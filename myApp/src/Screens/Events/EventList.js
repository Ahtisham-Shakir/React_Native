import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import SingleEvent from '../../components/SingleEvent';
import Search from '../../components/Search';
import useGlobalState from '../../context';
import Loading from '../../components/Loading';

export default function EventList() {
    const [search, setSearch] = useState('');
    const { events, fetchData, loading } = useGlobalState();

    // Fetching events from database
    useState(() => {
        fetchData();
    }, [])

    const filteredList = events.filter((event) => event.eventName.includes(search))

    const { user } = useGlobalState();

    return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.h1}>Your Events</Text>
                    <Search search={search} setSearch={setSearch} />
                    {
                    loading ? <Loading /> :
                        filteredList.map(({ eventName, eventType, privateUsers, _id }) => {
                            if (user === 'admin')
                                return <SingleEvent key={_id} eventName={eventName} id={_id} />

                            else if (eventType === 'private') {
                                const privateArray = privateUsers.map(({ username }) => username);
                                if (privateArray.includes(user))
                                    return <SingleEvent key={_id} eventName={eventName} id={_id} />
                            }
                            else
                                return <SingleEvent key={_id} eventName={eventName} id={_id} />

                        })
                    }
                </View>
            </ScrollView>
    )
}



const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    h1: {
        color: '#333',
        fontSize: 24,
        textAlign: 'center',
        marginVertical: 5
    },
    search: {
        borderWidth: 1,

    }
})