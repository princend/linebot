import { bot, sendOptions, options } from "./model";

var express = require('express');
var _cheerio = require("cheerio");
var request = require('request');



const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);


//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
const server = app.listen(process.env.PORT || 8080, function () {
    let port = server.address().port;
    console.log("App now running on port", port);
});

app.get('/', function (req, res) {
    res.send('GET request to the homepage');
});

export class Main {
    totalstr = ''

    imageGetter = new Image()

    bot() {
        bot.on('message', (event) => {
            let msg = event.message.text;
            if (msg.indexOf('天氣') != -1) {
                this.replyWeatgerInfo(event)
            }
            else if (msg.indexOf('抽') != -1) {
                this.replyPhoto(event);
            }
        })
    }

    replyWeatgerInfo(event) {
        let replyMsg = ''
        const cb = () => setTimeout(() => {
            replyMsg = this.totalstr;
            event.reply(replyMsg).then((data) => {
                console.log(replyMsg);
            }).catch((error) => {
                console.log('error');
            });
        });
        this.getWeather(cb)
    }

    replyPhoto(event) {
        const photoCb = () => setTimeout(() => {
            event.reply({
                type: 'image',
                originalContentUrl: this.imageGetter.photo,
                previewImageUrl: this.imageGetter.photo
            }).then((data) => { });
        });
        this.imageGetter.getFGOimg(photoCb)
    }


    getWeather(cb) {
        request('http://www.cwb.gov.tw/V7/forecast/taiwan/Taichung_City.htm', (err, res, body) => {
            let $ = _cheerio.load(body);
            let weather = []
            this.totalstr = '';
            $('.FcstBoxTable01 tbody tr').each( (i, elem)=> {
                weather.push($(this).text().split('\n'));
            });
            let output = [];
            for (let i = 0; i < 3; i++) {
                output.push({
                    time: weather[i][1].substring(2).split(' ')[0],
                    temp: weather[i][2].substring(2),
                    rain: weather[i][6].substring(2)
                });
            }
            output.forEach(data => {
                this.totalstr += data.time; + '，溫度大約' + data.temp + '度，降雨機率 ' + data.rain + ';';
            })
            sendOptions.json.messages = []
            let sendObj = {
                type: "text",
                text: this.totalstr,
                originalContentUrl: '',
                previewImageUrl: ''
            }
            sendOptions.json.messages.push(sendObj);
            cb()
        })
    }

}



export class Image {
    imgArray = []
    photo = '';
    getRandom = (x) => Math.floor(Math.random() * x);
    getFGOimg(cb) {
        request(options, (err, res, body) => {
            this.getImgs(body);
            sendOptions.json.messages = []
            let sendObj = {
                type: "image",
                originalContentUrl: this.photo,
                previewImageUrl: this.photo
            }
            sendOptions.json.messages.push(sendObj)
            cb()
        })
    }

    getImgs(param) {
        param = JSON.parse(param);
        this.imgArray = []
        param.data.forEach(element => {this.imgArray.push(element.link);});
        var ra = this.getRandom(this.imgArray.length)
        this.photo = this.imgArray[ra]
    }
}



const main = new Main();
main.bot();