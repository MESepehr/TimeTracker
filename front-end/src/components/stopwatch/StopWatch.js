import React from 'react';


export default class StopWatch extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            hour:'01'
        }
    }

    stop()
    {
        this.setState({
            hour : Math.floor(Math.random()*60).toString()
        });
    }

    start()
    {
        alert('start');
    }

    render()
    {
        return(
            <div className="stop-watch"><b> <span>{this.state.hour}:</span><span>00</span><span className="milisecond-part">:00</span> </b></div>
        );
    }
}