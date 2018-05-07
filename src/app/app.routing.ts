import { NgModule } from '@angular/core';
import { Routes, RouterModule,PreloadAllModules } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: '/articles', pathMatch: 'full' },
 { path: 'article/:id', loadChildren: './../+article/article.module#ArticleModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { useHash: true ,preloadingStrategy: PreloadAllModules }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {} 