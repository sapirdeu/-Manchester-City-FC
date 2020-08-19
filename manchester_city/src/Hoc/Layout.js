import React from 'react'
import Header from '../Components/header_footer/Header'
import Footer from '../Components/header_footer/Footer'

function Layout(props) {
    return (
        <div>
            <Header/>
            {props.children}
            <Footer/>
        </div>
    )
}

export default Layout
