import React from 'react';
import PropTypes from 'prop-types';
import './stopwatch.css';


export default class StopWatch extends React.Component
{
    static defaultProps = {
        time:1000*60*60*48,
        interval:10
    }

    static propTypes = {
        time:PropTypes.number,
        interval:PropTypes.number
    }

    constructor(props)
    {
        super(props);

        this.day = 0 ;
        this.hour = 0 ;
        this.min = 0 ;
        this.sec = 0 ;
        this.mil = 0 ;


        this.state = {
            time:this.props.time
        }
    }

    splitTimeInStrings()
    {
        let insecond = Math.floor(this.state.time/1000);
        let inminutes = Math.floor(insecond/60);
        let inhoure = Math.floor(inminutes/60);

        
        this.day = Math.floor(inhoure/24);
        this.hour = inhoure%24 ;
        this.min = inminutes%60 ;
        this.sec = insecond%60 ;
        this.mil = this.state.time%1000 ;

        //alert('day : '+this.day+' hour : '+this.hour+' min : '+this.min+' sec : '+this.sec+' mil : '+this.mil);
    }

        /**milisecond part */
        showMiliSecondPart()
        {
            return '\t:\t'+this.numToString(Math.floor(this.mil/10));
        }

        showSecondPart()
        {
            return this.numToString(this.sec);
        }

        /**Takes number and returns string in the 2 characters format : 1 -> '01' , 32 -> '32' */
        numToString(num)
        {
            num = num.toString();
            if(num.length===1)
            {
                return '0'+num ;
            }
            else
            {
                return num ;
            }
        }


    stop()
    {
        clearInterval(this.intervalId);
    }

    start()
    {
        this.intervalId = setInterval(this.incraeseTime.bind(this),this.props.interval);
    }

        incraeseTime()
        {
            this.setState({
                time:this.state.time+this.props.interval
            });
        }

    render()
    {
        this.splitTimeInStrings();

        const houreStyle = {
            color:'#'+Math.floor(Math.random()*0xffffff).toString(16)
        }
        /*<div className="stop-watch"><b> <span style={houreStyle}>{this.state.hour}:</span><span>00</span><span className="milisecond-part">:00</span> </b></div>*/
        return(
            <div className="stop-watch"><b><span>{this.showSecondPart()}</span><span className="milisecond-part">{this.showMiliSecondPart()}</span> </b></div>
        );
    }
}