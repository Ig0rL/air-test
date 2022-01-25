import React, {Component} from "react";
import './app.css';
import logo from './logo.svg'
import Filter from "../filter";
import SwitchFilter from "../switch-filter";
import Ticket from "../ticket/Ticket";
import Server from "../../server/server";

export default class App extends Component {

    state = {
        filterSwitch: 'all',
        filter: []
    }

    buttonHandler = (event) => {
        this.setState({
            filterSwitch: event.target.value
        })
    }

    onChangeHandler = (event) => {
        const newFilterMap = this.state.filter;
        let value = event.target.value
        if(event.target.checked) {
            newFilterMap.push(parseInt(value))
        } else {
            const index = newFilterMap.indexOf(parseInt(value))
            if (index !== -1) {
                newFilterMap.splice(index, 1);
            }
        }
        this.setState({
            filter: newFilterMap
        })
    }


    render() {
        return (
            <div className="App">
                <div className="header">
                    <img src={logo} alt=""/>
                </div>
                <div className="wrapper">
                    <div className="wrapper__sidebar">
                        <Filter isActive={this.state.filter} onChangeHandler={this.onChangeHandler}/>
                    </div>
                    <div className="wrapper__content">
                        <SwitchFilter active={this.state.filterSwitch} buttonHandler={this.buttonHandler}/>
                        <Ticket filterMap={this.state.filter} filterSwitch={this.state.filterSwitch}/>
                    </div>
                </div>
            </div>
        )
    }
}