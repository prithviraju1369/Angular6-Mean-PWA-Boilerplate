var express = require('express');
var Article = require('../models/articles');
var Device = require("../models/devices");
var router = express.Router();
const webpush = require("web-push");
webpush.setGCMAPIKey(
  "AAAANpGvJoE:APA91bFP4eKWqatt5TonNL9QvB3jf5qkMJpvEhiIux_7EgSUxOrIq96pod-rJl76ZT84blmGGtgX4nYyCi-T9H4RILwD6wPN67A8kGTp-UN7ewexmTMlWux29oLgbKduitkvi9Ff9gRD"
);

const options = {
  gcmAPIKey:
    "AAAANpGvJoE:APA91bFP4eKWqatt5TonNL9QvB3jf5qkMJpvEhiIux_7EgSUxOrIq96pod-rJl76ZT84blmGGtgX4nYyCi-T9H4RILwD6wPN67A8kGTp-UN7ewexmTMlWux29oLgbKduitkvi9Ff9gRD",
  vapidDetails: {
    subject: "mailto:prituppalapati@gmail.com",
    publicKey:
      "BMfzirqpnj_E-peR8tHHpJY-AEasiw1_2x-4HleDkmahysDv9hSRvtc8YPySLWMBmZeM2E8eWf7taNAAk2lLT4A",
    privateKey: "LHfvjLVhhvOrhdluC2Kn791-xRhjuSKQS9Zx7cjz1UY"
  },
  TTL: 10,
  headers: {}
};

router.get('/articles', function(req, res) {
  Article.find({}, function(err, docs) {
    if (err) {
      console.log(err);
    }
    res.send(docs);
  });
});

router.get("/article", function(req, res) {

  Article.findOne({ _id: req.query.id }, function(err, docs) {
    if (err) {
      console.log(err);
    }
    res.send(docs);
  });
});


router.post('/add', function(req, res) {
      var article = new Article({
        title: req.body.title,
        description: req.body.description
      });
      article.save(function(err, saved) {
        if (err) {
          console.log(err);
        } else {
          var obj=JSON.parse(JSON.stringify(saved));
          sendNotification(obj._id,obj.title);
          res.send(saved);
        }
      });
  
});

router.post("/subscription", function(req, res) {
  Device.findOne({ endpoint: req.body.endPoint }, function(err, doc) {
    if (err) {
      console.log(err);
    }
    if (!doc) {
      var device = new Device({
        endpoint: req.body.endPoint,
        "p256dh": req.body.keys.p256dh,
        "auth": req.body.keys.auth
      });
      device.save(function(err, saved) {
        if (err) {
          console.log(err);
        } else {
          res.send(saved);
        }
      });
    } else {
      res.send({});
    }
  });
});

function sendNotification(id,title){
  console.log(id);
  var obj = { docId: id, text: title };
  Device.find({}, function(err, docs) {
    if (err) {
      console.log(err);
    }
    var arr = JSON.parse(JSON.stringify(docs));
    for(var k = 0;k<arr.length;k++){
      if (arr[k].endpoint && arr[k].auth) {
        var pushSubscription = { endpoint: arr[k].endpoint, keys: { auth: arr[k].auth, p256dh: arr[k].p256dh } };
        webpush
          .sendNotification(
            pushSubscription,
            JSON.stringify(obj),
            options
          )
          .then(function(err) {
            console.log(err);
          });
        // webpush.sendNotification(pushSubscription, 'Your Push Payload Text').then(function(res){console.log(res)});
      }
    }
  });
}

module.exports = router;
