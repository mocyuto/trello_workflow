const propTrello = PropertiesService.getScriptProperties().getProperties();
const trelloKey = propTrello.TRELLO_API_KEY;
const trelloToken = propTrello.TRELLO_TOKEN;
const trelloBoardID = propTrello.TRELLO_BOARD_ID;
const trelloDestListId = propTrello.TRELLO_DEST_LIST_ID;

function getCardDetail(cardId: string): TrelloCard {
  const url = 'https://api.trello.com/1/cards/' + cardId + '?key=' + trelloKey + '&token=' + trelloToken;
  const response = UrlFetchApp.fetch(url);
  const card: TrelloCard = JSON.parse(response.getContentText());
  return card;
}

function getAction(): TrelloAction[] | undefined {
  const url = 'https://api.trello.com/1/boards/' + trelloBoardID + '/actions?key=' + trelloKey + '&token=' + trelloToken;
  const response = UrlFetchApp.fetch(url);
  const actions: TrelloAction[] = JSON.parse(response.getContentText());
  if (actions.length <= 0) {
    return undefined;
  }
  return actions;
}

// @return{string} cardId
function getMovedCard(action: TrelloAction, destListId: string): string {
  // undefined if card is not moved
  const listMoved: string | undefined = action.data.listAfter?.id;
  if (listMoved !== destListId) {
    return '';
  }
  return action.data.card.id;
}

function testActionLastCard() {
  const actions = getAction()
  if (actions === undefined || actions.length <= 0) {
    return;
  }
  const action = actions[0];
  const card = getCardDetail(action.data.card.id);
  Logger.log(`[${action.type}] ${card.name}: ${card.desc}`);
}

function testMoved() {
  for (const action of getAction() || []) {
    const cardId = getMovedCard(action, trelloDestListId);
    if (cardId === '') {
      continue;
    }
    const card = getCardDetail(cardId);
    Logger.log(`[${action.type}] ${card.name}: ${card.desc}`);
  }
}
