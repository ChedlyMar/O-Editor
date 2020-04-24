import { Component, OnInit,  } from '@angular/core';
import { IState } from '../shared/stat';
import { StateService } from '../shared/stat.service';
import { CdkDragMove } from '@angular/cdk/drag-drop';
import { IArrow } from '../shared/arrow';

@Component({
  selector: 'app-drawn',
  templateUrl: './drawn.component.html',
  styleUrls: ['./drawn.component.less']
})

export class DrawnComponent implements OnInit {

  myStates : IState[];
  newState = false;
  StartState : IState;
  EndState : IState;

  myArrows : IArrow[];
  newArrow = false;

  drawArrow = false;
  startArrow = false;
  endArrow = false;

  a1:number;
  b1:number;
  a2:number;
  b2:number;

  linkedArrow:IArrow[] = [];
  
  constructor(private stateService:StateService) { }

  ngOnInit(): void {
    this.myStates = this.stateService.getStates();
    this.myArrows = this.stateService.getArrow();
  }
  
  onNewStateEventRecived(e){   
    
    let newState:IState = {
      "name":"new state",
      "positionX":e.clientX,
      "positionY":e.clientY,
      "width":100,
      "height":50,
      "accessNorthX":300,
      "accessNorthY":170,
      "accessSouthX":300,
      "accessSouthY":220,
      "accessEastX":350,
      "accessEastY":195,
      "accessWestX":250,
      "accessWestY":195,
      "centerX":300,
      "centerY":195,
      "translateX":0,
      "translateY":0
    };
    this.myStates.push(newState);   
  }

  onNewArrowEventRecived(event){
    this.drawArrow = true;   
  }

  onMouseDown(state:IState){
    
  }

  onDragMoved(event,state){ 
    let element = event.source.getRootElement();
    let style = window.getComputedStyle(element);
    let matrix = new WebKitCSSMatrix(style.webkitTransform);
    state.translateX = matrix.m41;
    state.translateY = matrix.m42; 
    
    if(this.myArrows.length){
      this.myArrows.forEach(arrow => {
        if(arrow.startX === state.accessNorthX && arrow.startY === state.accessNorthY ||
          arrow.startX === state.accessSouthX && arrow.startY === state.accessSouthY ||
          arrow.startX === state.accessEastX && arrow.startY === state.accessEastY ||
          arrow.startX === state.accessWestX && arrow.startY === state.accessWestY ){
          arrow.translationX = matrix.m41;
          arrow.translationY = matrix.m42;     
          arrow.traslationPoint = "start";  
        } 
      })
    }
    
  }

