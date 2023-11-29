import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { AutocompleteErrors } from '@constants';
import { AddressAutocompleState } from '@types';

import {
  fetchCitiesThunk,
  fetchCountriesThunk,
  fetchStatesThunk,
} from '../thunks';

const initialState: AddressAutocompleState = {
  countries: [],
  states: [],
  cities: [],
  errors: {
    stateOrCountry: AutocompleteErrors.INCORRECT_COUNTRY,
    townOrCity: AutocompleteErrors.INCORRECT_CITY,
  },
};

export const addressAutocompleteSlice = createSlice({
  name: 'addressAutocomplete',
  initialState,
  reducers: {
    setAutocompleteError: (
      state,
      { payload }: PayloadAction<[string, string]>,
    ) => {
      const [name, errorMessage] = payload;

      state.errors[name] = errorMessage;
    },
    setStates: (state, { payload }: PayloadAction<string[]>) => {
      state.states = payload;
    },
    setCities: (state, { payload }: PayloadAction<string[]>) => {
      state.cities = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountriesThunk.pending, (state) => {
        state.countries = [];
      })
      .addCase(fetchCountriesThunk.fulfilled, (state, { payload }) => {
        state.countries = payload;
      })
      .addCase(fetchStatesThunk.fulfilled, (state, { payload }) => {
        state.states = payload;
      })
      .addCase(fetchCitiesThunk.fulfilled, (state, { payload }) => {
        state.cities = payload;
      });
  },
});

export const {
  reducer: addressAutocompleteReducer,
  actions: addressAutocompleteActions,
} = addressAutocompleteSlice;
