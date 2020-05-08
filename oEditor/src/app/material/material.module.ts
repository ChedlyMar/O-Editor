import { NgModule } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';


const materials = [
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
];

@NgModule({
  imports: [materials],
  exports:[materials]
})
export class MaterialModule { }
