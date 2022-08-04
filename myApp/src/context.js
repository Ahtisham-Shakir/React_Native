import React, { createContext, useContext, useState } from "react";
import axios from 'axios'

const AppContext = createContext();


export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    const [eventData, setEventData] = useState({
        eventName: '',
        eventDescription: '',
        eventType: '',
        privateUsers: []
    });

    // Fetching data from database
    const fetchData = ()=>{
        // setLoading(true)
        axios.get('https://events-calender-backend.herokuapp.com/').then((res)=>{
            setEvents(res.data);
            setLoading(false);
        }).catch((err)=>{
            console.log(err);
            setLoading(false);
            alert('Network Error')
        })
    }


    // Function to validate data
    const validate = (data) => {
        if (data.eventType === 'public') {
            for (const key in data) {
                if (data[key] === '') {
                    alert("Please fill all the fields")
                    return false
                }
            }
            return true
        }

        else if (data.eventType === 'private') {
            for (const key in data) {
                if (data[key] === '' || data.privateUsers.length === 0) {
                    alert("Please fill all the fields")
                    return false
                }
            }
            return true
        }

        else{
            alert("Please fill all the fields")
            return false
        }
    }



    return <AppContext.Provider value={{
        user,setUser,
        events, setEvents,
        fetchData,
        loading, setLoading,
        validate,
        isEditing, setIsEditing,
        editId, setEditId,
        eventData, setEventData

    }}>
        {children}
    </AppContext.Provider>
}

// Custom Hook
const useGlobalState = ()=> useContext(AppContext);
export default useGlobalState