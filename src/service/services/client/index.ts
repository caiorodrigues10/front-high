import api from "@/service/api";
import { AppResponse } from "@/service/types";
import { getCookie } from "@/utils/cookie";
import { ICreateService, IEditService, IResponseCreateService } from "../types";

export async function deleteService(id: string): Promise<AppResponse> {
  const token = getCookie("high.token");
  const response = await fetch(`${api}/service/${id}`, {
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

export async function createService(
  data: ICreateService
): Promise<IResponseCreateService> {
  const token = getCookie("high.token");

  const response = await fetch(`${api}/service`, {
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

export async function editService(
  data: IEditService,
  id: string
): Promise<IResponseCreateService> {
  const token = getCookie("high.token");

  const response = await fetch(`${api}/service/${id}`, {
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
