import { Component, OnInit } from '@angular/core';
import { IState } from '../shared/stat';
import { StateService } from '../shared/stat.service';
import { CdkDragMove, CdkDragStart } from '@angular/cdk/drag-drop';
import { IArrow } from '../shared/arrow';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.less']
})
export class StatsComponent implements OnInit {

  fisrstStat:IState;
  secondStat:IState;

  myStat:IState[];
  myArrow:IArrow;
  arrow = document.createElementNS("http://www.w3.org/2000/svg", "polyline");  
  newArrow = document.createElementNS("http://www.w3.org/2000/svg", "line");
  
  a1:number;
  b1:number;
  a2:number;
  b2:number;

  arrowStartPoint = false;
  arrowEndtPoint = false;

  vertical = false;

  constructor(private statService:StateService) { }

  ngOnInit(): void {    
    this.myStat = this.statService.getStates();
    this.myArrow=this.statService.getArrow()[0];

    this.fisrstStat = this.statService.getStates()[0];
    this.secondStat = this.statService.getStates()[1];
  }
  
  onDragStart(event:CdkDragMove){
  }

  onDragMoved(event: CdkDragMove,state:IState) {  
    let element = event.source.getRootElement();
    let style = window.getComputedStyle(element);
    let matrix = new WebKitCSSMatrix(style.webkitTransform);
    //translateX: matrix.m41
    //translateY: matrix.m42
    if(state.name===this.fisrstStat.name){
      this.fisrstStat.positionX = state.positionX + matrix.m41;
      this.fisrstStat.positionY = state.positionY + matrix.m42;
      this.fisrstStat.centerX = state.centerX + matrix.m41; 
      this.fisrstStat.centerY = state.centerY + matrix.m42;
      
      this.fisrstStat.accessNorthX = state.accessNorthX + matrix.m41;
      this.fisrstStat.accessNorthY = state.accessNorthY + matrix.m42;      
      this.fisrstStat.accessSouthX = state.accessSouthX + matrix.m41;
      this.fisrstStat.accessSouthY = state.accessSouthY + matrix.m42;      
      this.fisrstStat.accessEastX = state.accessEastX + matrix.m41;
      this.fisrstStat.accessEastY = state.accessEastY + matrix.m42;      
      this.fisrstStat.accessWestX = state.accessWestX + matrix.m41;
      this.fisrstStat.accessWestY = state.accessWestY + matrix.m42;
      
      this.setArea(this.fisrstStat);
      this.newArrow.setAttributeNS(null,"x1", (this.myStat[0].accessWestX + matrix.m41).toString());
      this.newArrow.setAttributeNS(null,"y1", (this.myStat[0].accessWestY +matrix.m42).toString());

      this.setArrowPoints(this.fisrstStat);
    }
    else{
      this.secondStat.positionX = state.positionX + matrix.m41;
      this.secondStat.positionY = state.positionY + matrix.m42;

      this.secondStat.centerX = state.centerX + matrix.m41; 
      this.secondStat.centerY = state.centerY + matrix.m42;
      
      this.secondStat.accessNorthX = state.accessNorthX + matrix.m41;
      this.secondStat.accessNorthY = state.accessNorthY + matrix.m42;      
      this.secondStat.accessSouthX = state.accessSouthX + matrix.m41;
      this.secondStat.accessSouthY = state.accessSouthY + matrix.m42;      
      this.secondStat.accessEastX = state.accessEastX + matrix.m41;
      this.secondStat.accessEastY = state.accessEastY + matrix.m42;      
      this.secondStat.accessWestX = state.accessWestX + matrix.m41;
      this.secondStat.accessWestY = state.accessWestY + matrix.m42;

      let myArea = this.getMyArea(this.secondStat);
      if(myArea === "North"){
        this.newArrow.setAttributeNS(null,"x1", (this.fisrstStat.accessNorthX).toString());
        this.newArrow.setAttributeNS(null,"y1", (this.fisrstStat.accessNorthY).toString());

        this.newArrow.setAttributeNS(null,"x2", this.secondStat.accessSouthX.toString());
        this.newArrow.setAttributeNS(null,"y2", (this.secondStat.accessSouthY).toString());
        this.newArrow.setAttributeNS(null,"stroke", "black");
        //document.getElementById("mysvg").appendChild(this.newArrow);

        this.vertical = true; 
        this.addArrow(this.fisrstStat.accessNorthX,
                      this.fisrstStat.accessNorthY,
                      this.secondStat.accessSouthX,
                      this.secondStat.accessSouthY
        );
      }
      if(myArea === "South"){
        this.newArrow.setAttributeNS(null,"x1", (this.fisrstStat.accessSouthX).toString());
        this.newArrow.setAttributeNS(null,"y1", (this.fisrstStat.accessSouthY).toString());

        this.newArrow.setAttributeNS(null,"x2", this.secondStat.accessNorthX.toString());
        this.newArrow.setAttributeNS(null,"y2", (this.secondStat.accessNorthY).toString());
        this.newArrow.setAttributeNS(null,"stroke", "black");
        //document.getElementById("mysvg").appendChild(this.newArrow);

        this.vertical = true;
        this.addArrow(this.fisrstStat.accessSouthX,
          this.fisrstStat.accessSouthY,
          this.secondStat.accessNorthX,
          this.secondStat.accessNorthY);
      }
      if(myArea === "East"){
        this.newArrow.setAttributeNS(null,"x1", (this.fisrstStat.accessEastX).toString());
        this.newArrow.setAttributeNS(null,"y1", (this.fisrstStat.accessEastY).toString());

        this.newArrow.setAttributeNS(null,"x2", this.secondStat.accessWestX.toString());
        this.newArrow.setAttributeNS(null,"y2", (this.secondStat.accessWestY).toString());
        this.newArrow.setAttributeNS(null,"stroke", "black");
        //document.getElementById("mysvg").appendChild(this.newArrow);

        this.vertical = false;
        this.addArrow(this.fisrstStat.accessEastX,
          this.fisrstStat.accessEastY,
          this.secondStat.accessWestX,
          this.secondStat.accessWestY);
      }
      if(myArea === "West"){
        this.newArrow.setAttributeNS(null,"x1", (this.fisrstStat.accessWestX).toString());
        this.newArrow.setAttributeNS(null,"y1", (this.fisrstStat.accessWestY).toString());

        this.newArrow.setAttributeNS(null,"x2", this.secondStat.accessEastX.toString());
        this.newArrow.setAttributeNS(null,"y2", (this.secondStat.accessEastY).toString());
        this.newArrow.setAttributeNS(null,"stroke", "black");
        //document.getElementById("mysvg").appendChild(this.newArrow);

        this.vertical = false;
        this.addArrow(this.fisrstStat.accessWestX,
          this.fisrstStat.accessWestY,
          this.secondStat.accessEastX,
          this.secondStat.accessEastY);
      }
    }
  }

