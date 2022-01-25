import React, {Component} from "react";
import './loader.css';

export default class Loader extends Component {
    render() {
        return (
            <div className="loader-container">
                <div className="lds-ring">
                    <div ></div >
                    <div ></div >
                    <div ></div >
                    <div ></div >
                </div >
            </div>
        )
    }
}