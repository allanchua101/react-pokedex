import React from 'react';

class SideNav extends React.Component {
    render() {
        return (
            <div className='side-nav-bar'>
                <div className='side-nav-form'>
                    <h2>Configuration</h2>
                    <hr />
                    <h3>Filter List</h3>
                    <input type='text' className='filter-box' placeholder='ID' required="required"/>
                    <input type='text' className='filter-box' placeholder='Pokemon Name' required="required" />
                    <input type='text' className='filter-box' placeholder='Type' required="required" />
                </div>                    
            </div>
        );
    }
}

export default SideNav;