const propSlack = PropertiesService.getScriptProperties().getProperties();
const slackUrl = propSlack.SLACK_URL

function notifySlack(msg: string) {
  const response = UrlFetchApp.fetch(slackUrl, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({
      text: msg,
    })
  });
  Logger.log(response.getContentText());
}

function testNotifySlack() {
  notifySlack('test');
}
