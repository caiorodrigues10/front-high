import { AppResponse } from "@/service/types";

export interface IRangeValues {
  name: string;
  value?: string;
  percent?: number;
}

export interface IService {
  id: string;
  name: string;
  rangeValues: IRangeValues[];
}

export interface IEditService {
  rangeValues?: IRangeValues[];
  name?: string;
}

export interface ICreateService {
  name: string;
  rangeValues: IRangeValues[];
}

export interface IResponseCreateService extends AppResponse {
  data?: IService;
}
