import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { IArrow } from 'src/app/shared/arrow';

@Component({
  selector: '[app-arrow]',
  templateUrl: './arrow.component.html',
  styleUrls: ['./arrow.component.less'],
})
export class ArrowComponent implements OnInit {

@Input() arrow:IArrow;
@Input() translationX:number=0;
@Input() translationY:number=0;

path:string;

  ngOnInit(): void {
  console.log(this.arrow);
  this.path = this.arrow.startX.toString() + "," + this.arrow.startY.toString() + " "
            +this.arrow.middleStartX.toString() + "," + this.arrow.middleStartY.toString()+" "
            +this.arrow.middleEndX.toString() + "," + this.arrow.middleEndY.toString()+" "
            +this.arrow.endX.toString() + "," + this.arrow.endY.toString();
  }

  
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if(this.arrow.traslationPoint === "start"){
      this.path = (this.arrow.startX + this.arrow.translationX).toString() + "," + (this.arrow.startY + this.arrow.translationY).toString() + " "
                + (this.arrow.middleStartX + this.arrow.translationX/2).toString() + "," + (this.arrow.middleStartY+ this.arrow.translationY).toString()+" "
                + (this.arrow.middleEndX + this.arrow.translationX/2).toString() + "," + this.arrow.middleEndY.toString()+" "
                + this.arrow.endX.toString() + "," + this.arrow.endY.toString();
      }

    
    
  }
   
    
}
