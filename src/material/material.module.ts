import { NgModule } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";


@NgModule({
  imports: [MatButtonModule, MatInputModule, MatListModule],
  exports: [MatButtonModule, MatInputModule, MatListModule],
  providers: []
})
export class MaterialModule {}