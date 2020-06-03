import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { ClickOutsideModule } from 'ng-click-outside';

import { DrawnComponent } from './drawn/drawn.component';
import { StatsComponent } from './stats/stats.component';
import { ToolsComponent } from './tools/tools.component';
//import { ClickOutsideDirective } from './click-outside/click-outside.directive';
import { ArrowComponent } from './shapes/arrow/arrow.component';
import { RectangleComponent } from './shapes/rectangle/rectangle.component';
import { FormComponent } from './form/form.component';
import { MaterialModule } from './material/material.module';
import { LineComponent } from './shapes/line/line.component';



@NgModule({
  declarations: [
    AppComponent,
    DrawnComponent,
    StatsComponent,
    ToolsComponent,
    ArrowComponent,
    RectangleComponent,    
    FormComponent, LineComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    ClickOutsideModule,
    MaterialModule,
    

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
