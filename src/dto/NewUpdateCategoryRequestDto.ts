export interface NewUpdateCategoryRequestDto {
  name?: string;
  unitOfMeasurement?: string;
  description?: string | null;
  brandUuids?: string[] | null;
}
