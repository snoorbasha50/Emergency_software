export interface Startup {
  company: string;
  score: number;
  verdict: string;
  memo: string;
}

export interface ResearchResponse {
  success: boolean;
  companies: Startup[];
}