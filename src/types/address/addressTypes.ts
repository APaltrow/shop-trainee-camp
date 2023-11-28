export interface ICountry {
  name: string;
}

export interface ICountryData {
  data: ICountry[];
}

export interface IStates {
  name: string;
}

export interface IStatesData {
  data: {
    states: IStates[];
  };
}

export interface ICityData {
  data: string[];
}
