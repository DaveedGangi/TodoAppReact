import {Component} from "react";
import "./index.css";
class AnimatedClock extends Component{

    state={time:new Date()};

    componentDidMount(){
        this.timer=setInterval(()=>{
            this.setState({time:new Date()});
        },1000)
    }
    componentWillUnmount(){
        clearInterval(this.timer);
    }
    render(){
        const {time}=this.state;
       
        const seconds=time.getSeconds();
        const minutes=time.getMinutes()+seconds/60;
        const hours=time.getHours()%12+minutes/60;

        return(
            <div className="clock-container">
             
            <div className="clock">
           
              <div
                className="hand hour-hand"
                style={{ transform: `rotate(${hours * 30}deg)` }}
              />
              <div
                className="hand minute-hand"
                style={{ transform: `rotate(${minutes * 6}deg)` }}
              />
              <div
                className="hand second-hand"
                style={{ transform: `rotate(${seconds * 6}deg)` }}
              />
              <div className="center-dot" />
            </div>
          </div>

        )
    }
}

export default AnimatedClock;