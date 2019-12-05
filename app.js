"use strict";
exports.__esModule = true;
var model_1 = require("./model");
var express = require('express');
var _cheerio = require("cheerio");
var request = require('request');
var app = express();
var linebotParser = model_1.bot.parser();
app.post('/', linebotParser);
//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});
app.get('/', function (req, res) {
    res.send('GET request to the homepage');
});
var Main = /** @class */ (function () {
    function Main() {
        this.totalstr = '';
        this.imageGetter = new Image();
    }
    Main.prototype.bot = function () {
        var _this = this;
        model_1.bot.on('message', function (event) {
            var msg = event.message.text;
            if (msg.indexOf('天氣') != -1) {
                _this.replyWeatgerInfo(event);
            }
            else if (msg.indexOf('抽') != -1) {
                _this.replyPhoto(event);
            }
        });
    };
    Main.prototype.replyWeatgerInfo = function (event) {
        var _this = this;
        var replyMsg = '';
        var cb = function () { return setTimeout(function () {
            replyMsg = _this.totalstr;
            event.reply(replyMsg).then(function (data) {
                console.log(replyMsg);
            })["catch"](function (error) {
                console.log('error');
            });
        }); };
        this.getWeather(cb);
    };
    Main.prototype.replyPhoto = function (event) {
        var _this = this;
        var photoCb = function () { return setTimeout(function () {
            event.reply({
                type: 'image',
                originalContentUrl: _this.imageGetter.photo,
                previewImageUrl: _this.imageGetter.photo
            }).then(function (data) { });
        }); };
        this.imageGetter.getFGOimg(photoCb);
    };
    Main.prototype.getWeather = function (cb) {
        var _this = this;
        request('http://www.cwb.gov.tw/V7/forecast/taiwan/Taichung_City.htm', function (err, res, body) {
            var $ = _cheerio.load(body);
            var weather = [];
            _this.totalstr = '';
            $('.FcstBoxTable01 tbody tr').each(function (i, elem) {
                weather.push($(_this).text().split('\n'));
            });
            var output = [];
            for (var i = 0; i < 3; i++) {
                output.push({
                    time: weather[i][1].substring(2).split(' ')[0],
                    temp: weather[i][2].substring(2),
                    rain: weather[i][6].substring(2)
                });
            }
            output.forEach(function (data) {
                _this.totalstr += data.time;
                +'，溫度大約' + data.temp + '度，降雨機率 ' + data.rain + ';';
            });
            model_1.sendOptions.json.messages = [];
            var sendObj = {
                type: "text",
                text: _this.totalstr,
                originalContentUrl: '',
                previewImageUrl: ''
            };
            model_1.sendOptions.json.messages.push(sendObj);
            cb();
        });
    };
    return Main;
}());
exports.Main = Main;
var Image = /** @class */ (function () {
    function Image() {
        this.imgArray = [];
        this.photo = '';
        this.getRandom = function (x) { return Math.floor(Math.random() * x); };
    }
    Image.prototype.getFGOimg = function (cb) {
        var _this = this;
        request(model_1.options, function (err, res, body) {
            _this.getImgs(body);
            model_1.sendOptions.json.messages = [];
            var sendObj = {
                type: "image",
                originalContentUrl: _this.photo,
                previewImageUrl: _this.photo
            };
            model_1.sendOptions.json.messages.push(sendObj);
            cb();
        });
    };
    Image.prototype.getImgs = function (param) {
        var _this = this;
        param = JSON.parse(param);
        this.imgArray = [];
        param.data.forEach(function (element) { _this.imgArray.push(element.link); });
        var ra = this.getRandom(this.imgArray.length);
        this.photo = this.imgArray[ra];
    };
    return Image;
}());
exports.Image = Image;
var main = new Main();
main.bot();