  onStateSelected(event:CdkDragMove,state){     
    if(this.drawArrow){
      if(!this.startArrow){
        this.StartState = state;
        this.startArrow = true;
        this.endArrow = false;
      }
      else{
        if(!this.endArrow){
          this.EndState = state;
          this.drawArrow= false;
          this.startArrow = false;
          this.endArrow = true;
          this.setArea(this.StartState);
          if(this.getMyArea(this.EndState) === "North"){
            let newArrow : IArrow = {
             "startX":this.StartState.accessNorthX + this.StartState.translateX,
              "startY":this.StartState.accessNorthY + this.StartState.translateY,
              "endX":this.EndState.accessSouthX + this.EndState.translateX,
              "endY":this.EndState.accessSouthY + this.EndState.translateY,
              "middleStartX":this.StartState.accessNorthX + this.StartState.translateX,
              "middleStartY":(this.StartState.accessNorthY + this.StartState.translateY + this.EndState.accessSouthY + this.EndState.translateY)/2,
              "middleEndX":this.EndState.accessSouthX + this.EndState.translateX,
              "middleEndY":(this.StartState.accessNorthY + this.StartState.translateY + this.EndState.accessSouthY + this.EndState.translateY)/2,
            }
            this.myArrows.push(newArrow)
          }else{
            if(this.getMyArea(this.EndState) === "South"){
              let newArrow : IArrow = {
               "startX":this.StartState.accessSouthX + this.StartState.translateX,
                "startY":this.StartState.accessSouthY + this.StartState.translateY,
                "endX":this.EndState.accessNorthX + this.EndState.translateX,
                "endY":this.EndState.accessNorthY + this.EndState.translateY,
                "middleStartX":this.StartState.accessSouthX + this.StartState.translateX,
                "middleStartY":(this.StartState.accessSouthY + this.StartState.translateY + this.EndState.accessNorthY + this.EndState.translateY)/2,
                "middleEndX":this.EndState.accessNorthX + this.EndState.translateX,
                "middleEndY":(this.StartState.accessSouthY + this.StartState.translateY + this.EndState.accessNorthY + this.EndState.translateY)/2,
              }
              this.myArrows.push(newArrow)
            }else{
              if(this.getMyArea(this.EndState) === "East"){
                let newArrow : IArrow = {
                 "startX":this.StartState.accessEastX + this.StartState.translateX,
                  "startY":this.StartState.accessEastY + this.StartState.translateY,
                  "endX":this.EndState.accessWestX + this.EndState.translateX,
                  "endY":this.EndState.accessWestY + this.EndState.translateY,
                  "middleStartX":(this.StartState.accessEastX + this.StartState.translateX + this.EndState.accessWestX + this.EndState.translateX)/2,
                  "middleStartY":this.StartState.accessEastY + this.StartState.translateY,
                  "middleEndX":(this.StartState.accessEastX + this.StartState.translateX + this.EndState.accessWestX + this.EndState.translateX)/2,
                  "middleEndY":this.EndState.accessWestY + this.EndState.translateY
                }
                this.myArrows.push(newArrow)
              }else{
                if(this.getMyArea(this.EndState) === "West"){
                  let newArrow : IArrow = {
                   "startX":this.StartState.accessWestX + this.StartState.translateX,
                    "startY":this.StartState.accessWestY + this.StartState.translateY,
                    "endX":this.EndState.accessEastX + this.EndState.translateX,
                    "endY":this.EndState.accessEastY + this.EndState.translateY,
                    "middleStartX":(this.StartState.accessWestX + this.StartState.translateX + this.EndState.accessEastX + this.EndState.translateX)/2,
                    "middleStartY":this.StartState.accessWestY + this.StartState.translateY,
                    "middleEndX":(this.StartState.accessWestX + this.StartState.translateX + this.EndState.accessEastX + this.EndState.translateX)/2,
                    "middleEndY":this.EndState.accessEastY + this.EndState.translateY
                  }
                  this.myArrows.push(newArrow)
                }
              }
            }
          }

        }
      }
    }
  } 

  setArea(state:IState){
    this.a1 = (state.positionY - state.centerY) / (state.positionX - state.centerX);
    this.b1 = (state.positionY + state.translateY) - this.a1 * (state.positionX + state.translateX);
    this.b1 = (state.centerY + state.translateY) - this.a1 * (state.centerX + state.translateX);
    this.a2 = (state.positionY - state.centerY) / ((state.positionX + state.width) - state.centerX);
    this.b2 = (state.centerY + state.translateY) - this.a2 * (state.centerX + state.translateX);
  }

  getMyArea(stat:IState): string{ 
    if((this.a1 * (stat.centerX + stat.translateX) + this.b1) > (stat.centerY + stat.translateY)){
      if(this.a2 * (stat.centerX + stat.translateX) + this.b2 > (stat.centerY + stat.translateY)){
        console.log("I am in the North Area");
        return "North";        
      }
      else{
        console.log("I am in the East Area");
        return "East"
      }
    }
    else{
      if((this.a2 * (stat.centerX + stat.translateX) + this.b2) > (stat.centerY + stat.translateY)){
        console.log("I am in the West Area");        
        return "West";
      }
      else{
        console.log("I am in the South Area");
        return "South";
      }
    }
  }
}
