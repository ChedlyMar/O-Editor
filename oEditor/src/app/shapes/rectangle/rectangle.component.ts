import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { IState } from 'src/app/shared/stat';

@Component({
  selector: '[app-rectangle]',
  templateUrl: './rectangle.component.html',
  styleUrls: ['./rectangle.component.less']
})
export class RectangleComponent implements OnInit {
  
  @Input() state:IState;
  @Input() translation:number;
  transition:boolean = false;
  freeFlow:boolean = false;
  final:boolean = false;
  start:boolean = false;

  tspan1:string = "";
  tspan2:string = "";
  tspan3:string = "";


  constructor() {
    
    
  }
  ngOnInit(): void {
    if(this.state.type==="transition"){
      this.transition = true;
    }else{
      if(this.state.type === "freeFlow"){
        this.freeFlow = true;
      }else{
        if(this.state.type === "final"){
          this.final = true;
        }else{
          this.start = true;
        }
      }
    }    
    if(this.state.name.length <= 12){
      this.tspan1 = this.state.name;
    }else{
      for(let i=0; i<this.state.name.length; i++){
        if(this.state.name[i] === " " || i === (this.state.name.length-1)){
          if(i <= 12){
            this.tspan1 = this.state.name.slice(0,i);
          }
          else{
            if((i - this.tspan1.length) <= 12){
              this.tspan2 = this.state.name.slice(this.tspan1.length, i);
            }else{
              this.tspan3 = this.state.name.slice(this.tspan1.length + this.tspan2.length, i)
            }
          }
        }
      }      
    }
    if(this.tspan2 === ""){
      this.tspan2 = this.tspan1;
      this.tspan1 = ""
    }    
  }    
  
}
