import { SimpleImageJson } from "../interfaces/SimpleImageJson";

export default interface SupportedCountriesResponseDto {
  name: string;
  iso2: string;
  phoneCode: string;

  currency: string,
  currencySymbol: string,
  
  image: SimpleImageJson;
}
