import { Component, OnInit } from "@angular/core";
import { ArticleService } from "./article.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { Observable } from "rxjs";
import { switchMap } from "rxjs/operators";
declare var PouchDB: any;

@Component({
  selector: "article",
  templateUrl: "./article.component.html",
  styleUrls: ["./article.component.scss"]
})
export class ArticleComponent implements OnInit {
  id;
  article={
    title:'',
    description:''
  };
  pouchInstance: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _articleService: ArticleService
  ) {
    if (window.indexedDB) {
      this.pouchInstance = new PouchDB("meanboiler");
    }
  }
  ngOnInit(){
    let question = this.route.paramMap.pipe(switchMap(
        (params: ParamMap) => {
          this.id = params.get("id");
          return this._articleService.getArticle(this.id);
        }
      ));
    question.subscribe(c => {
        this.article = c;
      }, err => {
        let self= this;
        if (!self.pouchInstance) return;
        this.pouchInstance
          .get("articles")
          .then(function(doc) {
            self.article = doc.val.find(function(element: any) {
              if (element._id == self.id) return element;
            });
          })
          .then(function(response) {})
          .catch(function(err) {
            console.log(err);
          });
      });
  }
}
