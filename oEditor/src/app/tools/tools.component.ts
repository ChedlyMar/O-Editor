import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IState } from '../shared/stat';


@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.less']
})
export class ToolsComponent implements OnInit {

  @Output() addNewStateEvent :EventEmitter<IState> = new EventEmitter<IState>(); 
  @Output() addNewArrowEvent :EventEmitter<DragEvent> = new EventEmitter<DragEvent>(); 
  myState:boolean = false;
  stateParm:IState = new IState;

  constructor() { }

  ngOnInit(): void {

  } 

  selectRect(event:DragEvent){
    this.myState = true;        
    document.getElementById("state").style.left = (event.clientX - 50).toString() + "px";
    document.getElementById("state").style.top = (event.clientY - 25).toString() + "px";
    document.getElementById("state").style.display = "block";    
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
    this.stateParm.name = document.getElementById("state").innerText;
    this.addNewStateEvent.emit(this.stateParm);        
    document.getElementById("state").style.display="none";
    document.getElementById("stateName").innerText = "";
  }

  selectArrow(event:DragEvent){
    this.addNewArrowEvent.emit(event);
  }
}