  onDragEnded(event:CdkDragMove,state:IState) {      
  }
 
  addArrow(x1:number, y1:number, x2:number, y2:number){
    let path:string="";
    //path = "00,120 20,60 40,120 60,10";
    if(this.vertical){
    path = x1.toString() + "," + y1.toString() + " "
            +x1.toString() + "," + ((y2+y1)/2).toString()+" "
            +x2.toString() + "," + ((y2+y1)/2).toString()+" "
            +x2.toString() + "," + y2.toString();
    }
    else{
      path = x1.toString() + "," + y1.toString() + " "
            +((x1+x2)/2).toString() + "," + y1.toString()+" "
            +((x1+x2)/2).toString() + "," + y2.toString()+" "
            +x2.toString() + "," + y2.toString();
    }

    this.arrow.setAttributeNS(null, 'points', path);
    this.arrow.setAttributeNS(null, "fill", "none");
    this.arrow.setAttributeNS(null,"stroke", "black");
    document.getElementById("mysvg").appendChild(this.arrow);
  }

  addArrowStep(){
    this.arrowStartPoint = true;
  }

  setArrowPoints(state:IState){    
    if(this.arrowEndtPoint && !this.arrowStartPoint){
      let myArea = this.getMyArea(this.secondStat);
      if(myArea === "North"){
        this.newArrow.setAttributeNS(null,"x1", (this.fisrstStat.accessNorthX).toString());
        this.newArrow.setAttributeNS(null,"y1", (this.fisrstStat.accessNorthY).toString());

        this.newArrow.setAttributeNS(null,"x2", this.secondStat.accessSouthX.toString());
        this.newArrow.setAttributeNS(null,"y2", (this.secondStat.accessSouthY).toString());
        this.newArrow.setAttributeNS(null,"stroke", "black");
        //document.getElementById("mysvg").appendChild(this.newArrow);
        this.vertical = true; 
        this.addArrow(this.fisrstStat.accessNorthX,
                      this.fisrstStat.accessNorthY,
                      this.secondStat.accessSouthX,
                      this.secondStat.accessSouthY
        );
      }
      if(myArea === "South"){
        this.newArrow.setAttributeNS(null,"x1", (this.fisrstStat.accessSouthX).toString());
        this.newArrow.setAttributeNS(null,"y1", (this.fisrstStat.accessSouthY).toString());

        this.newArrow.setAttributeNS(null,"x2", this.secondStat.accessNorthX.toString());
        this.newArrow.setAttributeNS(null,"y2", (this.secondStat.accessNorthY).toString());
        this.newArrow.setAttributeNS(null,"stroke", "black");
        //document.getElementById("mysvg").appendChild(this.newArrow);
        
        this.vertical = true;
        this.addArrow(this.fisrstStat.accessSouthX,
          this.fisrstStat.accessSouthY,
          this.secondStat.accessNorthX,
          this.secondStat.accessNorthY);
      }
      if(myArea === "East"){
        this.newArrow.setAttributeNS(null,"x1", (this.fisrstStat.accessEastX).toString());
        this.newArrow.setAttributeNS(null,"y1", (this.fisrstStat.accessEastY).toString());

        this.newArrow.setAttributeNS(null,"x2", this.secondStat.accessWestX.toString());
        this.newArrow.setAttributeNS(null,"y2", (this.secondStat.accessWestY).toString());
        this.newArrow.setAttributeNS(null,"stroke", "black");
        //document.getElementById("mysvg").appendChild(this.newArrow);

        this.vertical = false;
        this.addArrow(this.fisrstStat.accessEastX,
          this.fisrstStat.accessEastY,
          this.secondStat.accessWestX,
          this.secondStat.accessWestY);
      }
      if(myArea === "West"){
        this.newArrow.setAttributeNS(null,"x1", (this.fisrstStat.accessWestX).toString());
        this.newArrow.setAttributeNS(null,"y1", (this.fisrstStat.accessWestY).toString());

        this.newArrow.setAttributeNS(null,"x2", this.secondStat.accessEastX.toString());
        this.newArrow.setAttributeNS(null,"y2", (this.secondStat.accessEastY).toString());
        this.newArrow.setAttributeNS(null,"stroke", "black");
        //document.getElementById("mysvg").appendChild(this.newArrow);

        this.vertical = false;
        this.addArrow(this.fisrstStat.accessWestX,
          this.fisrstStat.accessWestY,
          this.secondStat.accessEastX,
          this.secondStat.accessEastY);
      }
      this.arrowEndtPoint = false;
      this.arrowStartPoint = false;
    
    }
    if(this.arrowStartPoint){
      this.newArrow.setAttributeNS(null,"x1", this.fisrstStat.accessWestX.toString());
      this.newArrow.setAttributeNS(null,"y1", this.fisrstStat.accessWestY.toString());
      this.arrowStartPoint = false;
      this.arrowEndtPoint = true;
      this.setArea(this.fisrstStat)
    }
  }  
    
