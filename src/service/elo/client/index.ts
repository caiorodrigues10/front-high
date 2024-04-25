import api from "@/service/api";
import { AppResponse } from "@/service/types";
import { getCookie } from "@/utils/cookie";
import { ICreateAndEditElo, IResponseCreateAndEditElo } from "../types";

export async function deleteElo(id: string): Promise<AppResponse> {
  const token = getCookie("high.token");
  const response = await fetch(`${api}/elo/${id}`, {
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

export async function createElo(
  data: ICreateAndEditElo
): Promise<IResponseCreateAndEditElo> {
  const token = getCookie("high.token");

  const response = await fetch(`${api}/elo`, {
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

export async function editElo(
  data: ICreateAndEditElo,
  id: string
): Promise<IResponseCreateAndEditElo> {
  const token = getCookie("high.token");

  const response = await fetch(`${api}/elo/${id}`, {
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
