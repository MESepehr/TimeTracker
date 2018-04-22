<p align="center"><h2 align="center">Time Tracker</h2><p align="center">This is a sample project using React, Symfony and mySQL<p><br>
    <img  src="https://github.com/MESepehr/TimeTracker/blob/Documentation/Doc/images/Network.png"/>  
</p>

<br>
<br>
<br>

## How To Run Demo
The project has 2 separated parts. Front-end, developed using React and the back-end, developed using Symfony. I have stored a database SQL file for mySql. You can find it on the database folder in the project. Follow below steps to run the project on your local machine:<br>
<ol>
   <li>Import the database/timetrackerdb.sql to mySql.</li>
   <li>Update the back-end/.env file to be able to connect your data base and run the back-end project using Symfony instructions. the back-end part had no interfaces.</li>
   <li>You have to update the front-end Apis destination domain now. Open the front-end/src/index.js and update the domain property of the App component.</li>
   <li>Run the front-end project by following React instruction.</li>
</ol>
If every thing is correct, you can see the chronometer in the black window and shouldn’t prompt any connection errors.  You have to control that both server ( React yarn and Symfony php ) are running to gather.<br>
<p align="center"><img height="200px" src="https://github.com/MESepehr/TimeTracker/blob/Documentation/Doc/images/Home.PNG?raw=true"/></p>
<br>
## Project Documentation
<p align="center">
   <img height="300px" src="https://github.com/MESepehr/TimeTracker/blob/master/Doc/UseCase.png"/><p align="center">Use case diagram</p>
</p>
<p align="center">
   <img src="https://github.com/MESepehr/TimeTracker/blob/Documentation/Doc/DataBase.png?raw=true"/><p align="center">Data base diagram (users table didn't used on the current level project)</p>
</p><br>

## How it works
<br>

### Openning the application
The application connects to the server to load the last unfinished tracked time from the serve whenever you open it.
<p align="center">
   <img height="200px" src="https://github.com/MESepehr/TimeTracker/blob/Documentation/Doc/Opening%20the%20application.png?raw=true"/>
   <p align="center">Openning the application</p>
</p>
<br>

### Count down running
By pressing Start item on the stage, the count down will start. it is going to store the counted down time to the server in an interval. the interval time out can set up by passing updateInterval props to the App component. currently it is only every 1000 milliseconds that should increase for the real usage.
<p align="center">
   <img width="400px" src="https://github.com/MESepehr/TimeTracker/blob/Documentation/Doc/images/CountDown.PNG?raw=true"/>
   <img width="400px" src="https://github.com/MESepehr/TimeTracker/blob/Documentation/Doc/Data%20updating.png?raw=true"/>
</p>
<br>

### Save/Reset tracking time
User can edit, save or reset his count down timer and all will store on the main data base after pressing buttons.
<p align="center">
   <img width="400px" src="https://github.com/MESepehr/TimeTracker/blob/Documentation/Doc/images/Save%20page.PNG?raw=true"/>
</p>
<br>

### Loading history
I preferred to combine data base fetching with client side sorting. it has better performance both for the server process and client view for limited number of data (about below 1000 data like this one ) but if amount has been more than this, I have to move the sort function to the back end and using pagination to return data step by step.
<p align="center">
   <img width="400px" src="https://github.com/MESepehr/TimeTracker/blob/Documentation/Doc/images/History%20page.PNG?raw=true"/>
   <img width="400px" src="https://github.com/MESepehr/TimeTracker/blob/Documentation/Doc/Loading%20history.png?raw=true"/>
</p>
