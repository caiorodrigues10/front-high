import { AppResponse } from "@/service/types";

export interface ITypeService {
  id: string;
  name: string;
}

export interface ICreateAndEditTypeService {
  name: string;
}

export interface IResponseCreateAndEditTypeService extends AppResponse {
  data?: ITypeService;
}
