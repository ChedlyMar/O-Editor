import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { ILine } from 'src/app/shared/line';

@Component({
  selector: '[app-line]',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.less']
})
export class LineComponent implements OnInit {

  @Input() line:ILine;

  startX: number;
  startY: number;
  endX: number;
  endY: number;

  constructor() { }

  ngOnInit(): void {
    this.startX = this.line.startX;
    this.startY = this.line.startY;
    this.endX = this.line.endX;
    this.endY = this.line.endY;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.startX = this.line.startX;
    this.startY = this.line.startY;
    this.endX = this.line.endX;
    this.endY = this.line.endY;
  }

}
