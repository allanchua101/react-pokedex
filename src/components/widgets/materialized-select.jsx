import React from 'react';

function stringify(item) {
    return JSON.stringify(item);
}

export default class MaterializedSelect extends React.Component {
    render() {
        let { items = [], name, textProperty, keyProperty, onChange } = this.props;
        let templatedItems = items.map(item => {
            return <option key={item[keyProperty]} value={stringify(item)}>{item[textProperty]}</option>;
        });
        
        return (
            <div className="select">
                <select name={name} onChange={onChange} >
                    {templatedItems}
                </select>
            </div>
        );
    }
};