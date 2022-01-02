import React from 'react'

const HomeLayout = ({home_page_data})=>{
    console.log("qqqqqq",home_page_data);
    console.log("here")

    
    return (
        <>
        <i className="fas fa-island-tropical"></i>
        <div className="rounded-circle"> This is the home page</div>
        {home_page_data?.posts.map((post)=>{
            return <p> {post.title}</p>
        })}
        </>
    )
}

export default HomeLayout
 