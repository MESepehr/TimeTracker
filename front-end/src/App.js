import React from 'react';
import './App.css';
import PropTypes from 'prop-types';
import StopWatch from './components/stopwatch/StopWatch';
import axios from 'axios';


export default class App extends React.Component
{
    static defaultProps = 
    {
        domain:null,
        updateInterval:5000
    }

    static propTypes = 
    {
        domain:PropTypes.string.isRequired,
        updateInterval:PropTypes.number
    }

    constructor(props)
    {
        super(props);
        this.state = {
            isCounting:false
        }
        /**This is the current timer id to help you save the user time */
        this.currentTimerId = 0 ;
        this.stopWatchComponent = null ;
    }

    componentDidMount()
    {
        axios.get(this.props.domain+'/api/getLastOpenedDuration')
        .then(this.lastSavedTimeRetuned.bind(this)).catch(
            this.connectionError
        );
    }

    /**{"id":1,"description":null,"duration":"2000","submitdate":null,"submitdone":false} */
    lastSavedTimeRetuned(data)
    {
        if(data.data===null)
        {
            //alert("Try to generate new record to the server");
            axios.get(this.props.domain+'/api/insertNewDuration?duration=0')
            .then(res => {
                            //alert(res.data);
                            if(res.data===0)
                            {
                               alert("Somthing wrong with the server...") 
                            };
                            this.currentTimerId = res.data;
                        } ).catch(this.connectionError);
        }
        else
        {
            this.stopWatchComponent.startFrom(data.data.duration);
            this.currentTimerId = data.data.id ;
        }
    }

    /**Show the connectino error popUp */
    connectionError(error)
    {
        alert("Connectin Error : "+error);
    }

   toggleStopWatch()
   {
       this.setState({isCounting:!this.state.isCounting});
        if(this.state.isCounting)
        {
            this.stopWatchComponent.stop();
            this.stopUpdatingServer();
        }
        else
        {
            this.stopWatchComponent.start();
            this.startUpdatingServer();
        } 
   }

    
    startUpdatingServer()
    {
        if(this.updatorTimeoutId!==0 || this.currentTimerId===0)
        {
            console.log("The server updator is in progress")
            return ;
        }

        let sendCurrentDuration = function()
        {
            axios.get(this.props.domain+"api/updateDuration?duration="+this.stopWatchComponent.getCurrentTime()+"&id="+this.currentTimerId)
            .then(durationUpdateRespond.bind(this))
            .catch(connectinError.bind(this));
        }

            let connectinError = function(res)
            {
                console.log(res);
                this.updatorTimeoutId = 0 ;
                this.startUpdatingServer();
            }

            let durationUpdateRespond = function(res)
            {
                this.updatorTimeoutId = 0 ;
                if(res.data===0)
                {
                    console.log("...Connection problem...")
                }

                this.startUpdatingServer();
            }
        
        this.updatorTimeoutId = setTimeout(sendCurrentDuration,this.props.updateInterval);
    }
    
    stopUpdatingServer()
    {
        clearTimeout(this.updatorTimeoutId);
        this.updatorTimeoutId = 0 ;
    }

   saveUserRecord()
   {
        this.setState({isCounting:false});
        this.stopWatchComponent.stop();
        this.stopUpdatingServer();
   }



    render()
    {
        return(
            <div className="non">
                <div className="headersection"><h1>Stop Watch</h1></div>
                <button className="main-button">Stop Watch</button><button className="main-button">History</button>
                <div>
                    <StopWatch time={0} ref={ref => this.stopWatchComponent = ref }/>
                    <button onClick={this.toggleStopWatch.bind(this)} className="stop-watch-toggle">{(this.state.isCounting===true)?"STOP":"START"}</button>
                    <button onClick={this.saveUserRecord.bind(this)} className="stop-watch-toggle">Save Record</button>
                </div>
                
                <div className="footer">
                    <div className="footer-back-ground">Icons made by Yannick from www.flaticon.com is licensed by CC 3.0 BY</div>       
                </div>
            </div>
        );
    }
}