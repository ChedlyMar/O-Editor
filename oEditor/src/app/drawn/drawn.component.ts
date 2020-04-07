import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-drawn',
  templateUrl: './drawn.component.html',
  styleUrls: ['./drawn.component.less']
})
export class DrawnComponent implements OnInit {

  x1:number;
  y1:number;
  x2:number;
  y2:number;

  constructor() { }

  ngOnInit(): void {
    this.x1=5;
    this.y1=35;
    this.x2=50;
    this.y2=205;
  }

  addStat(){
    console.log("add works");
    
  }

  linkStats(){
    console.log("link works");
    
  }
  

}
