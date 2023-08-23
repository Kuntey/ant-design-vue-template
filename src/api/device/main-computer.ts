import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_LOGISTICS_URL;

export function listComputer(params) {
  return axios({
    baseURL: BASE_URL,
    url: "/Dft/Computer/FindAllComputer",
    params,
  });
}

export function addComputer(data) {
  return axios({
    baseURL: BASE_URL,
    url: "Dft/Computer/SaveComputer",
    method: "POST",
    data,
  });
}

export function updateComputer(data) {
  return axios({
    baseURL: BASE_URL,
    url: "/Dft/Computer/SaveComputer",
    method: "POST",
    data,
  });
}

export function delComputer(params) {
  return axios({
    baseURL: BASE_URL,
    // url: `/Dft/Computer/DeleteComputer/${param}`,
    url: `/Dft/Computer/DeleteComputer`,
    params,
    method: "delete",
  });
}

export function detailComputer(param) {
  return axios({
    baseURL: BASE_URL,
    url: `/Dft/Computer/FindComputerByid/${param}`,
  });
}
