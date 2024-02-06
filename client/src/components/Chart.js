import React from 'react'
import { Chart } from 'react-google-charts'
import '../styles/Chart.css'

const WeeklyChart = () => {
    const columnColors = [
        '#003459',
        '#007EA7',
        '#00A8E8',
        '#8ADFFF'
    ]
    const temperatureData = [
        ['Name', 'Weekly Score', {role: 'style'}],
        ['Zechariah', 1200],
        ['Tom', 1200],
        ['Jessica', 1000],
        ['Jared', 900],].sort((a, b) => a[1] - b[1]);
        
    for (let i = 1; i < temperatureData.length; i++) {
            temperatureData[i][2] = columnColors[i - 1]
        }
    
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