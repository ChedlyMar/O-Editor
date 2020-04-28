import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

  constructor() {
    
    
  }
  ngOnInit(): void {
    if(this.state.type==="transition"){
      this.transition = true;
    }else{
      if(this.state.type === "freeFlow"){
        this.freeFlow = true;
      }else{
        this.final = true;
      }
    }    
  }    
}
