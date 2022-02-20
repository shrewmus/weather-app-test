import { Component, OnDestroy, OnInit } from '@angular/core';
import {
	City,
	forecastActiveMode,
	ForecastMode,
	isCityRequest,
	responseCities,
	searchCityRequest,
	searchCityResult,
	selectCity, selectedCity,
	WeatherAppState,
	weatherModeChange,
} from '@bp/weather-forecast/services';
import { Store } from '@ngrx/store';
import { ReplaySubject, takeUntil } from 'rxjs';

@Component({
	selector: 'bp-city-selector',
	templateUrl: './city-selector.component.html',
	styleUrls: ['./city-selector.component.scss'],
})
export class CitySelectorComponent implements OnInit, OnDestroy {

	private destroy$ = new ReplaySubject<boolean>(1);

	selectedCity$ = this.store.select(selectedCity);
	selectedMode$ = this.store.select(forecastActiveMode);
	isSityRequest$ = this.store.select(isCityRequest);
	responseCities$ = this.store.select(responseCities);

	selectedMode = '';
	modes = Object.values(ForecastMode);

	searchText = "";

	constructor(private store: Store<WeatherAppState>) {}

	ngOnInit(): void {
		this.selectedMode$.pipe(
			takeUntil(this.destroy$)
		).subscribe((res) => {
			this.selectedMode = res;
		})
	}

	ngOnDestroy() {
		this.destroy$.next(true);
		this.destroy$.complete();
	}

	changeForecastMode(event: ForecastMode) {
		this.store.dispatch(weatherModeChange({payload: event}));
	}

	onCityTyping(event: KeyboardEvent) {
		const val = (event.currentTarget as HTMLInputElement).value;
		if (val.length >=3) {
			this.store.dispatch(searchCityRequest({payload: val}));
		}
	}

	clearSearch() {
		this.searchText = "";
		this.store.dispatch(searchCityResult({payload: []}));
	}

	selectCity(city: City) {
		this.clearSearch();
		this.store.dispatch(selectCity({payload: city}));
	}
}
