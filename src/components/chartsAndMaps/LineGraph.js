import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, TimeScale, LinearScale, Title, Tooltip, Legend, LineElement, PointElement } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { enUS } from 'date-fns/locale';

// Register Chart.js components
ChartJS.register(TimeScale, LinearScale, Title, Tooltip, Legend, LineElement, PointElement);

const LineGraph = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
        const responseData = await response.json();

     // Process data to fit Chart.js format
        const casesData = responseData.cases;
        const dates = Object.keys(casesData).map(date => new Date(date).toISOString().split('T')[0]);
        const cases = Object.values(casesData);
  
        const formattedData = {
          labels: dates,
          datasets: [
            {
              label: 'Total Cases',
              data: cases,
              fill: false,
              borderColor: 'rgba(75,192,192,1)',
              tension: 0.1,
            },
          ],
        };
  
        setData(formattedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching graph data', error);
        setLoading(false);
      }
    }
  
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Line
        data={data}
        options={{
          scales: {
            x: {
              type: 'time',
              adapters: {
                date: {
                  locale: enUS,
                },
              },
            },
            y: {
              type: 'linear',
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default LineGraph;
