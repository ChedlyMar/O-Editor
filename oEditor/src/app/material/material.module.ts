import { NgModule } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


const materials = [
  MatFormFieldModule,
  MatInputModule
];

@NgModule({
  imports: [materials],
  exports:[materials]
})
export class MaterialModule { }
