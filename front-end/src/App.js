import React from 'react';
import './App.css';
import StopWatch from './components/stopwatch/StopWatch'


export default class App extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            isCounting:false
        }
        this.stopWatchComponent = null ;
    }

   toggleStopWatch()
   {
       this.setState({isCounting:!this.state.isCounting});
        if(this.state.isCounting)
        {
            this.stopWatchComponent.stop();
        }
        else
        {
            this.stopWatchComponent.start();
        } 
   }

   saveUserRecord()
   {
        this.setState({isCounting:false});
        this.stopWatchComponent.stop();
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