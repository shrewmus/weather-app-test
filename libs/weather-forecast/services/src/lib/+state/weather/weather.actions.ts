import { createAction, props } from '@ngrx/store';
import { City, ForecastData, ForecastMode } from 'libs/weather-forecast/services/src/lib/+state/weather/weather.models';

export const SEARCH_CITY_REQUEST = '[WeatherApi] search city request';
export const SEARCH_CITY_RESULT = '[WeatherApi] search city result';
export const SELECT_CITY = '[WeatherApp] select city';
export const WEATHER_REQUEST = '[WeatherApi] weather request';
export const WEATHER_RESULT = '[WeatherApi] weather result';
export const WEATHER_MODE_CHANGE = '[WeatherApp] weather mode chage';
export const NOOP_ACTION = '[WeatherApp NOOP] noop';

export const searchCityRequest = createAction(SEARCH_CITY_REQUEST, props<{ payload: string }>());
export const searchCityResult = createAction(SEARCH_CITY_RESULT, props<{ payload: City[] }>());
export const selectCity = createAction(SELECT_CITY, props<{ payload: City }>());

export const weatherRequest = createAction(WEATHER_REQUEST, props<{ city: City, mode: ForecastMode }>());
export const weatherResult = createAction(WEATHER_RESULT, props<{ city: City, mode: ForecastMode, data: ForecastData[] }>());

export const weatherModeChange = createAction(WEATHER_MODE_CHANGE, props<{ payload: ForecastMode }>());

export const noopAction = createAction(NOOP_ACTION);
