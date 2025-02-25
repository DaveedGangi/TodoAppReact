import {Component} from "react";
import AnimatedClock from "./components/animatedClock";
import "./App.css";
class App extends Component{

  state={tasks:[],newTask:"",editCondition:false,editIndex:null,animation:true}

  componentDidMount(){
    const tasksFromLocal=JSON.parse(localStorage.getItem("tasks"));
    if(tasksFromLocal){
      this.setState({tasks:tasksFromLocal});
    }
    setTimeout(()=>{
      this.setState({animation:false});
    },4000);
  }
  addTask=()=>{
    const{tasks,newTask,editCondition,editIndex}=this.state;
    if(newTask.length>0){
      const updatedTasks=[...tasks];
      const addingTaskData={
        id:tasks.length+1,
        name:newTask,
        completed:false
      }
    if(editCondition){
    
      
      updatedTasks[editIndex]=addingTaskData;
      this.setState({tasks:updatedTasks,editIndex:null,newTask:"",editCondition:!editCondition},()=> localStorage.setItem("tasks",JSON.stringify(this.state.tasks)));
      
    }else{
     
    this.setState({tasks:[...tasks,addingTaskData],newTask:""},()=> localStorage.setItem("tasks",JSON.stringify(this.state.tasks)));
    
    }
    }
  }

  handleText=(e)=>{
    this.setState({newTask:e.target.value});
  }
  deleteTask=(i)=>{
    const{tasks} =this.state;
    const filteredTasks=tasks.filter((each,index)=>{return index!==i})
    this.setState({tasks:filteredTasks,newTask:"",editCondition:false},()=>localStorage.setItem("tasks",JSON.stringify(this.state.tasks)));
    

  }
  editTask=(i)=>{
    const{tasks,editCondition}=this.state;
    
    this.setState({newTask:tasks[i].name,editCondition:!editCondition,editIndex:i});

  
  }
  completTask=(i)=>{
      const{tasks}=this.state;
      const updatedTasks=[...tasks];
      updatedTasks[i].completed=!updatedTasks[i].completed;
      this.setState({tasks:updatedTasks},()=>localStorage.setItem("tasks",JSON.stringify(this.state.tasks)));
      
  }
  render(){
    const{tasks,newTask,editCondition,animation}=this.state;
    return(
      <div className="App">
     
       {animation ?<AnimatedClock/>: 
        
        <div>
        
        <input value={newTask} onChange={this.handleText} type="text" placeholder="Write tasks"/>
        <button className={editCondition?"updateButton":"addButton"} onClick={this.addTask}>{editCondition?"Update":"Add"}</button>
        <br/>
      
        {
          tasks.map((each,i)=>{
            return <div className={each.completed?"true":"false"} key={i}><p>{each.name}</p>
            <button className="deleteButton" type="button" onClick={()=>this.deleteTask(i)}>Delete</button>
            &nbsp;<button className="editButton" type="button" onClick={()=>this.editTask(i)}>Edit</button>
            <input className="checkBox" type="checkbox" checked={each.completed} onChange={()=>this.completTask(i)} /></div>
          })
        }

        </div>

      }
      </div>
    )
  }
}

export default App;
