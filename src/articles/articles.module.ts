import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { ArticlesComponent }   from './articles.component';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
const routes: Routes = [{ path: "articles", component: ArticlesComponent }];

// index module bootstrapping
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule
  ],
  declarations: [ArticlesComponent]
})
export class ArticlesModule {}