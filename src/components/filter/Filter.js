import React, {Component} from "react";
import './filter.css'

export default class Filter extends Component {

    state = {
        filterItem: [
            {name: 'Все', id: 'check1', value: -1},
            {name: 'Без пересадок', id: 'check2', value: 0},
            {name: '1 пересадка', id: 'check3', value: 1},
            {name: '2 пересадки', id: 'check4', value: 2},
            {name: '3 пересадки', id: 'check5', value: 3}
        ]
    };

    filterList = () => {
        return this.state.filterItem.map((item) => {
            return (
                <li key={item.id}>
                    <div className="checkbox-wrapper">
                        <input onChange={this.props.onChangeHandler} value={item.value} type="checkbox" id={item.id} className="custom-checkbox"/>
                        <label htmlFor={item.id}>{item.name}</label>
                    </div>
                </li>
            );
        })
    }

    render() {
        const filterList = this.filterList();
        return (
            <div className="filter">
                <p className="title">Количество пересадок</p>
                <div className="filter-block">
                    <ul>
                        {filterList}
                    </ul>
                </div>
            </div>
        )
    }
}