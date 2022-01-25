import React, {Component} from "react";
import './switch.css'

export default class SwitchFilter extends Component{

    state = {
        buttonFilter: [
            {key:Math.random(), name:'Все', value: 'all'},
            {key:Math.random(), name:'Самый дешевый', value: 'cheap_price'},
            {key:Math.random(), name:'Самый быстрый', value: 'speed_time'}
        ]
    }

    buttonList = () => {
        const btns = this.state.buttonFilter
        return btns.map((item, index) => {

            const isActive = this.props.active === item.value

            const clazz = isActive ? 'active' : ''
            return (
                <button onClick={this.props.buttonHandler} key={`${index}-${item.key}`} value={item.value} className={`btn-item ${clazz}`}>{item.name}</button>
            )
        })
    }

    render() {
        const btns = this.buttonList()
        return (
            <div className="switch-filter">
                <div className="btn-group fontUppercase">
                    {btns}
                </div>
            </div>
        )
    }
}