import { ForecastMode, WeatherAppState } from 'libs/weather-forecast/services/src/lib/+state/weather/weather.models';
import { Action, createReducer, on } from '@ngrx/store';
import {
	searchCityRequest,
	searchCityResult,
	selectCity,
	weatherModeChange,
	weatherRequest,
	weatherResult,
} from 'libs/weather-forecast/services/src/lib/+state/weather/weather.actions';

export const WEATHER_FEATURE_KEY = 'weather';

export const initialState: WeatherAppState = {
	forecastMode: ForecastMode.Hourly,
	isCityRequestActive: false,
	isWeatherRequestActive: false,
	responseCities: [],
	savedCities: [],
	selectedCity: null,
	hourly: [],
	daily: [],
};

export const weatherReducer = createReducer(
	initialState,
	on(searchCityRequest, (state) => ({ ...state, isCityRequestActive: true })),
	on(searchCityResult, (state, action) => ({ ...state, responseCities: action.payload, isCityRequestActive: false })),
	on(selectCity, (state, action) => {
		let newState = { ...state };
		newState.selectedCity = action.payload;
		if (!newState.savedCities.some(savedCity => savedCity.id === action.payload.id)) {
			const cities = newState.savedCities.slice();
			newState = {...newState, savedCities: cities}
		}
		return newState;
	}),
	on(weatherRequest, (state) => ({ ...state, isWeatherRequestActive: true })),
	on(weatherResult, (state, action) => {
		let newState = { ...state };
		newState.isWeatherRequestActive = false;

		let updateIDX = -1;

		newState[action.mode].some((existedForecast, idx) => {
			if (existedForecast.cityId === action.city.id) {
				updateIDX = idx;
				return true;
			}
			return false;
		});

		const updatedData = newState[action.mode].slice();
		if (updateIDX >= 0) {
			updatedData[updateIDX] = {...updatedData[updateIDX], data: action.data};
		} else {
			updatedData.push({cityId: action.city.id, data: action.data});
		}
		newState = {...newState, [action.mode]: updatedData}

		return newState;
	}),
	on(weatherModeChange, (state, action) => ({ ...state, forecastMode: action.payload })),
);

export function reducer(state: WeatherAppState | undefined, action: Action) {
	return weatherReducer(state, action);
}
