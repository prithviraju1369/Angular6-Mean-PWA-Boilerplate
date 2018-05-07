import { NgModule } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";


@NgModule({
  imports: [MatButtonModule, MatInputModule],
  exports: [MatButtonModule, MatInputModule],
  providers: []
})
export class MaterialModule {}