/* Defines the product entity */
export interface InventoryCategory {
  id: number;
  Alias: string;
  ShortString: string;
  LongString: string;
  IsDeleted: number;
  CreationDate:Date;
  LastEditDate:Date;
  InsertUserId:number;
  UpdateUserId:number;
  DeleteUserId:number;
  CanShowDialogForScan: number;
}

