import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { WeatherAppState, WeatherForecastApiService } from '@bp/weather-forecast/services';
import * as WeatherActions from './weather.actions';
import * as WeatherSelectors from './weather.selectors';
import { map, mergeMap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable()
export class WeatherEffects {

	searchCity$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(WeatherActions.searchCityRequest),
			mergeMap(action => this.api.searchCity(action.payload)
				.pipe(
					map(cities => WeatherActions.searchCityResult({ payload: cities })),
				),
			),
		);
	});

	searchCityForecast$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(WeatherActions.weatherRequest),
			mergeMap((action) => {
				return this.api.getForecast(action.city, action.mode)
					.pipe(
						map(forecast => WeatherActions.weatherResult({ city: action.city, mode: action.mode, data: forecast })),
					);
			}),
		);
	});

	selectCity$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(WeatherActions.selectCity),
			withLatestFrom(
				this.store.select(WeatherSelectors.forecastActiveMode),
				this.store.select(WeatherSelectors.getSelectedCityForecast),
			),
			map(([action, mode, weatherData]) => {
				if (weatherData.length) {
					return WeatherActions.weatherResult({city: action.payload, mode, data: weatherData[0].data})
				} else {
					return WeatherActions.weatherRequest({ city: action.payload, mode });
				}
			}),
		);
	});

	changeForecastMode$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(WeatherActions.weatherModeChange),
			withLatestFrom(
				this.store.select(WeatherSelectors.selectedCity),
				this.store.select(WeatherSelectors.getSelectedCityForecast),
			),
			map(([action, selectedCity, weatherData]) => {
				if (!selectedCity) {
					return WeatherActions.noopAction();
				}
				if (weatherData.length) {
					return WeatherActions.weatherResult({city: selectedCity, mode: action.payload, data: weatherData[0].data})
				} else {
					return WeatherActions.weatherRequest({ city: selectedCity, mode: action.payload });
				}
			}),
		);
	});

	constructor(
		private readonly actions$: Actions,
		private api: WeatherForecastApiService,
		private store: Store<WeatherAppState>,
	) {
	}
}
