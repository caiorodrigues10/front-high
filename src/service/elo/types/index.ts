import { AppResponse } from "@/service/types";

export interface IElo {
  id: string;
  name: string;
  position: number;
}
export interface ICreateAndEditElo {
  name: string;
  position: number;
}

export interface IResponseCreateAndEditElo extends AppResponse {
  data?: ICreateAndEditElo;
}