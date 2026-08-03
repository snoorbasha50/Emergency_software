import axios from "axios";
import type { ResearchResponse } from "./types";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

export const researchApi = {
  analyze: (topic: string) =>
    api.post<ResearchResponse>("/research", { topic }),
};

export default api;