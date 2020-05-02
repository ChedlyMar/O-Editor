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
  @Output() addNewArrowSideToolsEvent :EventEmitter<IState> = new EventEmitter<IState>(); 
  @Output() changeNameSideToolsEvent :EventEmitter<IState> = new EventEmitter<IState>();
  
  @Input() stateNewName:IState;
  @Input() didplaySideTools:boolean;
  @Input() changeName:boolean;

  myState:boolean = false;
  stateParm:IState = new IState;
  type:string;
  create:boolean = false;
  //update:boolean = false;


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
    this.stateParm.positionY = event.clientY - 70;
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
      this.updateStateName(this.stateNewName);
    }    
    this.create = false;
  }

  updateStateName(state:IState){
    state.name = document.getElementById("stateName").innerText;
    document.getElementById("state").style.display="none";
  }

  selectArrow(event:DragEvent){
    this.addNewArrowEvent.emit(event);
      
  } 
  selectArrowSideTools(event:DragEvent){   
    this.addNewArrowSideToolsEvent.emit(this.stateNewName);
  }

  changeNameSideTools(){
    this.changeNameSideToolsEvent.emit(this.stateNewName);
  }

  changeStateName(state:IState){
    
    document.getElementById("state").style.display = "block"; 
    document.getElementById("state").style.left = (state.positionX + state.translateX).toString() + "px";
    document.getElementById("state").style.top = (state.positionY + state.translateY + 70).toString() + "px";
    document.getElementById("stateName").innerText = this.stateNewName.name;
    document.getElementById("stateName").focus();
    document.getElementById("sideTools").style.display = "none";
    if(state.type=="transition"){
      document.getElementById("stateName").style.backgroundColor = "#039be5";
    }else{
      if(this.stateNewName.type === "freeFlow"){
        document.getElementById("stateName").style.backgroundColor = "#fca91a";
      }else{
        document.getElementById("stateName").style.backgroundColor = "#009035";
      }
    } 
  }

  onClickedOutsideSideTools($event){
    if(!this.didplaySideTools){
    document.getElementById("sideTools").style.display = "none";
    }
  }
  

  

  ngOnChanges(changes: SimpleChanges) {    
    if(this.changeName){
      this.changeStateName(this.stateNewName);    
      this.changeName = false;
    }else{
      if(this.didplaySideTools ){
        document.getElementById("sideTools").style.left = (this.stateNewName.positionX + this.stateNewName.translateX + 105).toString() + "px";
        document.getElementById("sideTools").style.top = (this.stateNewName.positionY + this.stateNewName.translateY + 70).toString() + "px";
        document.getElementById("sideTools").style.display = "block";
      }else{
        if(!this.didplaySideTools){
          //document.getElementById("sideTools").style.display = "none";
        }
      }
    }
  }
}
