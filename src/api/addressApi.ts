import axios from 'axios';

import { CITIES_URL, COUNTRIES_URL } from '@constants';
import { ICityData, ICountryData, IStatesData } from '@types';

export const fetchCountries = async () => {
  const { data } = await axios.get<ICountryData>(COUNTRIES_URL);

  return data.data;
};

export const fetchCountryStates = async (countryName: string) => {
  const { data } = await axios.post<IStatesData>(COUNTRIES_URL, {
    country: countryName,
  });

  return data.data.states;
};

export const fetchCitiesInState = async (
  countryName: string,
  stateName: string,
) => {
  const { data } = await axios.post<ICityData>(CITIES_URL, {
    country: countryName,
    state: stateName,
  });

  return data.data;
};
