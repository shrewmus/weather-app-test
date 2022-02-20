import { City, ForecastMode, WeatherAppState } from 'libs/weather-forecast/services/src/lib/+state/weather/weather.models';
import { createSelector } from '@ngrx/store';

export const getState = (state: any) =>  state.weather;
export const selectData = createSelector(getState, (state: WeatherAppState) => {const {hourly, daily} = state; return {hourly, daily}});
export const selectSavedCities = createSelector(getState, (state: WeatherAppState) => state.savedCities);
export const selectedCity = createSelector(getState,(state: WeatherAppState) => state.selectedCity);
export const responseCities = createSelector(getState, (state: WeatherAppState) => state.responseCities);
export const isCityRequest = createSelector(getState, (state: WeatherAppState) => state.isCityRequestActive);
export const isWeatherRequest = createSelector(getState, (state: WeatherAppState) => state.isWeatherRequestActive);
export const forecastActiveMode = createSelector(getState,(state: WeatherAppState) => state.forecastMode);
export const getSelectedCityForecast = createSelector(
	selectedCity,
	forecastActiveMode,
	selectData,
	(city: City | null, mode: ForecastMode, data) => {
		return city ? data[mode].filter(dataItem => dataItem.cityId === city.id) : [];
	}
);

