import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { IArrow } from 'src/app/shared/arrow';

@Component({
  selector: '[app-arrow]',
  templateUrl: './arrow.component.html',
  styleUrls: ['./arrow.component.less'],
})
export class ArrowComponent implements OnInit {

@Input() arrow:IArrow;
@Input() translation:number=0;

path:string;

  ngOnInit(): void {
    console.log(this.arrow);
    if(this.arrow.traslationPoint === "vertical"){
      this.path = (this.arrow.startX + this.arrow.startTranslationX).toString() + "," + (this.arrow.startY + this.arrow.startTranslationY).toString() + " "
              + (this.arrow.startX + this.arrow.startTranslationX).toString() + "," + ((this.arrow.startY + this.arrow.startTranslationY + this.arrow.endY + this.arrow.endTranslationY)/2).toString() + " "
              + (this.arrow.endX + this.arrow.endTranslationX).toString() + "," + ((this.arrow.startY + this.arrow.startTranslationY + this.arrow.endY + this.arrow.endTranslationY)/2).toString() + " "
              + (this.arrow.endX + this.arrow.endTranslationX).toString() + "," + (this.arrow.endY + this.arrow.endTranslationY).toString();
    }
    if(this.arrow.traslationPoint ==="horizontal"){
      this.path = (this.arrow.startX + this.arrow.startTranslationX).toString() + "," + (this.arrow.startY + this.arrow.startTranslationY).toString() + " "
              + ((this.arrow.startX + this.arrow.startTranslationX + this.arrow.endX + this.arrow.endTranslationX)/2).toString() + "," + (this.arrow.startY + this.arrow.startTranslationY).toString() + " "
              + ((this.arrow.startX + this.arrow.startTranslationX + this.arrow.endX + this.arrow.endTranslationX)/2).toString() + "," + (this.arrow.endY + this.arrow.endTranslationY).toString() + " "
              + (this.arrow.endX + this.arrow.endTranslationX).toString() + "," + (this.arrow.endY + this.arrow.endTranslationY).toString();
    }
  }
 
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if(this.arrow.traslationPoint === "vertical"){
      this.path = (this.arrow.startX + this.arrow.startTranslationX).toString() + "," + (this.arrow.startY + this.arrow.startTranslationY).toString() + " "
              + (this.arrow.startX + this.arrow.startTranslationX).toString() + "," + ((this.arrow.startY + this.arrow.startTranslationY + this.arrow.endY + this.arrow.endTranslationY)/2).toString() + " "
              + (this.arrow.endX + this.arrow.endTranslationX).toString() + "," + ((this.arrow.startY + this.arrow.startTranslationY + this.arrow.endY + this.arrow.endTranslationY)/2).toString() + " "
              + (this.arrow.endX + this.arrow.endTranslationX).toString() + "," + (this.arrow.endY + this.arrow.endTranslationY).toString();
    }
    if(this.arrow.traslationPoint ==="horizontal"){
      this.path = (this.arrow.startX + this.arrow.startTranslationX).toString() + "," + (this.arrow.startY + this.arrow.startTranslationY).toString() + " "
              + ((this.arrow.startX + this.arrow.startTranslationX + this.arrow.endX + this.arrow.endTranslationX)/2).toString() + "," + (this.arrow.startY + this.arrow.startTranslationY).toString() + " "
              + ((this.arrow.startX + this.arrow.startTranslationX + this.arrow.endX + this.arrow.endTranslationX)/2).toString() + "," + (this.arrow.endY + this.arrow.endTranslationY).toString() + " "
              + (this.arrow.endX + this.arrow.endTranslationX).toString() + "," + (this.arrow.endY + this.arrow.endTranslationY).toString();
    }
  }
}
