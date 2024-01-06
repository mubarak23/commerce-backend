interface NewUpdateProductRequestDto {
  name?: string | null;
  description?: string | null;

  categoryUuid?: string | null;
  brandUuid?: string | null;

  price?: number | null;

  locationState?: string | null;

  minQty?: number | null;
  maxQty?: number | null;
  tags?: any | null;
}

export default NewUpdateProductRequestDto;
