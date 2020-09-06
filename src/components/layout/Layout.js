import React from "react";
import './layout.css'

function Layout(props) {
    return (
        <div>
            <div className='header'>
                <h1 className='headerTitle'>App Title</h1>
                <div>
                    <a href='/dashboard'>Dashboard</a>
                    <a href='/entries'>Entries</a>
                    <a href='/canvas'>Canvas</a>
                </div>
            </div>
            <div>
                {props.children}
            </div>
        </div>
    );
}

export default Layout;