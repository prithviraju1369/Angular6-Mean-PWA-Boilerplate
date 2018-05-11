import { NgModule } from '@angular/core';
import { Routes, RouterModule,PreloadAllModules } from '@angular/router';
import { ArticlesComponent } from "./articles.component";


const routes: Routes = [
  { path: "", component: ArticlesComponent },
  {
    path: "article/:id",
    loadChildren: "./../+article/article.module#ArticleModule"
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { useHash: true }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {} 