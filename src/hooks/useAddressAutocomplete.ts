import { useEffect } from 'react';

import { useDebounce } from '@hooks';
import {
  AddressFields,
  AutocompleteErrors,
  COUNTRY_AND_STATE_DIVIDER,
  MIN_SEARCH_LENGTH,
} from '@constants';
import { checkIsInList } from '@helpers';

import { useActions, useAppSelector } from '@redux';

export const useAddressAutocomplete = (
  countryName: string,
  cityName: string,
) => {
  const { errors, countries, states, cities } = useAppSelector(
    (state) => state.addressAutocomplete,
  );
  const {
    setAutocompleteError,
    setStates,
    setCities,
    fetchCountriesThunk,
    fetchStatesThunk,
    fetchCitiesThunk,
  } = useActions();

  const [country, state] = countryName.split(COUNTRY_AND_STATE_DIVIDER);

  const getCountryStates = useDebounce(async (selectedCountryName: string) =>
    fetchStatesThunk(selectedCountryName),
  );

  const getCitiesInState = useDebounce(
    async (countryToCheck: string, stateName: string) =>
      fetchCitiesThunk({ countryToCheck, stateName }),
  );

  useEffect(() => {
    if (countries.length) return;

    fetchCountriesThunk();
  }, []);

  useEffect(() => {
    const isCorrectCountry = checkIsInList(country, countries);
    const isCorrectCity = checkIsInList(cityName, cities);
    const isCorrectState =
      !!state &&
      state.length > MIN_SEARCH_LENGTH &&
      checkIsInList(state, states);

    if (!isCorrectCountry) {
      setAutocompleteError([
        AddressFields.STATE_COUNTRY,
        AutocompleteErrors.INCORRECT_COUNTRY,
      ]);
      setStates([]);
      setCities([]);

      return;
    }

    if (!isCorrectState) {
      setAutocompleteError([
        AddressFields.STATE_COUNTRY,
        AutocompleteErrors.INCORRECT_STATE,
      ]);
      setCities([]);
    } else {
      getCitiesInState(country.trim(), state.trim());

      setAutocompleteError([
        AddressFields.STATE_COUNTRY,
        AutocompleteErrors.NO_ERROR,
      ]);
    }

    if (!isCorrectCity) {
      setAutocompleteError([
        AddressFields.TOWN_CITY,
        AutocompleteErrors.INCORRECT_CITY,
      ]);
    } else {
      setAutocompleteError([
        AddressFields.TOWN_CITY,
        AutocompleteErrors.NO_ERROR,
      ]);
    }

    if (state) return;

    getCountryStates(country);
  }, [countryName, cityName]);

  const countryOptions =
    countryName.length > MIN_SEARCH_LENGTH ? countries : [];

  const isValidCountry = checkIsInList(country, countries);
  const countryWithState =
    states.length && isValidCountry
      ? states.map((stateOption) => `${country}, ${stateOption}`)
      : countryOptions;

  const inputLists: Record<string, string[]> = {
    stateOrCountry: countryWithState,
    townOrCity: cities,
  };

  return {
    inputLists,
    errors,
  };
};
