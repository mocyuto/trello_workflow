const TIMEZONE = '+09:00';

function doGet(e: GoogleAppsScript.Events.DoGet) {
  const text = e.parameter.text;
  const out = ContentService.createTextOutput();
  out.setMimeType(ContentService.MimeType.JSON);
  out.setContent('hello world' + text);
  return out;
}

function doPost(e: GoogleAppsScript.Events.DoPost) {
  const contents: TrelloCallback = JSON.parse(e.postData.contents);
  const event = contents.action.type;
  if (event !== 'updateCard') {
    return;
  }
  const cardId: string = getMovedCard(contents.action, trelloDestListId);
  if (cardId === '') {
    return;
  }
  try {
    const card: TrelloCard = getCardDetail(cardId);
    const creatingEvent = newEvent(card.name, card.desc);
    createEvent(creatingEvent);
  } catch (e) {
    notifySlack(`${e}`);
  }

  const out = ContentService.createTextOutput();
  out.setMimeType(ContentService.MimeType.JSON);
  out.setContent('ok');
  return
}

function newEvent(title: string, description: string): GoogleCalendarEvent {

  let [date, start, end, desc] = ['', '', '', ''];
  for (const line of description.split('\n')) {
    const [key, value] = line.split(':');
    switch (key) {
      case 'Date':
        date = value;
        break;
      case 'Duration':
        [start, end] = value.split('-');
        break;
      default:
        desc += line + '\n';
        break;
    }
  }
  const d = new Date(`${date.trim()}T00:00:00${TIMEZONE}`);
  const startHour = parseInt(start.trim(), 10);
  const endHour = parseInt(end.trim(), 10);
  return new GoogleCalendarEvent(title, d, startHour, endHour, desc);
}

function testNewEvent() {
  const event = newEvent('test', 'Date: 2020-08-01\nDuration: 9-12\ntest');
  Logger.log(event);
}
