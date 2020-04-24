import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { DrawnComponent } from './drawn/drawn.component';
import { StatsComponent } from './stats/stats.component';
import { ToolsComponent } from './tools/tools.component';
import { ArrowComponent } from './shapes/arrow/arrow.component';
import { RectangleComponent } from './shapes/rectangle/rectangle.component';

@NgModule({
  declarations: [
    AppComponent,
    DrawnComponent,
    StatsComponent,
    ToolsComponent,
    ArrowComponent,
    RectangleComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
