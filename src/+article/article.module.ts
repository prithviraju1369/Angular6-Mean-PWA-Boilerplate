import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { ArticleComponent }   from './article.component';
import { ArticleService } from "./article.service";

const routes: Routes = [{ path: "", component: ArticleComponent }];

// index module bootstrapping
@NgModule({
    imports: [RouterModule.forChild(routes)],
    declarations: [ArticleComponent],
    providers:[ArticleService]
})
export class ArticleModule { }