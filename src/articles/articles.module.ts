import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { ArticlesComponent }   from './articles.component';
import { MaterialModule } from "./../material/material.module";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
const routes: Routes = [{ path: "articles", component: ArticlesComponent }];

// index module bootstrapping
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    MaterialModule,
    CommonModule,
    FormsModule
  ],
  declarations: [ArticlesComponent]
})
export class ArticlesModule {}