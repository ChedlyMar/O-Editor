import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { IState } from '../shared/stat';
import { StateService } from '../shared/stat.service';
import { fromEvent, Subscription } from 'rxjs'; 


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
  @Output() deleteStateEvent :EventEmitter<IState> = new EventEmitter<IState>(); 
  
  @Input() stateNewName:IState;
  @Input() displaySideTools:boolean ;
  @Input() changeName:boolean;

  myState:boolean = false;
  stateParm:IState = new IState;
  type:string;
  create:boolean = false;
  notStart:boolean = true;
  finalExist = false;

  subscribtion: Subscription;

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

    if(type === "transition" || type==="transitionSideTools"){
      document.getElementById("stateName").style.backgroundColor = "#039be5";

    }else{
      if(type === "freeFlow" || type === "freeFlowSideTools"){
        document.getElementById("stateName").style.backgroundColor = "#fca91a";
        //document.body.style.cursor = 'url(assets/images/blue.png) 60 25,auto';
      }else{
        
        this.stateService.getStates().forEach(state =>{
          if(state.type === "final"){
            this.finalExist = true;         
          }
        });
        if(!this.finalExist){
          document.getElementById("stateName").style.backgroundColor = "#009035";
          
        }else{
          document.getElementById("state").style.display = "none";
          
        }
      }
    }    
  }
  
  followCursor(event:MouseEvent){    
    
    if(this.myState){
      this.subscribtion = fromEvent(document.body, 'mousemove').subscribe((e: MouseEvent) => { 
        if(this.myState){
          document.getElementById("state").style.left = (e.clientX - 55).toString() + "px";
          document.getElementById("state").style.top = (e.clientY - 25).toString() + "px";        
        }
        if(e.clientX < 147 || e.clientY < 70){
          document.body.style.cursor = "not-allowed"
        }
        else{
          document.body.style.cursor = "default"
        }
      },
      
      );
    }
  }
 
  stopFollowCursor(event){
    this.myState = false;
    this.subscribtion.unsubscribe()
    this.stateParm.positionX = event.clientX - 148;
    this.stateParm.positionY = event.clientY - 70;
  }

  createState(){
    if(this.create === true){
      if(this.type === "transitionSideTools" || this.type === "finalSideTools"){
        this.addNewArrowSideToolsEvent.emit(this.stateNewName);
      }
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
    this.updateStateNameEvent.emit(state.name);
  }

  selectArrow(event:DragEvent){
    this.addNewArrowEvent.emit(event);
      
  } 

  selectArrowSideTools(event:DragEvent){   
    this.addNewArrowSideToolsEvent.emit(this.stateNewName);
  }

  changeNameSideTools(event){
    this.changeNameSideToolsEvent.emit(this.stateNewName);
  }

  changeStateName(state:IState){
    
    document.getElementById("state").style.display = "block"; 
    document.getElementById("state").style.left = (state.positionX + state.translateX + 153).toString() + "px";
    document.getElementById("state").style.top = (state.positionY + state.translateY + 71).toString() + "px";
    document.getElementById("stateName").innerText = this.stateNewName.name;
    document.getElementById("stateName").focus();
    
    document.getElementById("sideTools").style.display = "none";
    if(state.type=="transition"){
      document.getElementById("stateName").style.backgroundColor = "#fcfcfc";      
    }else{
      if(this.stateNewName.type === "freeFlow"){
        document.getElementById("stateName").style.backgroundColor = "#fcfcfc";
      }else{
        if(this.stateNewName.type === "final"){
        document.getElementById("stateName").style.backgroundColor = "#fcfcfc";
        }else{
          document.getElementById("stateName").style.backgroundColor = "#fcfcfc";
        }
      }
    } 
  }

  deleteState(){
    this.deleteStateEvent.emit(this.stateNewName);    
    document.getElementById("sideTools").style.display = "none";
  }  
 
  startDragTransition(event:DragEvent, type:string){
    if(type === "transition"){
      this.create = true;
      this.myState = true;        
      this.type = type;
      document.getElementById("state").style.left = (event.clientX - 50).toString() + "px";
      document.getElementById("state").style.top = (event.clientY - 25).toString() + "px";
      document.getElementById("state").style.display = "block";    
      document.getElementById("stateName").innerText = "";
      document.getElementById("stateName").style.backgroundColor = "#039be5";
    }
    if(type === "freeFlow"){
      this.create = true;
      this.myState = true;        
      this.type = type;
      document.getElementById("state").style.left = (event.clientX - 50).toString() + "px";
      document.getElementById("state").style.top = (event.clientY - 25).toString() + "px";
      document.getElementById("state").style.display = "block";    
      document.getElementById("stateName").innerText = "";
      document.getElementById("stateName").style.backgroundColor = "#fca91a";
    }
    if(type === "final"){
      this.create = true;
      this.myState = true;        
      this.type = type;
      document.getElementById("state").style.left = (event.clientX - 50).toString() + "px";
      document.getElementById("state").style.top = (event.clientY - 25).toString() + "px";
      document.getElementById("state").style.display = "block";    
      document.getElementById("stateName").innerText = "";
      document.getElementById("stateName").style.backgroundColor = "#009035";
    }
  }

  close(){
    if(document.body.style.cursor === 'url(assets/images/blue.png) 60 25,auto'){
      console.log("hi");
      
    }
    document.body.style.cursor = "default";
  }

  mouseUp(event:MouseEvent){
    if(event.clientX > 148 && event.clientY > 70){
      
      document.getElementById("stateName").focus();    
      this.stateParm.positionX = event.clientX - 148;
      this.stateParm.positionY = event.clientY - 70;    
    }
    else{
      document.getElementById("state").style.display = "none"; 
    }
    this.myState = false;
    this.subscribtion.unsubscribe();
    
  }

  
  ngOnChanges(changes: SimpleChanges) {    
    if(this.changeName){
      this.changeStateName(this.stateNewName);    
      //this.changeName = false;
    }else{
      if(this.displaySideTools ){
        document.getElementById("sideTools").style.left = (this.stateNewName.positionX + this.stateNewName.translateX + 265).toString() + "px";
        document.getElementById("sideTools").style.top = (this.stateNewName.positionY + this.stateNewName.translateY + 70).toString() + "px";
        document.getElementById("sideTools").style.display = "block";
        if(this.stateNewName.type === "start"){
          this.notStart = false;
        }else{
          this.notStart = true;
        }
      }else{
        if(!this.displaySideTools){
          document.getElementById("sideTools").style.display = "none";
        }
      }
    }
  }
}
