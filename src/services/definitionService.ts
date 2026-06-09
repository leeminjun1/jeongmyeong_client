import api from "./api";
import type { Definition } from "../types/debate";

interface DefinitionListResponse {
  success: boolean;
  definitions: Definition[];
}

interface DefinitionDetailResponse {
  success: boolean;
  definition: Definition;
}

export const definitionService = {
  search: (keyword?: string) =>
    api.get<DefinitionListResponse>("/definitions", {
      params: { keyword },
    }),
  getById: (definitionId: string) =>
    api.get<DefinitionDetailResponse>(`/definitions/${definitionId}`),
  getByDebate: (debateId: string) =>
    api.get<DefinitionListResponse>(`/debates/${debateId}/definitions`),
};
