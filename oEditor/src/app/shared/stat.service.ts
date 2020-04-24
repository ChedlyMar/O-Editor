import { Injectable } from '@angular/core';

import { IState } from './stat';
import { IArrow } from './arrow';

@Injectable({
  providedIn: 'root'
})
export class StateService {



  getStates(): IState[] {
    return [
      {
        "name":"First Stat",
        "positionX":250,
        "positionY":170  ,
        "width":100,
        "height":50,
        "accessNorthX":300,
        "accessNorthY":170,
        "accessSouthX":300,
        "accessSouthY":220,
        "accessEastX":350,
        "accessEastY":195,
        "accessWestX":250,
        "accessWestY":195,
        "centerX":300,
        "centerY":195,
        "translateX":0,
        "translateY":0
        
      },
      {
        "name":"Second Stat",
        "positionX":25,
        "positionY":340,
        "width":100,
        "height":50,
        "accessNorthX":75,
        "accessNorthY":340,
        "accessSouthX":75,
        "accessSouthY":390,
        "accessEastX":125,
        "accessEastY":365,
        "accessWestX":25,
        "accessWestY":365,
        "centerX":75,
        "centerY":365,
        "translateX":0,
        "translateY":0
        
      }
    ];
  }

  getArrow(): IArrow[]{
    return[    
      
    ];
  }

 

  getSingleStat(): IState {
    let myStat :IState ={
      "name":"First Stat",
      "positionX":100,
      "positionY":150,
      "width":100,
      "height":50,
      "accessNorthX":50,
      "accessNorthY":0,
      "accessSouthX":50,
      "accessSouthY":50,
      "accessEastX":100,
      "accessEastY":25,
      "accessWestX":0,
      "accessWestY":25      
    }; 
    return myStat; 
       
  }

  

}


