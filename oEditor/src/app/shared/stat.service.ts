import { Injectable } from '@angular/core';
import { IState } from './stat';
import { IArrow } from './arrow';
import { ILine } from './line';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  getStates(): IState[] {
    return [
      {
        "name":"Start",
        "type":"start",
        "positionX":200,
        "positionY":170  ,
        "width":110,
        "height":50,
        "accessNorthX":255,
        "accessNorthY":170,
        "accessSouthX":255,
        "accessSouthY":220,
        "accessEastX":310,
        "accessEastY":195,
        "accessWestX":200,
        "accessWestY":195,
        "centerX":255,
        "centerY":195,
        "translateX":0,
        "translateY":0        
      },
    ];
  }

  getArrow(): IArrow[]{
    return[    
      
    ];    
  }

  getLine(): ILine[]{
    return[    
      
    ];
  }

  

}


