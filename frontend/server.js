const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());

app.get('/proxy', async (req, res) => {
  try {
    const { start, end, steps, overview, alternatives } = req.query;
    const url = `https://api.openstreetmap.org/routing/v1/driving?start=${start}&end=${end}&steps=${steps}&overview=${overview}&alternatives=${alternatives}`;

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      if (data.routes && data.routes.length > 0) {
        console.log('Response data:', data.routes[0]);
        res.json(data.routes[0]);
      } else {
        console.error('No route data available in the response:', data);
        res.status(500).json({ error: 'No route data available in the response from the OpenStreetMap API.' });
      }
    } else {
      const errorData = await response.json();
      console.error('Error fetching data from OpenStreetMap API:', errorData);
      res.status(500).json({ error: 'An error occurred while fetching the data from the OpenStreetMap API.' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An unexpected error occurred while fetching the data from the OpenStreetMap API.' });
  }
});

app.listen(port, () => {
  console.log(`CORS proxy server is running on port ${port}`);
});