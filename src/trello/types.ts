class TrelloCardShort {
  id: string;
  name: string;
  idShort: number;
  shortLink: string;
}
class TrelloMemberCreator {
  id: string;
  activeBlocked: boolean;
  avatarHash: string;
  avatarUrl: string;
  fullName: string;
  initials: string;
  username: string;
}
class TrelloList {
  id: string;
  name: string;
}
class TrelloBoard {
  id: string;
  name: string;
  shortLink: string;
}
class TrelloAction {
  type: string;
  memberCreator: TrelloMemberCreator;
  data: {
    card: TrelloCardShort;
    board: TrelloBoard;
    list?: TrelloList;
    listAfter?: TrelloList;
    listBefore?: TrelloList;
  }
}
class TrelloCallback {
  action: TrelloAction;
}

class TrelloLabel {
  id: string;
  idBoard: string;
  name: string;
  color: string;
}
class TrelloCard {
  id: string;
  name: string;
  shortLink: string;
  shortUrl: string;
  url: string;
  desc: string;
  start: string // ISO8601
  due: string; // ISO8601
  idBoard: string;
  idList: string;
  labels: TrelloLabel[];
  idLabels: string[];
  isTemplate: boolean;
}
