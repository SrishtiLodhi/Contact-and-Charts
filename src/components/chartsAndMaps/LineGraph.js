import React, { useEffect, useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto'; // Import the full Chart.js
import { Chart as ChartJS, TimeScale, Title } from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { enUS } from 'date-fns/locale';


const LineGraph = () => {
  const [loading, setLoading] = useState(true);

  const chartRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          'https://disease.sh/v3/covid-19/historical/all?lastdays=all'
        );
        const data = await response.json();

        // Process data to fit Chart.js format
        const casesData = data.cases;
        const dates = Object.keys(casesData);
        const cases = Object.values(casesData);

        const formattedData = {
          labels: dates,
          datasets: [
            {
              label: 'Total Cases',
              data: cases,
              fill: false,
              borderColor: 'rgba(75,192,192,1)',
            },
          ],
        };

        const chartInstance = new ChartJS(chartRef.current, {
          type: 'line',
          data: formattedData,
          options: {
            scales: {
              x: {
                type: 'time',
                adapters: {
                  date: {
                    locale: enUS, // Replace with your desired locale
                  },
                },
              },
              y: {
                beginAtZero: true,
              },
            },
          },
        });
        

        setLoading(false); // Data is loaded, set loading to false
      } catch (error) {
        console.error('Error fetching graph data', error);
        setLoading(false); // Error occurred, set loading to false
      }
    }

    fetchData();

    return () => {
      const chartInstance = chartRef.current;
      if (chartInstance) {
        chartInstance.destroy(); // Destroy the chart instance when unmounting
      }
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  );
};

export default LineGraph;
