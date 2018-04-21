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
        updateInterval:5000//It has to override by the callser component
    }

    static propTypes = 
    {
        domain:PropTypes.string.isRequired,
        updateInterval:PropTypes.number.isRequired
    }

    constructor(props)
    {
        super(props);
        this.state = {
            isCounting:false,
            mode:0//0: stop watch, 1: input text to save
        }
        /**This is the current timer id to help you save the user time */
        this.currentTimerId = 0 ;
        this.updatorTimeoutId = 0 ;
        
        this.stopWatchComponent = null ;

        this.lastStopWatchTime = 0 ;
        this.lastDescription = '' ;
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
                               alert("Somthing wrong with the server...") ;
                               return;
                            };
                            this.currentTimerId = res.data;
                            if(this.state.isCounting)
                            {
                                this.startUpdatingServer();
                            }
                        } ).catch(this.connectionError);
        }
        else
        {
            this.stopWatchComponent.startFrom(data.data.duration);
            this.currentTimerId = data.data.id ;
            this.lastDescription = data.data.description ;
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
            console.log("The server updator is in progress : "+this.updatorTimeoutId+" vs "+this.currentTimerId);
            return ;
        }
        console.log("Start updating...");
        this.updatorTimeoutId = setTimeout(this.sendCurrentDuration.bind(this),this.props.updateInterval);
    }
        sendCurrentDuration(newDescription,currentTime)
        {
            let descriptionPart = '';
            if(newDescription!==null)
            {
                descriptionPart = '&description='+newDescription ;
            }
            if(currentTime===null)
            {
                currentTime = this.stopWatchComponent.getCurrentTime();
            }
            console.log("Update server : "+this.props.domain+"api/updateDuration?duration="+currentTime+"&id="+this.currentTimerId+descriptionPart);
            axios.get(this.props.domain+"/api/updateDuration?duration="+currentTime+"&id="+this.currentTimerId+descriptionPart)
            .then(this.durationUpdateRespond.bind(this))
            .catch(this.connectinError.bind(this));
        }
        
        connectinError(res)
        {
            console.log(res);
            if(this.updatorTimeoutId !== 0)//This means timeout called this function befor
            {
                this.updatorTimeoutId = 0 ;
                this.startUpdatingServer();
            }
        }

        durationUpdateRespond(res)
        {
            if(res.data===0)
            {
                console.log("...Connection problem...")
            }
            else
            {
                console.log("Server updated");
            }

            if(this.updatorTimeoutId !== 0)//This means timeout called this function befor
            {
                this.updatorTimeoutId = 0 ;
                this.startUpdatingServer();
            }
        }
    
    stopUpdatingServer()
    {
        clearTimeout(this.updatorTimeoutId);
        this.updatorTimeoutId = 0 ;
        this.sendCurrentDuration();
    }

   saveUserRecord()
   {
        this.setState({isCounting:false});
        this.stopWatchComponent.stop();
        this.stopUpdatingServer();
        this.lastStopWatchTime = this.stopWatchComponent.getCurrentTime();

        this.setState({
            lastStopWatchTime:this.lastStopWatchTime,
            lastDescription:this.lastDescription,
            mode:1
        });
   }

   openStopWatch()
   {
        this.setState({
            mode:0
        })
   }

   resetStopWatch()
   {
        this.lastStopWatchTime = 0 ;
        this.openStopWatch();
        setTimeout(this.sendCurrentDuration.bind(this),0);
   }

    updateAndOpenStopWatch()
    {
        if(this.milToMin(this.state.lastStopWatchTime)!==this.milToMin(this.lastStopWatchTime))
        {
            this.lastStopWatchTime = this.state.lastStopWatchTime ;
        }
        this.sendCurrentDuration(this.state.lastDescription,this.lastStopWatchTime);
        this.openStopWatch();
    }


    /**Converts miliseconds to minutes */
    milToMin(mil)
    {
        return Math.floor(mil/(1000*60));
    }

    /**Convets minutes to miliseconds */
    minToMil(min)
    {
        return Number(min)*1000*60;
    }

    render()
    {

        let stopWatch =  <div>
                            <StopWatch time={this.lastStopWatchTime} ref={ref => this.stopWatchComponent = ref }/>
                            <button onClick={this.toggleStopWatch.bind(this)} className="stop-watch-toggle">{(this.state.isCounting===true)?"STOP":"START"}</button>
                            <button onClick={this.saveUserRecord.bind(this)} className="stop-watch-toggle">Save / Reset</button>
                        </div>;

        let inputText = <div>
                <form>
                    <label>Duration in minutes : </label>
                        <input type="number" name="duration" value={this.milToMin(this.state.lastStopWatchTime)} onChange={(ev)=>this.setState({lastStopWatchTime : this.minToMil(ev.target.value)})}/><br/>
                    <label>Description : </label>
                        <textarea name="descrip" rows="3" value={this.state.lastDescription} onChange={(ev)=>this.setState({lastDescription : ev.target.value})}></textarea><br/>
                </form>
                    <button onClick={()=>0} className="save-record-button">SAVE</button><br/>
                    <button onClick={this.resetStopWatch.bind(this)} className="stop-watch-toggle">Reset</button>
                    <button onClick={this.updateAndOpenStopWatch.bind(this)} className="stop-watch-toggle">Back</button>
                
            </div>

        let bodyPart ;

        switch(this.state.mode)
        {
            case 1:
                bodyPart = inputText ;
            break;
            case 0:
            default:
                bodyPart = stopWatch;
            break;
        }

        return(
            <div className="non">
                <div className="headersection"><h1>Stop Watch</h1></div>
                <button className="main-button">Stop Watch</button><button className="main-button">History</button>
               
                {bodyPart}

                <div className="footer">
                    <div className="footer-back-ground">Icons made by Yannick from www.flaticon.com is licensed by CC 3.0 BY</div>       
                </div>
            </div>
        );
    }
}