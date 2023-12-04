import { createAsyncThunk } from '@reduxjs/toolkit';

import { fetchCitiesInState, fetchCountries, fetchCountryStates } from '@api';
import { CITIES_VALIDATOR } from '@constants';

export const fetchCountriesThunk = createAsyncThunk(
  'addressAutocomplete/fetchCountriesThunk',
  async () => {
    const allCountries = await fetchCountries();

    const allCountriesNames = [
      ...new Set(allCountries.map(({ name }) => name)),
    ];

    return allCountriesNames;
  },
);

export const fetchStatesThunk = createAsyncThunk(
  'addressAutocomplete/fetchStatesThunk',
  async (selectedCountryName: string) => {
    const countryStates = await fetchCountryStates(selectedCountryName);

    const statesList = countryStates.map(({ name: stateName }) => stateName);

    return statesList;
  },
);

export const fetchCitiesThunk = createAsyncThunk(
  'addressAutocomplete/fetchCitiesThunk',
  async (params: Record<string, string>) => {
    const { stateName, countryToCheck } = params;
    const citiesOfState = await fetchCitiesInState(countryToCheck, stateName);

    const filteredCities = citiesOfState.filter((nameOfCity: string) => {
      return !CITIES_VALIDATOR.test(nameOfCity);
    });

    return filteredCities;
  },
);
