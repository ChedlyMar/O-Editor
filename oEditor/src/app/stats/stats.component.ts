import { Component, OnInit } from '@angular/core';
import { IStat } from '../shared/stat';
import { StatService } from '../shared/stat.service';
import { CdkDragMove, CdkDragStart } from '@angular/cdk/drag-drop';
import { IArrow } from '../shared/arrow';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.less']
})
export class StatsComponent implements OnInit {

  fisrstStat:IStat;
  secondStat:IStat;

  myStat:IStat[];
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

  constructor(private statService:StatService) { }

  ngOnInit(): void {    
    this.myStat = this.statService.getStat();
    this.myArrow=this.statService.getArrow()[0];

    this.fisrstStat = this.statService.getStat()[0];
    this.secondStat = this.statService.getStat()[1];
  }
  
  onDragStart(event:CdkDragMove){
  }

  onDragMoved(event: CdkDragMove,stat:IStat) {  
    let element = event.source.getRootElement();
    let style = window.getComputedStyle(element);
    let matrix = new WebKitCSSMatrix(style.webkitTransform);
    //translateX: matrix.m41
    //translateY: matrix.m42
    if(stat.name===this.fisrstStat.name){
      this.fisrstStat.positionX = stat.positionX + matrix.m41;
      this.fisrstStat.positionY = stat.positionY + matrix.m42;
      this.fisrstStat.centerX = stat.centerX + matrix.m41; 
      this.fisrstStat.centerY = stat.centerY + matrix.m42;
      
      this.fisrstStat.accessNorthX = stat.accessNorthX + matrix.m41;
      this.fisrstStat.accessNorthY = stat.accessNorthY + matrix.m42;      
      this.fisrstStat.accessSouthX = stat.accessSouthX + matrix.m41;
      this.fisrstStat.accessSouthY = stat.accessSouthY + matrix.m42;      
      this.fisrstStat.accessEastX = stat.accessEastX + matrix.m41;
      this.fisrstStat.accessEastY = stat.accessEastY + matrix.m42;      
      this.fisrstStat.accessWestX = stat.accessWestX + matrix.m41;
      this.fisrstStat.accessWestY = stat.accessWestY + matrix.m42;
      
      this.setArea(this.fisrstStat);
      this.newArrow.setAttributeNS(null,"x1", (this.myStat[0].accessWestX + matrix.m41).toString());
      this.newArrow.setAttributeNS(null,"y1", (this.myStat[0].accessWestY +matrix.m42).toString());

      this.setArrowPoints(this.fisrstStat);
    }
    else{
      this.secondStat.positionX = stat.positionX + matrix.m41;
      this.secondStat.positionY = stat.positionY + matrix.m42;

      this.secondStat.centerX = stat.centerX + matrix.m41; 
      this.secondStat.centerY = stat.centerY + matrix.m42;
      
      this.secondStat.accessNorthX = stat.accessNorthX + matrix.m41;
      this.secondStat.accessNorthY = stat.accessNorthY + matrix.m42;      
      this.secondStat.accessSouthX = stat.accessSouthX + matrix.m41;
      this.secondStat.accessSouthY = stat.accessSouthY + matrix.m42;      
      this.secondStat.accessEastX = stat.accessEastX + matrix.m41;
      this.secondStat.accessEastY = stat.accessEastY + matrix.m42;      
      this.secondStat.accessWestX = stat.accessWestX + matrix.m41;
      this.secondStat.accessWestY = stat.accessWestY + matrix.m42;

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

  onDragEnded(event:CdkDragMove,stat:IStat) {      
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

  setArrowPoints(stat:IStat){    
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
    
  setArea(stat:IStat){
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

  getMyArea(stat:IStat): string{ 
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