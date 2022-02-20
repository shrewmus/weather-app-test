
export interface City {
	name: string;
	id: string;
	lat: number;
	lon: number;
	country: string;
	state?: string;
}

export enum ForecastMode {
	Hourly = 'hourly',
	Daily = 'daily'
}


export interface ForecastData {
	dt: number;
	temp: number;
}

export interface WeatherAppState {
	forecastMode: ForecastMode;
	isWeatherRequestActive: boolean;
	isCityRequestActive: boolean;
	responseCities: City[];
	savedCities: City[];
	selectedCity: City | null;
	hourly: WeatherData[];
	daily: WeatherData[];
}

export interface WeatherData {
	cityId: string;
	data: ForecastData[];
}