  setArea(stat:IState){
    if(stat.name=== this.fisrstStat.name){
      this.a1 = (this.fisrstStat.positionY - this.fisrstStat.centerY)/(this.fisrstStat.positionX-this.fisrstStat.centerX);
      this.b1 = this.fisrstStat.positionY - this.a1 * this.fisrstStat.positionX;
      this.b1 = this.fisrstStat.centerY - this.a1 * this.fisrstStat.centerX;
      this.a2 = (this.fisrstStat.positionY - this.fisrstStat.centerY)/((this.fisrstStat.positionX + this.fisrstStat.width)-this.fisrstStat.centerX);
      this.b2 = this.fisrstStat.centerY - this.a2 * this.fisrstStat.centerX;
    }
    else{
      this.a1 = (this.secondStat.positionY - this.secondStat.centerY)/(this.secondStat.positionX-this.secondStat.centerX);
      this.b1 = this.secondStat.positionY - this.a1 * this.secondStat.positionX;
      this.a2 = (this.secondStat.positionY - this.secondStat.centerY)/((this.secondStat.positionX + this.secondStat.width)-this.secondStat.centerX);
      this.b2 = this.secondStat.centerY - this.a2 * this.secondStat.centerX;
    }     
    // test (x,y) if f(x) < y => (x,y) is in the superior area
    //            if f(x) > y => (x,y) is un the inferior area  
  }

  getMyArea(stat:IState): string{ 
    if((this.a1 * stat.centerX + this.b1) > stat.centerY){
      if(this.a2 * stat.centerX + this.b2 > stat.centerY){
        console.log("I am in the North Area");
        return "North";        
      }
      else{
        console.log("I am in the East Area");
        return "East"
      }
    }
    else{
      if((this.a2 * stat.centerX + this.b2) > stat.centerY){
        console.log("I am in the West Area");        
        return "West";
      }
      else{
        console.log("I am in the South Area");
        return "South";
      }
    }
  }

  getArea(event:MouseEvent): string{ 
    if((this.a1*event.offsetX + this.b1) > event.offsetY){
      if(this.a2*event.offsetX + this.b2 > event.offsetY){
        console.log("I am in the North Area");
        return "North";        
      }
      else{
        console.log("I am in the East Area");
        return "East"
      }
    }
    else{
      if((this.a2*event.offsetX + this.b2) > event.offsetY){
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