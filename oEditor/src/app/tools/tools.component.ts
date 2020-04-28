import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { IState } from '../shared/stat';
import { StateService } from '../shared/stat.service';


@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.less']
})
export class ToolsComponent implements OnInit {

  @Output() addNewStateEvent :EventEmitter<IState> = new EventEmitter<IState>(); 
  @Output() updateStateNameEvent :EventEmitter<string> = new EventEmitter<string>(); 
  @Output() addNewArrowEvent :EventEmitter<DragEvent> = new EventEmitter<DragEvent>(); 
  
  @Input() stateNewName:IState;

  myState:boolean = false;
  stateParm:IState = new IState;
  type:string;
  create:boolean = false;
  update:boolean = false;

  constructor(private stateService:StateService) { }

  ngOnInit(): void {

  } 

  createTransition(event:DragEvent, type:string){
    this.create = true;
    this.myState = true;        
    this.type = type;
    document.getElementById("state").style.left = (event.clientX - 50).toString() + "px";
    document.getElementById("state").style.top = (event.clientY - 25).toString() + "px";
    document.getElementById("state").style.display = "block";    
    document.getElementById("stateName").innerText = "";
    if(type=="transition"){
      document.getElementById("stateName").style.backgroundColor = "#039be5";
    }else{
      if(type === "freeFlow"){
        document.getElementById("stateName").style.backgroundColor = "#fca91a";
      }else{
        let finalExist = false;
        this.stateService.getStates().forEach(state =>{
          if(state.type === "final"){
            finalExist = true;
          }
        });
        if(!finalExist){
          document.getElementById("stateName").style.backgroundColor = "#009035";
        }else{
          document.getElementById("state").style.display = "none";
        }
      }
    }    
  }

  followCursor(event:MouseEvent){    
    if(this.myState){
      document.getElementById("state").style.left = (event.clientX - 50).toString() + "px";
      document.getElementById("state").style.top = (event.clientY - 25).toString() + "px";        
    }
  }
 
  stopFollowCursor(event){
    this.myState = false;
    this.stateParm.positionX = event.clientX;
    this.stateParm.positionY = event.clientY;
  }

  createState(){
    if(this.create === true){
      this.stateParm.name = document.getElementById("state").innerText;
      this.stateParm.type = this.type;
      this.addNewStateEvent.emit(this.stateParm);        
      document.getElementById("state").style.display="none";
      document.getElementById("stateName").innerText = "";
    }
    else{
      this.updateStateName();
    }    
    this.create = false;
  }

  updateStateName(){
    this.stateNewName.name = document.getElementById("stateName").innerText;
    document.getElementById("state").style.display="none";
  }

  selectArrow(event:DragEvent){
    this.addNewArrowEvent.emit(event);
  }

  ngOnChanges(changes: SimpleChanges) {
    document.getElementById("state").style.display = "block"; 
    if(this.stateNewName){
      document.getElementById("state").style.left = (this.stateNewName.positionX + this.stateNewName.translateX).toString() + "px";
      document.getElementById("state").style.top = (this.stateNewName.positionY + this.stateNewName.translateY).toString() + "px";
      document.getElementById("stateName").innerText = this.stateNewName.name;
      if(this.stateNewName.type=="transition"){
        document.getElementById("stateName").style.backgroundColor = "#039be5";
      }else{
        if(this.stateNewName.type === "freeFlow"){
          document.getElementById("stateName").style.backgroundColor = "#fca91a";
        }else{
          document.getElementById("stateName").style.backgroundColor = "#009035";
        }
      } 
    }
  }
}
