import { useEffect, useState } from "react";
import axios from 'axios'
import "./App.css"


function App() {
  const [weather,setweather]=useState("");

  const[loading,setLoading]=useState(false);
  const[weatherdata,setweatherdata]=useState([]);
  const apikey="e7485cf48ab044898ae184418240207"
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${weather}`);
      setweatherdata(response.data);
     
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert("Failed to fetch weather data");
      setweatherdata("")
      setweather("")
    }
  };
  console.log(weatherdata)

  
  return (
    <div className="App">
      <form onSubmit={(e)=>handleSubmit(e)}>
        <input style={{width:"300px",height:"40px",borderRadius:"10px",border:"1px solid rgb(250, 250, 250)",margin:"10px",paddingLeft:"5px"}} placeholder="Enter city name" value={weather} onChange={(e)=>setweather(e.target.value)}/>
        <button type="submit"  style={{width:"100px",height:"40px",borderRadius:"10px",border:"1px solid rgb(250, 250, 250)",margin:"10px",background:"rgb(0, 153, 0)",color:"white"}}>Search</button>
      </form>
     {loading&& <p>Loading data...</p>}
     {(weatherdata.length!==0&& loading===false)&&<div className="weather-cards">
      <div className="weather-card">
       <h3>Temperature</h3>
       <p>{weatherdata.current.temp_c
       }°C</p>
      </div>
      
      
      <div className="weather-card"> <h3>Humidity</h3><p>{weatherdata.current.humidity
      }%</p></div>
      <div className="weather-card"> <h3>Condition</h3><p>{weatherdata.current.condition.text}</p></div>
      <div className="weather-card"> <h3>Wind Speed</h3><p>{weatherdata.current.wind_kph
      } Kph</p></div>
     </div>}
     
     
    </div>
  );
}

export default App;
