export default interface ProductCatalogueFilterRequestDto {
  brandUuids?: string[] | null;
  categoryUuids?: string[] | null;
  locationStates?: string[] | null;
  lga?: string[] | null;

  searchWord?: string | null;
  forOnlyDefaultLinkedSeller?: boolean | null;
}
