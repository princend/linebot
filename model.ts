export const linebot = require('linebot');
export const bot = linebot({
    channelId: 1535120783,
    channelSecret: "692b1839ca5426d61af3d4b038e81b68",
    channelAccessToken: "NAq8fSKh+eKmAGR8iUqPmkLXAKI+mgjzi8pyCNyEktcxOfjfqCvlUQLzyLddcYsu3ql4eALNUt+ehby368gn1fjVGxuCTK1jRRIitof7Fc61rjepO662fZsvZpyZStfiU8RwSPIpEInUcvPEOFuZPwdB04t89/1O/w1cDnyilFU="
});
export const url = 'http://www.cwb.gov.tw/V7/forecast/taiwan/Taichung_City.htm';
export const fgoImgAlbumURL = 'https://api.imgur.com/3/album/b3ylv/images';
export const options = {
    url: fgoImgAlbumURL,
    headers: {
        'Authorization': 'Client-ID 757aa7465befd6c'
    }
};


export const sendOptions = {
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