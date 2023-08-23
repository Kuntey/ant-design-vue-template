import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_LOGISTICS_URL;

export function listMonitor(params) {
  return axios({
    baseURL: BASE_URL,
    url: "/Dft/Display/Findall",
    params,
  });
}

export function addMonitor(data) {
  return axios({
    baseURL: BASE_URL,
    url: "/Dft/Display/Save",
    method: "POST",
    data,
  });
}

export function updateMonitor(data) {
  return axios({
    baseURL: BASE_URL,
    url: "/Dft/Display/update",
    method: "POST",
    data,
  });
}

export function delMonitor(params) {
  return axios({
    baseURL: BASE_URL,
    url: "/Dft/Display/DeleteDisplay",
    method: "DELETE",
    params,
  });
}

export function detailMonitor(param) {
  return axios({
    baseURL: BASE_URL,
    url: `/Dft/Display/FindDisplayByBianHao${param}`,
  });
}

export function listProject(params) {
  return axios({
    baseURL: BASE_URL,
    url: "/Dft/BackEnd/QueryProject",
    params,
  });
}
