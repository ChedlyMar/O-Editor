import { Injectable } from '@angular/core';

import { IStat } from './stat';
import { IArrow } from './arrow';

@Injectable({
  providedIn: 'root'
})
export class StatService {



  getStat(): IStat[] {
    return [
      {
        "name":"First Stat",
        "positionX":250,
        "positionY":170,
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
        
      },
      {
        "name":"Second Stat",
        "positionX":25,
        "positionY":342,
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
      }
    ];
  }

  getArrow(): IArrow[]{
    return[
      {
        "startX":150,
        "startY":150,
        "endX":250,
        "endY":250
      },
      {
        "startX":350,
        "startY":50,
        "endX":250,
        "endY":250
      }
    ];
  }

 

  getSingleStat(): IStat {
    let myStat :IStat ={
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


