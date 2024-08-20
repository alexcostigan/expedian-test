// src/services/weatherService.ts

import axios from 'axios';

export interface DailyWeatherData {
  date: string;
  temperatureMax: number;
  temperatureMin: number;
  weatherCode: number;
}

export const fetchWeatherData = async (latitude: number, longitude: number): Promise<DailyWeatherData[]> => {
  const url = 'https://api.open-meteo.com/v1/forecast';
  const params = {
    latitude,
    longitude,
    daily: 'temperature_2m_max,temperature_2m_min,weathercode',
    timezone: 'auto',
  };

  try {
    const response = await axios.get(url, { params });
    const { daily } = response.data;

    const weatherData = daily.time.map((date: string, index: number) => ({
      date,
      temperatureMax: daily.temperature_2m_max[index],
      temperatureMin: daily.temperature_2m_min[index],
      weatherCode: daily.weathercode[index],
    }));

    return weatherData;
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
};

export const fetchCoordinates = async (city: string): Promise<{ latitude: number; longitude: number }> => {
  const url = 'https://geocoding-api.open-meteo.com/v1/search';
  try {
    const response = await axios.get(url, {
      params: {
        name: city,
      },
    });
    if (response.data.results && response.data.results.length > 0) {
      const { latitude, longitude } = response.data.results[0];
      return { latitude, longitude };
    } else {
      throw new Error('Location not found');
    }
  } catch (error) {
    throw new Error('Failed to fetch coordinates');
  }
};