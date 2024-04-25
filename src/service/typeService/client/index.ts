import api from "@/service/api";
import { AppResponse } from "@/service/types";
import { getCookie } from "@/utils/cookie";
import {
  ICreateAndEditTypeService,
  IResponseCreateAndEditTypeService,
} from "../types";

export async function deleteTypeService(id: string): Promise<AppResponse> {
  const token = getCookie("high.token");
  const response = await fetch(`${api}/typeService/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => err.response);

  return response;
}

export async function createTypeService(
  data: ICreateAndEditTypeService
): Promise<IResponseCreateAndEditTypeService> {
  const token = getCookie("high.token");

  const response = await fetch(`${api}/typeService`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => err.response);

  return response;
}

export async function editTypeService(
  data: ICreateAndEditTypeService,
  id: string
): Promise<IResponseCreateAndEditTypeService> {
  const token = getCookie("high.token");

  const response = await fetch(`${api}/typeService/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => err.response);

  return response;
}
