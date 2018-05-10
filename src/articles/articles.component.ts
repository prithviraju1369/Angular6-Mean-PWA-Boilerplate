import { Component } from "@angular/core";
import { ArticlesService } from "./articles.service";

declare var PouchDB: any;

@Component({
  selector: "article",
  templateUrl: "./articles.component.html",
  styleUrls: ["./articles.component.scss"]
})
export class ArticlesComponent {
  title = "";
  description = "";
  articles: Array<any>;
  pouchInstance: any;
  constructor(private _articlesService: ArticlesService) {
    this.getArticles();
    if(window.indexedDB){
      this.pouchInstance = new PouchDB("meanboiler");
    }    
  }
  getArticles() {
    let self=this;
    this._articlesService.getAllArticles().subscribe(x => {
      if(x && x.length>0){
        self.articles = x;
        self.addToLocalDB("articles", self.articles);
      }
    },(err)=>{
      if(!self.pouchInstance) return;
            self.pouchInstance
              .get("articles")
              .then(function(doc) {
                self.articles = doc.val;
              })
              .then(function(response) {})
              .catch(function(err) {
                console.log(err);
              });
        });
  }
  addToLocalDB(id, val) {
    if (val && val.length > 0) {
      let self = this;
      let msg = "";
      if(!self.pouchInstance) return;
      self.pouchInstance
        .get(id)
        .then(function(doc) {
          return self.pouchInstance.put({
            _id: id,
            _rev: doc._rev,
            val: val
          });
        })
        .then(function(response) {
        })
        .catch(function(err) {
          if (err.status == 404) {
            self.pouchInstance
              .put({ _id: id, val: self.articles })
              .then(function(response) {
              })
              .catch(function(err) {
                console.log(err);
              });
          }
        });
    }
  }
  submit() {
    var self = this;
    if (this.title && this.description) {
      this._articlesService
        .addArticle({ title: this.title, description: this.description })
        .subscribe(x => {
          self.title = "";
          self.description = "";
          self.getArticles();
        },(err)=>{
          let offLine: any = {};
          offLine.url = "/api/add";
          offLine.data = { title: self.title, description: self.description };
          offLine.type = "article";
          if (!self.pouchInstance) return;
          self.pouchInstance
            .get("offline")
            .then(function(doc) {
              doc.val.push(offLine);
              return self.pouchInstance.put({
                _id: "offline",
                _rev: doc._rev,
                val: doc.val
              });
            })
            .then(function(response) {
            })
            .catch(function(err) {
              if(err.status == 404){
                self.pouchInstance
                  .put({ _id: 'offline', val: self.articles })
                  .then(function(response) {})
                  .catch(function(err) {
                    console.log(err);
                  });
              }
            });
        });
    }
  }
}
