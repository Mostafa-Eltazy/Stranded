import React from 'react'

import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import SinglePostLayout from '../components/singlePostComponents/SinglePostLayout';

const  SinglePost = () => {
    return (
        <div>
            <Header/>
            <div className="page-wrapper">
            <SinglePostLayout/>
            </div>
            <Footer/>
        </div>
    )
}

export default SinglePost
