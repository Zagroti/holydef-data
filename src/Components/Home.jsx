import React, { Component } from 'react'
import Navbar from './Navbar'
import Form from './Form';
import Footer from './Footer';

class Home extends Component {
    render() {
        return (

            <div>
                <Navbar />
                <Form />
                <Footer />
            </div>
        )

    }
}

export default Home