import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';


const Chart = ({ forecastData }) => {
  if (!forecastData || !forecastData.list) {
    return <p>No forecast data available.</p>;
  }

  const data = forecastData.list.map((item) => ({
      datetime: item.dt_txt,
      temperature: item.main.temp,
  }));


  return (
    <div className="overflow-x-auto">
      <LineChart
        width={700}
        height={380}
        data={data}
        margin={{
          top: 5,
          right: 20,
          left: 20,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="datetime" label={{ value: 'Date & Time', position: 'insideBottom', offset: -10 }} />
        <YAxis label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Line type="monotone" dataKey="temperature" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </div>
  );
};

export default Chart;
