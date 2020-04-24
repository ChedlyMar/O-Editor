import { Component, OnInit, Input } from '@angular/core';
import { IState } from 'src/app/shared/stat';

@Component({
  selector: '[app-rectangle]',
  templateUrl: './rectangle.component.html',
  styleUrls: ['./rectangle.component.less']
})
export class RectangleComponent implements OnInit {
  
  @Input() state:IState;

  a1:number;
  b1:number;
  a2:number;
  b2:number;
  
  constructor() {
    
  }
  ngOnInit(): void {
  }  
/*
  setArea(){
    this.a1 = (this.state.positionY - this.state.centerY)/(this.state.positionX-this.state.centerX);
    this.b1 = this.state.positionY - this.a1 * this.state.positionX;
    this.b1 = this.state.centerY - this.a1 * this.state.centerX;
    this.a2 = (this.state.positionY - this.state.centerY)/((this.state.positionX + this.state.width)-this.state.centerX);
    this.b2 = this.state.centerY - this.a2 * this.state.centerX;
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
  }*/
}
