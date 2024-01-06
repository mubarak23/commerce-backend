export interface SearchProjectDto {
  type?: string | null,
  minCostPerSlot?: number | null,
  maxCostPerSlot?: number | null,
  searchWord? : string | null,
  state? : string | null,
  projectName?: string | null 
}