export interface IPlayer {
  id?: number;
  name: string;
  number: any;
  position: string[];
  batAndThrow: string;
}

export interface IStatPlayer {
  playerId?: number,
  tableId?: number,
  numberOfGames?: number,
  pa?: number,
  ab?: number,
  avg?: number,
  obp?: number,
  soPa?: number,
  run?: number,
  rbi?: number,
  bb?: number,
  hbp?: number,
  oneB?: number,
  twoB?: number,
  threeB?: number,
  hr?: number,
  so?: number,
  go?: number,
  fo?: number,
  ro?: number
}

export interface ITable {
  id: number,
  name: string,
  date: Date
}

export interface IStatExcel extends IStatPlayer {
  namePlayer: string,
  nameTable: string
}
