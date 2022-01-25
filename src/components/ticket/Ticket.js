import React, {Component} from "react";
import './ticket.css';
import Server from "../../server/server";
import Loader from "../loader";
import moment, {utc} from "moment/moment";

export default class Ticket extends Component {

    /**
     * Стэйт
     * @type {{tickets: [], searchId: null, loader: boolean}}
     */
    state = {
        tickets: [],
        searchId: null,
        loader: true
    }

    // Подключение сервера
    api = new Server()

    constructor() {
       super();
       this.getTicketsList()
    }

    /**
     * Получаем данные с сервера
     */
    getTicketsList = () => {
         this.api.getSearchId('/search')
            .then((response) => {
                this.api.getTickets(`/tickets?searchId=${response.searchId}`)
                    .then((response) => {
                        this.setState({
                            tickets:response.tickets,
                            loader: false
                        })
                    })
            })
    }

    renderList = (array) => {
        const five = array.slice(0,5);
        const switchValue = this.props.filterSwitch
        if(switchValue === 'cheap_price') {
            return this.filterSwitchPrice(five)
        }
        if(switchValue === 'speed_time') {
            return this.filterSwitchSpeed(five)
        }
        return five
    }

    filterSwitchPrice = (array) => {
        return array.sort((a,b) => a.price - b.price)
    }
    filterSwitchSpeed = (array) => {
        return array.sort((a,b) => {
            const prev = a.segments[0].duration - b.segments[0].duration
            const next = a.segments[1].duration - b.segments[1].duration
            return prev + next
        })
    }
    filterTransfer = (array, filterData) => {
        if(filterData.length === 0) {
            return array
        } else {
            if(filterData.includes(-1)) {
                return array
            }
            return array.filter((item) => {
                let one = item.segments[0].stops.length
                let two = item.segments[1].stops.length
                if(filterData.includes(one) && filterData.includes(two)) {
                    return item
                }
            })
        }

    }

    formatTime = (value, format = []) => {
        let minuteTime = parseInt (value); // минута
        let hourTime = 0; // час
        let result = '';
        if(minuteTime > 60) {
            // Получаем часы, получаем минуты, разделенные на 60, получаем целые часы
            hourTime = parseInt(minuteTime / 60);
            // Получаем очки в часах и часах, получаем минуты в минутах, поделенные на 60 очков в часах
            //minuteTime = Math.floor(minuteTime / 60) - (hourTime * 60)
            minuteTime = parseInt(minuteTime % 60);
        }

        if(minuteTime > 0) {
            result = "" + parseInt (minuteTime) + format[1] + result;
        }
        if(hourTime > 0) {
            result = "" + parseInt (hourTime) + format[0] + result;
        }
        return result;
    }

    stopTransfer = (value) => {
        let result = '';
        switch (value.length) {
            case 1:
                result = '1 пересадка';
                break;
            case 2:
                result = '2 пересадки';
                break;
            case 3:
                result = '3 пересадки';
                break;
            default:
                result = 'Без пересадок';
        }

        const data = value.toString();

        return {
            result,
            data
        };
    }

    render() {
        const filterMap = this.props.filterMap
        const list = this.filterTransfer(this.renderList(this.state.tickets), filterMap)
        //console.log(list)
        const loader = <Loader/>

        const itemsList = list.map((item, index) => {

            const table = item.segments.map((segment, index) => {
                const dataStop = this.stopTransfer(segment.stops)
                let start_time = moment(segment.date).utc().format('HH:mm')
                let end_time = moment(segment.date).utc().add(segment.duration * 60, 'seconds').format('HH:mm')
                return (
                    <div className="fly" key={`seg${index}`}>
                        <div className="fly-togo">
                            <p className="title">{segment.origin} - {segment.destination}</p>
                            <p className="message">
                                {start_time} - {end_time}
                            </p>
                        </div>
                        <div className="fly-time">
                            <p className="title">в пути</p>
                            <p className="message">{this.formatTime(segment.duration, ['ч ', 'м'])}</p>
                        </div>
                        <div className="fly-transfer">
                            <p className="title">
                                {dataStop.result}
                            </p>
                            <p className="message">{dataStop.data}</p>
                        </div>
                    </div>
                )
            })

            return (
                <div key={index} className="ticket-wrapper">
                    <div className="ticket-header">
                        <p className="ticket-price">{parseInt(item.price)} P</p>
                        <img src={`//pics.avs.io/99/36/${item.carrier}.png`} width={110} alt=""/>
                    </div>
                    {table}
                </div>
            )
        })

        const content = this.state.loader ? loader : itemsList

        return (
           <div className="tickets-container">
               {content}
           </div>
        )
    }
}