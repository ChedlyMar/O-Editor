import { NgModule } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';


const materials = [
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  
];

@NgModule({
  imports: [materials],
  exports:[materials]
})
export class MaterialModule { }
