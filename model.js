"use strict";
exports.__esModule = true;
exports.linebot = require('linebot');
exports.bot = exports.linebot({
    channelId: 1535120783,
    channelSecret: "692b1839ca5426d61af3d4b038e81b68",
    channelAccessToken: "NAq8fSKh+eKmAGR8iUqPmkLXAKI+mgjzi8pyCNyEktcxOfjfqCvlUQLzyLddcYsu3ql4eALNUt+ehby368gn1fjVGxuCTK1jRRIitof7Fc61rjepO662fZsvZpyZStfiU8RwSPIpEInUcvPEOFuZPwdB04t89/1O/w1cDnyilFU="
});
exports.url = 'http://www.cwb.gov.tw/V7/forecast/taiwan/Taichung_City.htm';
exports.fgoImgAlbumURL = 'https://api.imgur.com/3/album/b3ylv/images';
exports.options = {
    url: exports.fgoImgAlbumURL,
    headers: {
        'Authorization': 'Client-ID 757aa7465befd6c'
    }
};
exports.sendOptions = {
    headers: { 'content-Type': 'application/json', 'Authorization': 'Bearer {NAq8fSKh+eKmAGR8iUqPmkLXAKI+mgjzi8pyCNyEktcxOfjfqCvlUQLzyLddcYsu3ql4eALNUt+ehby368gn1fjVGxuCTK1jRRIitof7Fc61rjepO662fZsvZpyZStfiU8RwSPIpEInUcvPEOFuZPwdB04t89/1O/w1cDnyilFU=}' },
    url: 'https://api.line.me/v2/bot/message/push',
    json: {
        "to": "U88cd28005c1e4c187bd8bb50a4532bde",
        "messages": [{
                "type": "image",
                "originalContentUrl": "https://free.com.tw/blog/wp-content/uploads/2014/08/Placekitten480-g.jpg",
                "previewImageUrl": "https://free.com.tw/blog/wp-content/uploads/2014/08/Placekitten480-g.jpg"
            }]
    }
};
