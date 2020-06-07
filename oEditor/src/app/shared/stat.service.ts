import { Injectable } from '@angular/core';
import { IState } from './stat';
import { IArrow } from './arrow';
import { ILine } from './line';
import { HttpClient, HttpHeaders, HttpHeaderResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(private http: HttpClient){}

  getStates(): IState[] {
    return [
      {
        "id":"StartEvent_1",
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

  getProcess(){
  }
  

}


