import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { forecastActiveMode, ForecastMode, getSelectedCityForecast, selectedCity, WeatherAppState } from '@bp/weather-forecast/services';

@Component({
	selector: 'bp-forecast-table',
	templateUrl: './forecast-table.component.html',
	styleUrls: ['./forecast-table.component.scss'],
})
export class ForecastTableComponent implements OnInit {

	selectedCity$ = this.store.select(selectedCity);
	selectedMode$ = this.store.select(forecastActiveMode);
	selectData$ = this.store.select(getSelectedCityForecast);

	constructor(private store: Store<WeatherAppState>) {
	}

	ngOnInit(): void {
	}

	formatTime(mode: ForecastMode | null, dt: number) {
		const tempDate = new Date(dt * 1000);
		let strTime = `${tempDate.getHours()}:${tempDate.getMinutes()}`;
		if (mode === ForecastMode.Daily) {
			strTime = `${tempDate.getDate()}/${tempDate.getMonth()+1}`
		}
		return strTime;
	}
}
