export interface NewCategoryRequestDto {
  name: string;
  unitOfMeasurement: string;
  description?: string | null;
}
