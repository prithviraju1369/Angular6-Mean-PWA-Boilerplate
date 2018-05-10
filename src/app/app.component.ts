import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Observable } from "rxjs";
import { fromEvent, of, merge } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
declare var PouchDB: any;
declare var swRegistration: any;
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent implements AfterViewInit {
  online$: any;
  offLine: boolean = false;
  pouchInstance: any;
  constructor(private http: HttpClient) {
    
  }

  ngAfterViewInit() {
    if (window.indexedDB) {
      this.pouchInstance = new PouchDB("meanboiler");
    }
    this.online$ = merge(
      of(navigator.onLine),
      fromEvent(window, "online"),
      fromEvent(window, "offline")
    );
    this.online$.subscribe((x: any) => {
      let self = this;
      if (x === true || x.type == "online") {
        self.syncData();
      } else if (x.type == "offline") {
      }
    });
    this.pushInitialize();
  }
  updateSubscriptionOnServer(subscription) {
    let obj: any = {};
    obj.endPoint = subscription.endpoint;
    obj.keys = {};
    obj.keys.p256dh = subscription.keys.p256dh;
    obj.keys.auth = subscription.keys.auth;

    let result = this.http.post(`/api/subscription`, obj).subscribe(x => {
      console.log(x);
    });
  }
  urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
  pushInitialize() {
    let self = this;
    if (typeof swRegistration !== "undefined" && swRegistration) {
      console.log(swRegistration);
      let convertedVapidKey = self.urlBase64ToUint8Array("BMfzirqpnj_E-peR8tHHpJY-AEasiw1_2x-4HleDkmahysDv9hSRvtc8YPySLWMBmZeM2E8eWf7taNAAk2lLT4A");
      swRegistration.pushManager
        .subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedVapidKey
        })
        .then(function(sub) {
          if (sub) {
            let mySub = JSON.parse(JSON.stringify(sub));
            console.log(mySub);
            self.updateSubscriptionOnServer(mySub);
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
  syncData() {
    let self = this;
    if (!self.pouchInstance) return;
    self.pouchInstance
      .get("offline")
      .then(function(doc) {
        if (doc && doc.val && doc.val.length > 0) {
          for (let i = 0; i < doc.val.length; i++) {
            self.pushToServe(doc.val[i]);
          }
          self.pouchInstance
            .get("offline")
            .then(function(doc) {
              doc.val.length = 0;
              return self.pouchInstance.put({
                _id: "offline",
                _rev: doc._rev,
                val: doc.val
              });
            })
            .then(function(response) {})
            .catch(function(err) {});
        }
      })
      .catch(function(err) {});
  }
  pushToServe(obj) {
    let msg = "";
    let self = this;
    let result = this.http.post(obj.url, obj.data);
    result.subscribe(x => {});
  }
}
