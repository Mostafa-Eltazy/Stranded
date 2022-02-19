import React from 'react'

import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import { useEffect } from 'react';
import { useUserContext } from '../components/UserData/Context';

const SettingsPage = ()=> {
    const {USER_Context_State, dispatch} = useUserContext()
    useEffect(()=>{
        console.log("from the settings page", USER_Context_State)
      },[USER_Context_State])
    return (
        <div>
            <Header/>
            Loading Page
            <Footer/>
        </div>
    )
}

export default SettingsPage
