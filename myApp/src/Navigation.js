import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EventList from './Screens/Events/EventList';
import AddEvent from './Screens/AddEvent/AddEvent';
import MaterialCommunityIcons from 'react-native-vector-icons/FontAwesome5'
import useGlobalState from './context';
import Login from './Screens/Login/Login';

const Tab = createBottomTabNavigator();


export default function Navigation() {
  const {user} = useGlobalState();
  return (
    !user ? <Login/> :
    <NavigationContainer>
        <Tab.Navigator>
            <Tab.Screen name='EventList' component={EventList}
            options={{
              tabBarLabel: 'Event List',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name={"calendar-alt"} color={color} size={24} />
                ),
              }}
            />
            <Tab.Screen name='AddEvent' component={AddEvent}
            options={{
              tabBarLabel: 'Add Event',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name={"calendar-plus"} color={color} size={26} />
              ),
            }}/>
        </Tab.Navigator>
    </NavigationContainer>
  )
}