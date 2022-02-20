import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { CitySelectorComponent } from './city-selector/city-selector.component';
import { ForecastTableComponent } from './forecast-table/forecast-table.component';
import { FormsModule } from '@angular/forms';
import { WeatherForecastServicesModule } from '@bp/weather-forecast/services';

@NgModule({
	declarations: [AppComponent, CitySelectorComponent, ForecastTableComponent],
	imports: [
		BrowserModule,
		FormsModule,
		StoreModule.forRoot({}),
		EffectsModule.forRoot([]),
		!environment.production ? StoreDevtoolsModule.instrument() : [],
		WeatherForecastServicesModule
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {
}
