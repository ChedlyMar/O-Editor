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
      "positionX":e.clientX - 50,
      "positionY":e.clientY - 25,
      "width":100,
      "height":50,
      "accessNorthX":e.clientX,
      "accessNorthY":e.clientY - 25,
      "accessSouthX":e.clientX,
      "accessSouthY":e.clientY + 25,
      "accessEastX":e.clientX + 50,
      "accessEastY":e.clientY,
      "accessWestX":e.clientX - 50,
      "accessWestY":e.clientY,
      "centerX":e.clientX,
      "centerY":e.clientX,
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

  onDragMoved(event, state){ 
    let element = event.source.getRootElement();
    let style = window.getComputedStyle(element);
    let matrix = new WebKitCSSMatrix(style.webkitTransform);
    state.translateX = matrix.m41;
    state.translateY = matrix.m42; 
    
    if(this.myArrows.length){
      this.myArrows.forEach(arrow => {
        if(arrow.startX  === state.accessNorthX  && arrow.startY === state.accessNorthY){
          arrow.traslationPoint = "vertical";  
          arrow.startTranslationX = matrix.m41;
          arrow.startTranslationY = matrix.m42;

          this.myStates.forEach(secondState => {
            if(secondState.accessSouthX === arrow.endX && secondState.accessSouthY === arrow.endY){
              this.setArea(state);
              if(this.getMyArea(secondState) === "East"){
                arrow.startX = state.accessEastX ;
                arrow.startY = state.accessEastY;
                arrow.endX = secondState.accessWestX;
                arrow.endY = secondState.accessWestY;
                arrow.traslationPoint = "horizontal"; 
              }
              if(this.getMyArea(secondState) === "West"){
                arrow.startX = state.accessWestX ;
                arrow.startY = state.accessWestY;
                arrow.endX = secondState.accessEastX;
                arrow.endY = secondState.accessEastY;
                arrow.traslationPoint = "horizontal"; 
              }
              if(this.getMyArea(secondState) === "South"){
                arrow.startX = state.accessSouthX ;
                arrow.startY = state.accessSouthY;
                arrow.endX = secondState.accessNorthX;
                arrow.endY = secondState.accessNorthY;
                arrow.traslationPoint = "vertical"; 
              }
            }
          })
        } 
        if(arrow.startX === state.accessSouthX && arrow.startY === state.accessSouthY){
          arrow.traslationPoint = "vertical";
          arrow.startTranslationX = matrix.m41;
          arrow.startTranslationY = matrix.m42;  
          this.myStates.forEach(secondState => {
            if(secondState.accessNorthX === arrow.endX && secondState.accessNorthY === arrow.endY){
              this.setArea(state);
              if(this.getMyArea(secondState) === "East"){
                arrow.startX = state.accessEastX ;
                arrow.startY = state.accessEastY;
                arrow.endX = secondState.accessWestX;
                arrow.endY = secondState.accessWestY;
                arrow.traslationPoint = "horizontal"; 
              }
              if(this.getMyArea(secondState) === "West"){
                arrow.startX = state.accessWestX ;
                arrow.startY = state.accessWestY;
                arrow.endX = secondState.accessEastX;
                arrow.endY = secondState.accessEastY;
                arrow.traslationPoint = "horizontal"; 
              }
              if(this.getMyArea(secondState) === "North"){
                arrow.startX = state.accessNorthX ;
                arrow.startY = state.accessNorthY;
                arrow.endX = secondState.accessSouthX;
                arrow.endY = secondState.accessSouthY;
                arrow.traslationPoint = "vertical"; 
              }
            }
          })
        }
        if(arrow.startX === state.accessEastX && arrow.startY === state.accessEastY){
          arrow.traslationPoint = "horizontal";  
          arrow.startTranslationX = matrix.m41;
          arrow.startTranslationY = matrix.m42;  

          this.myStates.forEach(secondState => {
            if(secondState.accessWestX === arrow.endX && secondState.accessWestY === arrow.endY){
              this.setArea(state);
              if(this.getMyArea(secondState) === "South"){
                arrow.startX = state.accessSouhX ;
                arrow.startY = state.accessSouthY;
                arrow.endX = secondState.accessWestX;
                arrow.endY = secondState.accessWestY;
                arrow.traslationPoint = "vertical"; 
              }
              if(this.getMyArea(secondState) === "West"){
                arrow.startX = state.accessWestX ;
                arrow.startY = state.accessWestY;
                arrow.endX = secondState.accessEastX;
                arrow.endY = secondState.accessEastY;
                arrow.traslationPoint = "horizontal"; 
              }
              if(this.getMyArea(secondState) === "North"){
                arrow.startX = state.accessNorthX ;
                arrow.startY = state.accessNorthY;
                arrow.endX = secondState.accessSouthX;
                arrow.endY = secondState.accessSouthY;
                arrow.traslationPoint = "vertical"; 
              }
            }
          })
        }
      
    
        if(arrow.startX === state.accessWestX && arrow.startY === state.accessWestY){
          arrow.traslationPoint = "horizontal";  
          arrow.startTranslationX = matrix.m41;
          arrow.startTranslationY = matrix.m42;  

          this.myStates.forEach(secondState => {
            if(secondState.accessWestX === arrow.endX && secondState.accessWestY === arrow.endY){
              this.setArea(state);
              if(this.getMyArea(secondState) === "South"){
                arrow.startX = state.accessSouhX ;
                arrow.startY = state.accessSouthY;
                arrow.endX = secondState.accessWestX;
                arrow.endY = secondState.accessWestY;
                arrow.traslationPoint = "vertical"; 
              }
              if(this.getMyArea(secondState) === "East"){
                arrow.startX = state.accessEastX ;
                arrow.startY = state.accessEastY;
                arrow.endX = secondState.accessWestX;
                arrow.endY = secondState.accessWestY;
                arrow.traslationPoint = "horizontal"; 
              }
              if(this.getMyArea(secondState) === "North"){
                arrow.startX = state.accessNorthX ;
                arrow.startY = state.accessNorthY;
                arrow.endX = secondState.accessSouthX;
                arrow.endY = secondState.accessSouthY;
                arrow.traslationPoint = "vertical"; 
              }
            }
          })
        }











        if(arrow.endX === state.accessNorthX && arrow.endY === state.accessNorthY){
          arrow.traslationPoint = "vertical";  
          arrow.endTranslationX = matrix.m41;
          arrow.endTranslationY = matrix.m42;
        } 
        if(arrow.endX === state.accessSouthX && arrow.endY === state.accessSouthY){
          arrow.traslationPoint = "vertical";
          arrow.endTranslationX = matrix.m41;
          arrow.endTranslationY = matrix.m42;
        }
        if(arrow.endX === state.accessEastX && arrow.endY === state.accessEastY){
          arrow.traslationPoint = "horizontal";  
          arrow.endTranslationX = matrix.m41;
          arrow.endTranslationY = matrix.m42;
        }
        if(arrow.endX === state.accessWestX && arrow.endY === state.accessWestY){
          arrow.traslationPoint = "horizontal";  
          arrow.endTranslationX = matrix.m41;
          arrow.endTranslationY = matrix.m42;
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
             "startX":this.StartState.accessNorthX,
              "startY":this.StartState.accessNorthY,
              "endX":this.EndState.accessSouthX,
              "endY":this.EndState.accessSouthY,
              "startTranslationX": this.StartState.translateX,
              "startTranslationY":this.StartState.translateY,
              "endTranslationX":this.EndState.translateX,
              "endTranslationY":this.EndState.translateY,
              "traslationPoint": "vertical",            
            }
            this.myArrows.push(newArrow)
          }else{
            if(this.getMyArea(this.EndState) === "South"){
              let newArrow : IArrow = {
               "startX":this.StartState.accessSouthX,
                "startY":this.StartState.accessSouthY,
                "endX":this.EndState.accessNorthX,
                "endY":this.EndState.accessNorthY,
                "startTranslationX": this.StartState.translateX,
                "startTranslationY":this.StartState.translateY,
                "endTranslationX":this.EndState.translateX,
                "endTranslationY":this.EndState.translateY,
                "traslationPoint": "vertical",      
              }
              this.myArrows.push(newArrow)
            }else{
              if(this.getMyArea(this.EndState) === "East"){
                let newArrow : IArrow = {
                 "startX":this.StartState.accessEastX,
                  "startY":this.StartState.accessEastY ,
                  "endX":this.EndState.accessWestX,
                  "endY":this.EndState.accessWestY,
                  "startTranslationX": this.StartState.translateX,
                  "startTranslationY":this.StartState.translateY,
                  "endTranslationX":this.EndState.translateX,
                  "endTranslationY":this.EndState.translateY,
                  "traslationPoint": "horizontal",      
                }
                this.myArrows.push(newArrow)
              }else{
                if(this.getMyArea(this.EndState) === "West"){
                  let newArrow : IArrow = {
                   "startX":this.StartState.accessWestX,
                    "startY":this.StartState.accessWestY,
                    "endX":this.EndState.accessEastX,
                    "endY":this.EndState.accessEastY,
                    "startTranslationX": this.StartState.translateX,
                    "startTranslationY":this.StartState.translateY,
                    "endTranslationX":this.EndState.translateX,
                    "endTranslationY":this.EndState.translateY,
                    "traslationPoint": "horizontal",      
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
