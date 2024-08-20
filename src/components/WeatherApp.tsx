import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container, Box, Card, CardContent, Grid } from '@mui/material';
import { fetchWeatherData, DailyWeatherData, fetchCoordinates } from '../services/weatherService';
// @ts-ignore
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm } from 'weather-icons-react';

const WeatherApp: React.FC = () => {
  const [latitude, setLatitude] = useState(51.5085);
  const [longitude, setLongitude] = useState(-0.1257); 
  const [weatherData, setWeatherData] = useState<DailyWeatherData[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState<string>('London');

  useEffect(() => {
    const getWeather = async () => {
      try {
        const data = await fetchWeatherData(latitude, longitude);
        setWeatherData(data);
      } catch (err) {
        handleError(err as Error);
      }
    };

    getWeather();
  }, [latitude, longitude]);

  const handleError = (error: Error) => {
    setError(error.message);
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleCitySearch = async () => {
    try {
      const { latitude, longitude } = await fetchCoordinates(city);
      setLatitude(latitude);
      setLongitude(longitude);
      setError(null);
    } catch (err) {
      handleError(err as Error);
    }
  };

  const getDayOfWeek = (date: string) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const day = new Date(date).getDay();
    return days[day];
  };

  const getWeatherIcon = (weatherCode: number) => {
    switch (weatherCode) {
      case 0:
        return <WiDaySunny size={48} color='#000' />;
      case 1:
      case 2:
      case 3:
        return <WiCloudy size={48} color='#000' />;
      case 61:
      case 63:
      case 65:
        return <WiRain size={48} color='#000' />;
      case 71:
      case 73:
      case 75:
        return <WiSnow size={48} color='#000' />;
      case 95:
      case 96:
      case 99:
        return <WiThunderstorm size={48} color='#000' />;
      default:
        return <WiCloudy size={48} color='#000' />;
    }
  };

  return (
    <Container style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '15px', padding: '20px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }}>
    <Box display="flex" flexDirection="column" alignItems="center" p={2}>
      <Typography variant="h4" gutterBottom>
        Weather App
      </Typography>
      <TextField label="City" value={city} onChange={handleCityChange} margin="normal" />
      <Button variant="contained" color="primary" onClick={handleCitySearch}>
        Search
      </Button>
      {error && (
        <Typography color="error" variant="body1" style={{ marginTop: '20px' }}>
          {error}
        </Typography>
      )}
      {weatherData && (
        <Box mt={4} style={{ width: '100%' }}>
          <Card style={{ marginBottom: '20px', padding: '20px', textAlign: 'center' }}>
            <Typography variant="h5">{getDayOfWeek(weatherData[0].date)}</Typography>
            <Typography variant="h6">{new Date(weatherData[0].date).toDateString()}</Typography>
            {getWeatherIcon(weatherData[0].weatherCode)}
            <Typography variant="h2">{weatherData[0].temperatureMax}°C</Typography>
            <Typography variant="body1">High: {weatherData[0].temperatureMax}°C / Low: {weatherData[0].temperatureMin}°C</Typography>
          </Card>
          <Grid container spacing={2}>
            {weatherData.slice(1).map((day, index) => (
              <Grid item xs={2} key={index}>
                <Card style={{ textAlign: 'center' }}>
                  <CardContent>
                    <Typography variant="h6">{getDayOfWeek(day.date)}</Typography>
                    {getWeatherIcon(day.weatherCode)}
                    <Typography variant="body2">{day.temperatureMax}°C</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  </Container>
  );
};

export default WeatherApp;