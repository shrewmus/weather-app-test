import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromWeather from './+state/weather/weather.reducer';
import { WeatherEffects } from './+state/weather/weather.effects';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	imports: [
		CommonModule,
		HttpClientModule,
		StoreModule.forFeature(fromWeather.WEATHER_FEATURE_KEY, fromWeather.reducer),
		EffectsModule.forFeature([WeatherEffects]),
	],
})
export class WeatherForecastServicesModule {}
