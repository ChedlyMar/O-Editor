import { Component, OnInit, ElementRef } from '@angular/core';
import { IStat } from '../shared/stat';
import { StatService } from '../shared/stat.service';
import { CdkDragMove } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.less']
})
export class StatsComponent implements OnInit {

  myStat:IStat;
  positionX:number;
  positionY:number;
  arrow = document.createElementNS("http://www.w3.org/2000/svg", "line");  
   
  constructor(private elRef:ElementRef,private statService:StatService) { }

  ngOnInit(): void {    
    this.myStat = this.statService.getSingleStat();
    this.positionX=this.myStat.positionX;
    this.positionY=this.myStat.positionY;
  }

  onDragEnded(event:CdkDragMove) {
    console.log(event.distance.x);
    this.positionX=this.positionX+event.distance.x;
    this.positionY=this.positionY+event.distance.y;
  }
  
  onDragMoved(event: CdkDragMove) {
    this.arrow.setAttributeNS(null,"x1", (this.positionX+event.distance.x).toString());
    this.arrow.setAttributeNS(null,"y1", (this.positionY+event.distance.y).toString());
  }
 
  addArrow(){    
    this.arrow.setAttributeNS(null,"x1", this.positionX.toString());
    this.arrow.setAttributeNS(null,"y1", this.positionY.toString());
    this.arrow.setAttributeNS(null,"x2","0");
    this.arrow.setAttributeNS(null,"y2", "0"); 
    this.arrow.setAttributeNS(null,"stroke", "black")
    
    document.getElementById("mysvg").appendChild(this.arrow);
  }

  
}
