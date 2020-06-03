import { Component, OnInit,  } from '@angular/core';
import { IState } from '../shared/stat';
import { StateService } from '../shared/stat.service';
import { CdkDragMove } from '@angular/cdk/drag-drop';
import { IArrow } from '../shared/arrow';
import { fromEvent, Subscription } from 'rxjs'; 
import { ILine } from '../shared/line';


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

  myLines: ILine[];

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
  stateName: string = "";
  type:string="";
  fromState : boolean;

  preventSingleClick : boolean = false;
  draggedDisplaySideTools:boolean = false;
  finalPosition:boolean = true;
  subscribtion: Subscription;
  
  constructor(private stateService:StateService) { }

  ngOnInit(): void {
    this.myStates = this.stateService.getStates();
    this.myArrows = this.stateService.getArrow();
    this.myLines = this.stateService.getLine();
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
      "id":"Task_" + this.generateId(7),
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

  onNewArrowSideToolsRecived(state:IState){
    if(state.type != "final"){
      this.drawArrow = true;
      this.StartState = state;
      this.startArrow = true;
      this.endArrow = false;
      this.subscribtion = fromEvent(document.body, 'mousemove').subscribe((e: MouseEvent) => { 
        let line: ILine = new ILine;        
        this.setArea(state);
        if(this.getMouseArea((e.pageX - 150),(e.pageY  - 70))=== "North"){
          line.startX = state.accessNorthX + state.translateX;
          line.startY = state.accessNorthY + state.translateY;
          line.endX = e.pageX - 150;
          line.endY = e.pageY  - 70;
        }else{
          if(this.getMouseArea((e.pageX - 150),(e.pageY  - 70))=== "South"){
            line.startX = state.accessSouthX + state.translateX;
            line.startY = state.accessSouthY + state.translateY;
            line.endX = e.pageX - 150;
            line.endY = e.pageY  - 70;
          }else{
            if(this.getMouseArea((e.pageX - 150),(e.pageY  - 70))=== "East"){
              line.startX = state.accessEastX + state.translateX;
              line.startY = state.accessEastY + state.translateY;
              line.endX = e.pageX - 150;
              line.endY = e.pageY  - 70;
            }else{
              if(this.getMouseArea((e.pageX - 150),(e.pageY  - 70))=== "East"){
                line.startX = state.accessWestX + state.translateX;
                line.startY = state.accessWestY + state.translateY;
                line.endX = e.pageX - 150;
                line.endY = e.pageY  - 70;
              }
            }
          }
        }
        if(this.myLines.length){
          this.myLines.splice(0,1);
        }
        this.myLines.push(line);
        document.body.style.cursor = "not-allowed";
        this.myStates.forEach(state =>{
          if((e.pageX - 150) > (state.positionX + state.translateX) && (e.pageX - 150) < (state.positionX + 110 + state.translateX)
            && (e.pageY - 70) > (state.positionY + state.translateY) && (e.pageY - 70) < (state.positionY + 50 + state.translateY)
            && state.type != "start" && state.type != "freeFlow"){
              document.body.style.cursor = "default";
          }
        })
      });
    }    
  }

  onDeleteStateEventRecived(stateToDelete:IState){
    this.myStates.forEach((state, index) => {
      if(stateToDelete === state){
        for(let i=this.myArrows.length-1;i>=0;i--){
          let arrow = this.myArrows[i];
            if((arrow.startX === stateToDelete.accessNorthX && arrow.startY === stateToDelete.accessNorthY) ||
            (arrow.startX === stateToDelete.accessSouthX  && arrow.startY === stateToDelete.accessSouthY) ||
            (arrow.startX === stateToDelete.accessEastX  && arrow.startY  === stateToDelete.accessEastY) ||
            (arrow.startX === stateToDelete.accessWestX  && arrow.startY  === stateToDelete.accessWestY) || 
            (arrow.endX === stateToDelete.accessNorthX && arrow.endY === stateToDelete.accessNorthY) ||
            (arrow.endX === stateToDelete.accessSouthX  && arrow.endY === stateToDelete.accessSouthY) ||
            (arrow.endX === stateToDelete.accessEastX  && arrow.endY  === stateToDelete.accessEastY) ||
            (arrow.endX === stateToDelete.accessWestX  && arrow.endY  === stateToDelete.accessWestY)  ){
              this.myArrows.splice(i,1);
          }
        }
        this.myStates.splice(index,1);
      }
    })
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
    console.log(state.name + " clicked");
    
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
              this.subscribtion.unsubscribe();
              if(state.type != "start" && state.type != "freeFlow"){
                this.EndState = state;
                this.drawArrow= false;
                this.startArrow = false;
                this.endArrow = true;
                this.setArea(this.StartState);
                if(this.getMyArea(this.EndState) === "North"){
                  let newArrow : IArrow = {
                    "id": "SequenceFlow_" + this.generateId(7),
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
                    "id": "SequenceFlow_" + this.generateId(7),
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
                        "id": "SequenceFlow_" + this.generateId(7),
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
                          "id": "SequenceFlow_" + this.generateId(7),
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
   },200)
    
  }   

  onUpdateStateNameRecived(event:string){
    this.myStates.forEach(state => {
      if(state === this.stateNewName){
        state.name = event;
        this.stateName = event;
      }
      
    });
  }

  hideSideTools(){
    if(!this.fromState){
      this.displaySideTools = false;
      
    }
    setTimeout(()=>{
      if(this.subscribtion){
        this.subscribtion.unsubscribe();
        this.myLines.splice(0,1);
        this.drawArrow = false;
        this.startArrow = false;
        this.endArrow = true;
      }
      this.fromState = false;
      document.body.style.cursor = "default";
    },250)
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
        return "North";        
      }
      else{
        return "East";
      }
    }
    else{
      if((this.a2 * (stat.centerX + stat.translateX) + this.b2) > (stat.centerY + stat.translateY)){
        return "West";
      }
      else{
        return "South";
      }
    }
  }

  getMouseArea(x,y): string{ 
    if((this.a1 * x + this.b1) > y){
      if(this.a2 * x + this.b2 > y){
        return "North";        
      }
      else{
        return "East";
      }
    }
    else{
      if((this.a2 * x + this.b2) > y){
        return "West";
      }
      else{
        return "South";
      }
    }
  }
  
  setdefaultCursor(){
    document.body.style.cursor = "default";
    this.myLines.splice(0,1);
  }



  createXML(){
    //read xlm file
    var xmlDoc;
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "assets/file/bpmn.xml");    
    var a ="";
    
    
    xhttp.onload = () => {
      //convert  to xml
      let parser = new DOMParser();
      xmlDoc = parser.parseFromString(xhttp.response,"text/xml");  
      var x = xmlDoc.getElementsByTagName("bpmn:process")[0];

      
     let newTask;
      // dynamicly create element
      this.myStates.forEach(stat => {
        if(stat.type === "transition" || stat.type === "freeFlow"){
          // create element
          newTask = xmlDoc.createElement("bpmn:task");
        }
        if(stat.type === "start"){
          // create element          
          newTask = xmlDoc.createElement("bpmn:startEvent");
        }
        if(stat.type === "final"){
          // create element
          newTask = xmlDoc.createElement("bpmn:endEvent");
        }       
          //create state id, name + value
          let idAttribute = xmlDoc.createAttribute("id");
          idAttribute.nodeValue = stat.id;
          newTask.setAttributeNode(idAttribute);

          let nameAttribute = xmlDoc.createAttribute("name");
          nameAttribute.nodeValue = stat.name;
          newTask.setAttributeNode(nameAttribute);

          this.myArrows.forEach(arrow =>{
            if((arrow.startX === stat.accessNorthX && arrow.startY === stat.accessNorthY) || 
            (arrow.startX === stat.accessSouthX && arrow.startY === stat.accessSouthY) ||
            (arrow.startX === stat.accessEastX && arrow.startY === stat.accessEastY)||
            (arrow.startX === stat.accessWestX && arrow.startY === stat.accessWestY)){              
              // create arrow child elemnet
              let outGoingArrow = xmlDoc.createElement("bpmn:outgoing");
              newTask.appendChild(outGoingArrow);
              let idArrow = xmlDoc.createTextNode(arrow.id);
              outGoingArrow.appendChild(idArrow);

              this.myStates.forEach(endStat => {
                if((arrow.endX === endStat.accessNorthX && arrow.endY === endStat.accessNorthY) || 
                  (arrow.endX === endStat.accessSouthX && arrow.endY === endStat.accessSouthY) ||
                  (arrow.endX === endStat.accessEastX && arrow.endY === endStat.accessEastY)||
                  (arrow.endX === endStat.accessWestX && arrow.endY === endStat.accessWestY)){
                    // create newsequenceFlow                    
                    let newsequenceFlow = xmlDoc.createElement("bpmn:sequenceFlow");
                    //create attribute + value
                    let id = xmlDoc.createAttribute("id");
                    id.nodeValue = arrow.id;
                    newsequenceFlow.setAttributeNode(id)

                    let newsourceRef = xmlDoc.createAttribute("sourceRef");
                    newsourceRef.nodeValue = stat.name;
                    newsequenceFlow.setAttributeNode(newsourceRef);
                    
                    let newtargetRef = xmlDoc.createAttribute("targetRef");
                    newtargetRef.nodeValue = endStat.name;
                    newsequenceFlow.setAttributeNode(newtargetRef);
                    
                    x.appendChild(newsequenceFlow)
                  }
              })
            }
            
            if((arrow.endX === stat.accessNorthX && arrow.endY === stat.accessNorthY) || 
            (arrow.endX === stat.accessSouthX && arrow.endY === stat.accessSouthY) ||
            (arrow.endX === stat.accessEastX && arrow.endY === stat.accessEastY)||
            (arrow.endX === stat.accessWestX && arrow.endY === stat.accessWestY)){
              // create child elemnet
              let inCommingArrow = xmlDoc.createElement("bpmn:incoming");
              newTask.appendChild(inCommingArrow);
              let idArrow = xmlDoc.createTextNode(arrow.id);
              inCommingArrow.appendChild(idArrow);
            }
          })
          
          x.appendChild(newTask);
        }      
      )     
      console.log(x);  
      
    a = x;  
    };
    xhttp.send(a);
    let c=xmlDoc.documentElement;

    c.insert(a,c);
    
    
 }




 generateId(length) {
  var result           = '';
  var characters       = 'abcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


}
