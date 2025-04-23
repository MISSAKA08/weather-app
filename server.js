const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

// ✅ Your API key is hardcoded here
const apiKey = '7b2fd1c813995d4d0655326caeaf74c1';

app.use(express.static('public'));

app.get('/api/weather', async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.response?.data?.message || 'Failed to fetch weather' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
