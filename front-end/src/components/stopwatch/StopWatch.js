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

        /**0 only miliseconds, 1 seconds, 2 minutes, 3 hours, 4 days */
        this.level = 0 ;

        this.separator = '\t:\t' ;

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

        if(this.day>0)
        {
            this.level=4;
        }
        else if(this.hour>0)
        {
            this.level=3;
        }
        else if(this.min>0)
        {
            this.level=2;
        }
        else if(this.sec>0)
        {
            this.level=1;
        }

        //alert('day : '+this.day+' hour : '+this.hour+' min : '+this.min+' sec : '+this.sec+' mil : '+this.mil);
    }

        /**milisecond part */
        showMiliSecondPart()
        {
            return '.'+this.numToString(Math.floor(this.mil/10));
        }

        showSecondPart()
        {
            return this.numToString(this.sec);
        }

        showMinutesPart()
        {
            return (this.level>=2)?this.numToString(this.min):'';
        }

        showMinutesSeparator()
        {
            return (this.level>=2)?this.separator:'';
        }

        showHourePart()
        {
            return (this.level>=3)?this.numToString(this.hour):'';
        }

        showHoureSeparator()
        {
            return (this.level>=3)?this.separator:'';
        }

        showDayPart()
        {
            return (this.level===4)?this.day:'';
        }

        showDaySeparator()
        {
            return (this.level===4)?this.separator:'';
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

        const numberWidth = 100 ;
        const dividerWidth = 20 ;
        let width = (this.level+1)*numberWidth+this.level*dividerWidth ;

        var styleArray = [] ;

        var X = width/2;

        for(var i = 0 ; i<=this.level ; i++)
        {
            console.log("X for number : "+X);
            styleArray.push({
                //position:'absolute',
                //marginLeft: (X-=numberWidth)+'px'
            });
            
            console.log("X for divider : "+X);
            styleArray.push({
                //position:'absolute',
                //marginLeft: (X-=dividerWidth)+'px'
            });
        }

        const stopWatchContainer = {
            width:'100%',
            height:'60px'
        }
       
        /*<div className="stop-watch"><b> <span style={houreStyle}>{this.state.hour}:</span><span>00</span><span className="milisecond-part">:00</span> </b></div>*/
        return(
            <div className="stop-watch" style={stopWatchContainer}><b>
                <span style={styleArray[8]} className="day-part">{this.showDayPart()}</span><span style={styleArray[7]}>{this.showDaySeparator()}</span>
                <span style={styleArray[6]}>{this.showHourePart()}</span><span style={styleArray[5]}>{this.showHoureSeparator()}</span>
                <span style={styleArray[4]}>{this.showMinutesPart()}</span><span style={styleArray[3]}>{this.showMinutesSeparator()}</span>
                <span style={styleArray[2]}>{this.showSecondPart()}</span>
                <span style={styleArray[0]} className="milisecond-part">{this.showMiliSecondPart()}</span> </b>
            </div>
        );
    }
}