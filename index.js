var linebot = require('linebot');
var express = require('express');
var getJSON = require('get-json');
var cheerio = require("cheerio");
var request = require('request');

var bot = linebot({
  channelId: 1535120783,
  channelSecret: "692b1839ca5426d61af3d4b038e81b68",
  channelAccessToken: "NAq8fSKh+eKmAGR8iUqPmkLXAKI+mgjzi8pyCNyEktcxOfjfqCvlUQLzyLddcYsu3ql4eALNUt+ehby368gn1fjVGxuCTK1jRRIitof7Fc61rjepO662fZsvZpyZStfiU8RwSPIpEInUcvPEOFuZPwdB04t89/1O/w1cDnyilFU="
});
var url = 'http://www.cwb.gov.tw/V7/forecast/taiwan/Taichung_City.htm';
var timer;
var pm = [];

var fgoImgAlbumURL = 'https://api.imgur.com/3/album/b3ylv/images'

_getWeather();
// getNewData();
var totalstr = ''
_bot();
const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});

function _bot() {
  bot.on('message', function (event) {
    if (event.message.type == 'text') {
      var msg = event.message.text;
      var replyMsg = '';
      if (msg.indexOf('PM2.5') != -1) {
        _getPM()
        setTimeout(() => {
          pm.forEach(function (e, i) {
            if (msg.indexOf(e[0]) != -1) {
              replyMsg = e[0] + '的 PM2.5 數值為 ' + e[1];
              event.reply(replyMsg).then(function (data) {
                console.log(replyMsg);
              }).catch(function (error) {
                console.log('error');
              });
            }
          });
          if (replyMsg == '') {
            replyMsg = '請輸入正確的地點';
            event.reply(replyMsg).then(function (data) {
              console.log(replyMsg);
            }).catch(function (error) {
              console.log('error');
            });
          }
        }, 1000);


      }
      if (msg.indexOf('天氣') != -1) {
        replyMsg = 'testin';
        _getWeather()
        setTimeout(() => {
          replyMsg = totalstr;
          event.reply(replyMsg).then(function (data) {
            console.log(replyMsg);
          }).catch(function (error) {
            console.log('error');
          });
        }, 1000);
      }
      if (msg.indexOf('抽') != -1) {
        getFGOimg()
        setTimeout(() => {
          event.reply({
            type: 'image',
            originalContentUrl: photo,
            previewImageUrl: photo
          }).then((data) => { });
        }, 1000);
      }
    }
  });

}

botTest()
function botTest() {
  bot.on('follow', function (event) { event.reply('follow').then() });
  bot.on('unfollow', function (event) { event.reply('unfollow').then() });
  bot.on('join', function (event) { event.reply('join').then() });
  bot.on('leave', function (event) { event.reply('leave').then() });
  bot.on('postback', function (event) { event.reply('postback').then() });
  bot.on('beacon', function (event) { event.reply('beacon').then() });
}




function _getWeather() {
  request('http://www.cwb.gov.tw/V7/forecast/taiwan/Taichung_City.htm', function (err, res, body) {
    var $ = cheerio.load(body);
    var weather = []
    totalstr = '';
    $('.FcstBoxTable01 tbody tr').each(function (i, elem) {
      weather.push($(this).text().split('\n'));
    });
    var output = [];
    for (var i = 0; i < 3; i++) {
      output.push({
        time: weather[i][1].substring(2).split(' ')[0],
        temp: weather[i][2].substring(2),
        rain: weather[i][6].substring(2)
      });
    }
    for (var i = 0; i < output.length; i++) {
      var time = output[i].time;
      var temp = output[i].temp;
      var rain = output[i].rain;
      var str = time + '，溫度大約' + temp + '度，降雨機率 ' + rain + ';';
      totalstr += str;
    }
  })
}


function _getPM() {
  getJSON('http://opendata2.epa.gov.tw/AQX.json', function (error, response) {
    response.forEach(function (e, i) {
      pm[i] = [];
      pm[i][0] = e.SiteName;
      pm[i][1] = e['PM2.5'] * 1;
      pm[i][2] = e.PM10 * 1;
    });
  });
}


var options = {
  url: fgoImgAlbumURL,
  headers: {
    'Authorization': 'Client-ID 757aa7465befd6c'
  }
};


getFGOimg();

function getFGOimg() {
  request(options, function (err, res, body) {
    getImgs(body)
  })
}

var imgArray = []
var photo = ''
function getImgs(param) {
  param = JSON.parse(param);
  imgArray = []
  param.data.forEach(element => {
    imgArray.push(element.link);
  });
  var ra = getRandom(imgArray.length)
  photo = imgArray[ra]
}


function getRandom(x) {
  return Math.floor(Math.random() * x);
};
/* function getNewData(){
  clearTimeout(timer);
  timer = setInterval(()=>{_getJSON()}, 3600000); //每半小時抓取一次新資料
} */
/* function _getJSON() {

  clearTimeout(timer);
  getJSON('http://opendata2.epa.gov.tw/AQX.json', function(error, response) {
    response.forEach(function(e, i) {
      pm[i] = [];
      pm[i][0] = e.SiteName;
      pm[i][1] = e['PM2.5'] * 1;
      pm[i][2] = e.PM10 * 1;
    });
  });
  timer = setInterval(_getJSON, 1800000); //每半小時抓取一次新資料
} */





/* function _getWeather() {
  request(url, function (err, res, body) {
    var $ = cheerio.load(body);
    var weather = []
    $('.FcstBoxTable01 tbody tr').each(function (i, elem) {
      weather.push($(this).text().split('\n'));
    });
    var output = [];
    for (var i = 0; i < 3; i++) {
      output.push({
        time: weather[i][1].substring(2).split(' ')[0],
        temp: weather[i][2].substring(2),
        rain: weather[i][6].substring(2)
      });
    }

    for (var i = 0; i < output.length; i++) {
      var time = output[i].time;
      var temp = output[i].temp;
      var rain = output[i].rain;
      var str = time + '，溫度大約' + temp + '度，降雨機率 ' + rain + ';';
      totalstr += str;
    }
  })
  
} */




