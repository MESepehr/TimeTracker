import React from 'react';
import './App.css';


export default class App extends React.Component
{
    render()
    {
        return(
            <div className="non">
                <div className="headersection"><h1>Stop Watch</h1></div>
                <button className="main-button">Stop Watch</button><button className="main-button">History</button>
                <div>
                    <div className="stop-watch"><b> <span>00:</span><span>00</span><span className="milisecond-part">:00</span> </b></div>
                    <button className="stop-watch-toggle">START</button>
                </div>
                
                <div className="footer">
                    <button className="save-record-button">Save Record</button>
                    <div className="footer-back-ground">Icons made by Yannick from www.flaticon.com is licensed by CC 3.0 BY</div>       
                </div>
            </div>
        );
    }
}