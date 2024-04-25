import { IElo } from "@/service/elo/types";
import { AppResponse } from "@/service/types";
import { ITypeService } from "@/service/typeService/types";

export interface IRangeValues {
  name: string;
  value?: number;
  percent?: number;
}

export interface IService {
  id: string;
  priceByTier: number;
  rangeValues: IRangeValues[];
  elo: IElo;
  typeservice: ITypeService;
}

export interface IEditService {
  priceByTier?: number;
  rangeValues?: IRangeValues[];
  eloId?: string;
  typeId?: string;
}

export interface ICreateService {
  eloId: string;
  typeId: string;
  priceByTier: number;
  rangeValues: IRangeValues[];
}

export interface IResponseCreateService extends AppResponse {
  data?: IService;
}
