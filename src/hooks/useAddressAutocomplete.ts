import { useEffect, useState } from 'react';

import { useDebounce } from '@hooks';
import {
  CITIES_VALIDATOR,
  AutocompleteErrors,
  COUNTRY_AND_STATE_DIVIDER,
  MIN_SEARCH_LENGTH,
} from '@constants';
import { checkIsInList } from '@helpers';
import { fetchCountryStates, fetchCountries, fetchCitiesInState } from '@api';

const initialErrors = {
  stateOrCountry: AutocompleteErrors.INCORRECT_COUNTRY,
  townOrCity: AutocompleteErrors.INCORRECT_CITY,
};

export const useAddressAutocomplete = (
  countryName: string,
  cityName: string,
) => {
  const [countries, setCountries] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>(initialErrors);

  const [country, state] = countryName.split(COUNTRY_AND_STATE_DIVIDER);

  const getCountries = async () => {
    const allCountries = await fetchCountries();

    const allCountriesNames = [
      ...new Set(allCountries.map(({ name }) => name)),
    ];

    setCountries(allCountriesNames);
  };

  const getCountryStates = useDebounce(async (selectedCountryName: string) => {
    const countryStates = await fetchCountryStates(selectedCountryName);

    const statesList = countryStates.map(({ name: stateName }) => stateName);

    setStates(statesList);
  });

  const getCitiesInState = useDebounce(
    async (countryToCheck: string, stateName: string) => {
      const citiesOfState = await fetchCitiesInState(countryToCheck, stateName);

      const filteredCities = citiesOfState.filter((nameOfCity: string) => {
        return !CITIES_VALIDATOR.test(nameOfCity);
      });

      setCities(filteredCities);
    },
  );

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    const isCorrectCountry = checkIsInList(country, countries);
    const isCorrectCity = checkIsInList(cityName, cities);
    const isCorrectState =
      !!state &&
      state.length > MIN_SEARCH_LENGTH &&
      checkIsInList(state, states);

    if (!isCorrectCountry) {
      setErrors((prev) => ({
        ...prev,
        stateOrCountry: AutocompleteErrors.INCORRECT_COUNTRY,
      }));
      setStates([]);
      setCities([]);

      return;
    }

    if (!isCorrectState) {
      setErrors((prev) => ({
        ...prev,
        stateOrCountry: AutocompleteErrors.INCORRECT_STATE,
      }));
      setCities([]);
    } else {
      getCitiesInState(country.trim(), state.trim());

      setErrors((prev) => ({
        ...prev,
        stateOrCountry: AutocompleteErrors.NO_ERROR,
      }));
    }

    if (!isCorrectCity) {
      setErrors((prev) => ({
        ...prev,
        townOrCity: AutocompleteErrors.INCORRECT_CITY,
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        townOrCity: AutocompleteErrors.NO_ERROR,
      }));
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
