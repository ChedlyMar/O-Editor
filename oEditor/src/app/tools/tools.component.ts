import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RectangleComponent } from '../shapes/rectangle/rectangle.component';


@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.less']
})
export class ToolsComponent implements OnInit {

  @Output() addNewStateEvent :EventEmitter<DragEvent> = new EventEmitter<DragEvent>(); 
  @Output() addNewArrowEvent :EventEmitter<DragEvent> = new EventEmitter<DragEvent>(); 

  constructor() { }

  ngOnInit(): void {

  } 

  selectRect(event:DragEvent){
    this.addNewStateEvent.emit(event);
  }

  selectArrow(event:DragEvent){
    this.addNewArrowEvent.emit(event);
  }

}
