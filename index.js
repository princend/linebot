var linebot = require('linebot');
var express = require('express');

var bot = linebot({
  channelId: 1535120783,
  channelSecret: "692b1839ca5426d61af3d4b038e81b68",
  channelAccessToken: "NAq8fSKh+eKmAGR8iUqPmkLXAKI+mgjzi8pyCNyEktcxOfjfqCvlUQLzyLddcYsu3ql4eALNUt+ehby368gn1fjVGxuCTK1jRRIitof7Fc61rjepO662fZsvZpyZStfiU8RwSPIpEInUcvPEOFuZPwdB04t89/1O/w1cDnyilFU="
});

bot.on('message', function(event) {
  if (event.message.type = 'text') {
    var msg = event.message.text;
    event.reply(msg).then(function(data) {
      // success 
      console.log(msg);
    }).catch(function(error) {
      // error 
      console.log('error');
    });
  }
});
  
  const app = express();
  const linebotParser = bot.parser();
  app.post('/', linebotParser);
  
  //因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
  var server = app.listen(process.env.PORT || 8080, function() {
    var port = server.address().port;
    console.log("App now running on port", port);
  });