import React from 'react';
import SideNav from './side-navigation-bar.jsx';

class MainPanel extends React.Component {
    render() {
        return (
            <div>
                <SideNav />
                <h1>Pokedex</h1>
            </div>
        );
    }
}

export default MainPanel;