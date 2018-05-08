import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { ArticleComponent }   from './article.component';

const routes: Routes = [{ path: "", component: ArticleComponent }];

// index module bootstrapping
@NgModule({
    imports: [RouterModule.forChild(routes)],
    declarations: [ArticleComponent]
})
export class ArticleModule { }