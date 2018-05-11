import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// index module bootstrapping
@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: []
})
export class ArticlesModule {}