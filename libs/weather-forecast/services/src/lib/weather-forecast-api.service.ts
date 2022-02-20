import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City, ForecastData, ForecastMode } from 'libs/weather-forecast/services/src/lib/+state/weather/weather.models';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WeatherForecastApiService {

	private static cleanString(value: string): string {
		return value.replace(/[|&;$%@"<>()+,]/g, '');
	}

	private static getCityId(city: { name: string, country: string }): string {
		return `${city.name}_${city.country}`;
	}

	private _apiKey = '1173b06aeb94c9d65e6f9a6c9d99cd10';

	constructor(private http: HttpClient) {}

	searchCity(cityName: string): Observable<City[]> {
		cityName = WeatherForecastApiService.cleanString(cityName);
		const url = 'http://api.openweathermap.org/geo/1.0/direct';
		return this.http.get(url, {
			params: {
				q: cityName,
				limit: 0,
				appid: this._apiKey,
			},
		}).pipe(
			map((resultItem: any): City[] => {
				resultItem.id = WeatherForecastApiService.getCityId({name: resultItem.name, country: resultItem.country});
				return  resultItem;
			}),
			catchError((err) => throwError(err.message)),
		);
	}

	getForecast(city: City, mode: ForecastMode): Observable<ForecastData[]> {
		// HOURLY (excluded daily) `https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude=current,minutely,daily,alerts&units=metric&appid={API key}`
		// DAILY `https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude=current,minutely,hourly,alerts&units=metric&appid={API key}`
		const url = 'https://api.openweathermap.org/data/2.5/onecall';
		const reMode = (mode === ForecastMode.Hourly) ? ForecastMode.Daily : ForecastMode.Hourly;
		return this.http.get(url, {
			params: {
				lat: city.lat,
				lon: city.lon,
				exclude: `current,minutely,${reMode},alerts`,
				appid: this._apiKey,
				units: 'metric',
			},
		}).pipe(
			map((response: any) => {
				return (mode === ForecastMode.Hourly)
					? response[mode]
					: response[mode].map((item: any) => {
						item.temp = item.temp.day;
						return item
					})
			}),
			catchError((err) => throwError(err.message)),
		);
	}
}
