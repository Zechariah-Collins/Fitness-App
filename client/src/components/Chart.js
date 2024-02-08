import React, {useEffect, useState} from 'react'
import { Chart } from 'react-google-charts'
import '../styles/Chart.css'

const WeeklyChart = () => {

  const token = localStorage.getItem('jwtToken')

  const [points, setPoints] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/points', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(points => setPoints(points))
    console.log(points)
  }, [])

    const columnColors = [
        '#003459',
        '#007EA7',
        '#00A8E8',
        '#8ADFFF'
    ]
    const sortedData = points.sort((a, b) => {
      // First, compare weekly_points
      if (a.weekly_points !== b.weekly_points) {
        return a.weekly_points - b.weekly_points; // Sort by weekly_points descending
      } else {
        // If weekly_points are the same, sort by name alphabetically
        return a.first_name.localeCompare(b.first_name);
      }
    });

    const temperatureData = [
      ['Name', 'Weekly Score', { role: 'style' }], // Column headings
      ...sortedData.map((item, index) => [
        item.first_name, // Assuming `first_name` is the property you want to use as the name
        item.weekly_points, // Assuming `weekly_points` is the property you want to use as the score
        columnColors[index] // Use the index to get the corresponding color
      ])
    ];

    
  return (
    <div className='rounded-container'>
        <Chart 
            chartType="ColumnChart" 
            data={temperatureData} 
            width='190px'
            options={
                {
                backgroundColor:'transparent',
                legend: 'none',
                hAxis: {
                    textStyle: {
                      color: 'gray', 
                    },
                  },
                  vAxis: {
                    textStyle: {
                        color: 'gray', 
                    }
                  }
                }}/>
    </div>
  )
}

export default WeeklyChart