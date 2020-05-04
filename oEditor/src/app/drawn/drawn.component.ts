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
  StartState : IState;
  EndState : IState;

  myArrows : IArrow[];

  stateNewName:IState;

  drawArrow = false;
  startArrow = false;
  endArrow = false;

  a1:number;
  b1:number;
  a2:number;
  b2:number;

  displaySideTools:boolean = false;
  changeName: boolean = false;
  type:string="";
  fromState : boolean;

  preventSingleClick : boolean = false;
  draggedDisplaySideTools:boolean = false;
  finalPosition:boolean = true;
  
  constructor(private stateService:StateService) { }

  ngOnInit(): void {
    this.myStates = this.stateService.getStates();
    this.myArrows = this.stateService.getArrow();
  }
  
  onNewStateEventRecived(stateParam:IState){   
    if(stateParam.type === "transitionSideTools"){
      this.type="transitionSideTools";
      stateParam.type = "transition";
    }
    if(stateParam.type === "finalSideTools"){
      this.type="finalSideTools";
      stateParam.type = "final";
    }
    let newState:IState = {
      "name":stateParam.name,
      "type":stateParam.type,
      "positionX":stateParam.positionX - 55,
      "positionY":stateParam.positionY - 25,
      "width":110,
      "height":50,
      "accessNorthX":stateParam.positionX,
      "accessNorthY":stateParam.positionY - 25,
      "accessSouthX":stateParam.positionX,
      "accessSouthY":stateParam.positionY + 25,
      "accessEastX":stateParam.positionX + 55,
      "accessEastY":stateParam.positionY,
      "accessWestX":stateParam.positionX - 55,
      "accessWestY":stateParam.positionY,
      "centerX":stateParam.positionX,
      "centerY":stateParam.positionY,
      "translateX":0,
      "translateY":0
    };
    this.myStates.push(newState);
    if(this.type === "transitionSideTools" || this.type === "finalSideTools"){
      let event : CdkDragMove;
      this.onStateSelected(event,newState);
    }
    this.finalPosition = false;    
  }
  
  onNewArrowEventRecived(event){
    this.drawArrow = true;   
  }

  onChangeNameSideToolsRecived(state: IState){
    this.updateStateName(state);
  }

  onNewArrowSideToolsRecived(state:IState){
    if(state.type != "final"){
      this.drawArrow = true;
      this.StartState = state;
      this.startArrow = true;
      this.endArrow = false;
    }    
  }

  onMouseDown(state:IState){
    this.finalPosition = true;    
  }

  updateStateName(state:IState){
    this.stateNewName = state;
    this.changeName = true;
    this.displaySideTools = false;
    this.preventSingleClick = true;
  }
  
  onDragMoved(event, state){ 
    this.draggedDisplaySideTools = true;
    this.displaySideTools = false;
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
                arrow.startX = state.accessSouthX ;
                arrow.startY = state.accessSouthY;
                arrow.endX = secondState.accessNorthX;
                arrow.endY = secondState.accessNorthY;
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
            if(secondState.accessEastX === arrow.endX && secondState.accessEastY === arrow.endY){
              this.setArea(state);
              if(this.getMyArea(secondState) === "South"){
                arrow.startX = state.accessSouthX ;
                arrow.startY = state.accessSouthY;
                arrow.endX = secondState.accessNorthX;
                arrow.endY = secondState.accessNorthY;
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

          this.myStates.forEach(secondState => {
            if(secondState.accessSouthX === arrow.startX && secondState.accessSouthY === arrow.startY){
              this.setArea(state);
              if(this.getMyArea(secondState) === "East"){
                arrow.startX = secondState.accessWestX;
                arrow.startY = secondState.accessWestY;
                arrow.endX =  state.accessEastX ;
                arrow.endY = state.accessEastY;
                arrow.traslationPoint = "horizontal"; 
              }
              if(this.getMyArea(secondState) === "West"){
                arrow.startX = secondState.accessEastX;
                arrow.startY = secondState.accessEastY;
                arrow.endX = state.accessWestX ;
                arrow.endY = state.accessWestY;
                arrow.traslationPoint = "horizontal"; 
              }
              if(this.getMyArea(secondState) === "South"){
                arrow.startX = secondState.accessNorthX ;
                arrow.startY = secondState.accessNorthY;
                arrow.endX = state.accessSouthX;
                arrow.endY = state.accessSouthY;
                arrow.traslationPoint = "vertical"; 
              }
            }
          })          
        } 

        if(arrow.endX === state.accessSouthX && arrow.endY === state.accessSouthY){
          arrow.traslationPoint = "vertical";
          arrow.endTranslationX = matrix.m41;
          arrow.endTranslationY = matrix.m42;

          this.myStates.forEach(secondState => {
            if(secondState.accessNorthX === arrow.startX && secondState.accessNorthY === arrow.startY){
              this.setArea(state);
              if(this.getMyArea(secondState) === "East"){
                arrow.startX = secondState.accessWestX;
                arrow.startY = secondState.accessWestY;
                arrow.endX =  state.accessEastX ;
                arrow.endY = state.accessEastY;
                arrow.traslationPoint = "horizontal"; 
              }
              if(this.getMyArea(secondState) === "West"){
                arrow.startX = secondState.accessEastX;
                arrow.startY = secondState.accessEastY;
                arrow.endX = state.accessWestX ;
                arrow.endY = state.accessWestY;
                arrow.traslationPoint = "horizontal"; 
              }
              if(this.getMyArea(secondState) === "North"){
                arrow.startX = secondState.accessSouthX ;
                arrow.startY = secondState.accessSouthY;
                arrow.endX = state.accessNorthX;
                arrow.endY = state.accessNorthY;
                arrow.traslationPoint = "vertical"; 
              }
            }
          })
        }

        if(arrow.endX === state.accessEastX && arrow.endY === state.accessEastY){
          arrow.traslationPoint = "horizontal";  
          arrow.endTranslationX = matrix.m41;
          arrow.endTranslationY = matrix.m42;

          this.myStates.forEach(secondState => {
            if(secondState.accessWestX === arrow.startX && secondState.accessWestY === arrow.startY){
              this.setArea(state);
              if(this.getMyArea(secondState) === "North"){
                arrow.startX = secondState.accessSouthX ;
                arrow.startY = secondState.accessSouthY;
                arrow.endX = state.accessNorthX;
                arrow.endY = state.accessNorthY;
                arrow.traslationPoint = "vertical"; 
              }
              if(this.getMyArea(secondState) === "West"){
                arrow.startX = secondState.accessEastX;
                arrow.startY = secondState.accessEastY;
                arrow.endX = state.accessWestX ;
                arrow.endY = state.accessWestY;
                arrow.traslationPoint = "horizontal"; 
              }
              if(this.getMyArea(secondState) === "South"){
                arrow.startX = secondState.accessNorthX ;
                arrow.startY = secondState.accessNorthY;
                arrow.endX = state.accessSouthX;
                arrow.endY = state.accessSouthY;
                arrow.traslationPoint = "vertical"; 
              }
            }
          })
        }
        
        if(arrow.endX === state.accessWestX && arrow.endY === state.accessWestY){
          arrow.traslationPoint = "horizontal";  
          arrow.endTranslationX = matrix.m41;
          arrow.endTranslationY = matrix.m42;

          this.myStates.forEach(secondState => {
            if(secondState.accessEastX === arrow.startX && secondState.accessEastY === arrow.startY){
              this.setArea(state);
              if(this.getMyArea(secondState) === "North"){
                arrow.startX = secondState.accessSouthX ;
                arrow.startY = secondState.accessSouthY;
                arrow.endX = state.accessNorthX;
                arrow.endY = state.accessNorthY;
                arrow.traslationPoint = "vertical"; 
              }
              if(this.getMyArea(secondState) === "East"){
                arrow.startX = secondState.accessWestX;
                arrow.startY = secondState.accessWestY;
                arrow.endX =  state.accessEastX ;
                arrow.endY = state.accessEastY;
                arrow.traslationPoint = "horizontal"; 
              }
              if(this.getMyArea(secondState) === "South"){
                arrow.startX = secondState.accessNorthX ;
                arrow.startY = secondState.accessNorthY;
                arrow.endX = state.accessSouthX;
                arrow.endY = state.accessSouthY;
                arrow.traslationPoint = "vertical"; 
              }
            }
          })
        }               
      })
    }    
  }

  onStateSelected(event:CdkDragMove,state:IState){     
    this.preventSingleClick = false;
    setTimeout(()=>{
      if(!this.preventSingleClick){
        if(this.drawArrow){     
          this.displaySideTools = false;
        
          if(!this.startArrow ){
            if(state.type != "final"){
              this.StartState = state;
              this.startArrow = true;
              this.endArrow = false;
            }
          }
          else{
            if(!this.endArrow && this.StartState != state){
              if(state.type != "start" && state.type != "freeFlow"){
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
        else{
          this.changeName = false;
          this.stateNewName = state;
          if(!this.draggedDisplaySideTools){
            this.displaySideTools = true;
            this.fromState = true;
          }
          this.draggedDisplaySideTools = false;
          this.fromState = false;
        }
      }
   },250)
    
  }   

  hideSideTools(){
    if(!this.fromState){
      this.displaySideTools = false;
    }
    this.fromState = false;
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
