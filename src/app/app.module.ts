import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";

// import { MaterialModule } from "./../material/material.module";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { ArticlesComponent } from "./articles.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app.routing";

import { ArticlesModule } from "./../articles/articles.module";

@NgModule({
  declarations: [AppComponent, ArticlesComponent],
  imports: [
    BrowserModule,
    ArticlesModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
