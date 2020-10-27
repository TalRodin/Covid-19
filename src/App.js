import React, {useState,useEffect} from 'react';
import {FormControl,Card,Switch, MenuItem,CardContent, Select, Paper} from '@material-ui/core'
import './App.css';
import Map from './Map'
import Table from './Table'
import InfoBox from './InfoBox'
import LineGraph from './LineGraph'
import {sortData,prettyPrintStat} from "./util"
import "leaflet/dist/leaflet.css"
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import PieChart from './PieChart/PieChart'
import CircleBar from './CircleBarTitle/CircleBar'
import RadarGraph from './RadarGraph'
import StartPage from './StartPage'


function App() {
  //https://disease.sh/v3/covid-19/countries
  const [countries, setCountries] = useState(['USA', 'UK', 'RUSSIA'])
  const [country, setCountry] = useState('worldwide')
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([])
  const [mapCenter, setMapCenter] =useState({lat:34.800746, lng: -40.4796})
  const [mapZoom,setMapZoom]=useState(3)
  const [mapCountries, setMapCountries] = useState([])
  const [casesType, setCasesType] = useState("cases")
  const [darkMode, setDarkMode] = useState(false)
  const [seconds, setSeconds] = useState(0);
  useEffect(()=>{
    
    fetch(`https://disease.sh/v3/covid-19/all`)
    .then(response=>response.json())
    .then(data=>{
      setCountryInfo(data)
      console.log(data)
    })
  },[])
 
  // useEffect(() => {
  //   const interval = setInterval(() => {
      
  //     fetch(`https://disease.sh/v3/covid-19/all`)
  //   .then(response=>response.json())
  //   .then(data=>{
  //     setCountryInfo(data)
  //     console.log(data)
  //   })
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  useEffect(()=>{
    const getCountriesData = async()=>{
      await fetch(`https://disease.sh/v3/covid-19/countries`)
      .then((response)=>response.json())
      .then((data)=>{
        const countries = data.map((country)=>({
          name: country.country,
          value: country.countryInfo.iso2
        }))
        const sortedData = sortData(data)
        setTableData(sortedData)
        setMapCountries(data)
        setCountries(countries)
      })
    }
    getCountriesData()
  }, [])
  
  const onCountryChange = async (event) =>{
    const countryCode = event.target.value
    setCountry(countryCode)
    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`
  await fetch(url)
  .then(response=>response.json())
  .then(data=>{
    setCountry(countryCode)
    setCountryInfo(data)

    setMapCenter([data.countryInfo.lat,data.countryInfo.long])
    setMapZoom(4)
  })
  }
  console.log('******',countryInfo)
  
 //https://disease.sh/v3/covid-19/all
 //https://disease.sh/v3/covid-19/countries/[COUNTRY_CODE]

  

  const theme = createMuiTheme({
    palette:{
      type:darkMode?'dark':'light'
      
    }
  })
  return (
    <>
    <StartPage/>
    <ThemeProvider theme={theme}>
    {/* <Paper  style={{height: "240vh"  }}> */}
    
    <div className="app">
      
      <div className='app_first_row'>
      <div className="app__left">
      {/* <Switch 
      defaultChecked
      color="default"
      inputProps={{ 'aria-label': 'checkbox with default color' }}
      onChange={()=>setDarkMode(!darkMode)}
      /> */}
     
        <div className = "app__header">
          
                
                <FormControl className="app__dropdown">
                  <Select
                  variant = "outlined"
                  onChange={onCountryChange}
                  value={country}>
                    <MenuItem value="worldwide">Worldwide</MenuItem>
                    {
                      countries.map(country=>(
                      <MenuItem value={country.value}>{country.name}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
          </div>
          <div className="app_stats">
        <InfoBox 
        colorR='#5371f9'
        active = {casesType ==="cases"}
        onClick={e=>setCasesType('cases')}
        title="Coronavirus Cases" 
        cases={prettyPrintStat(countryInfo.todayCases)} total={prettyPrintStat(countryInfo.cases)}/>
        <InfoBox 
        active = {casesType ==="recovered"}
        onClick={e=>setCasesType('recovered')}
        title="Recovered"cases={prettyPrintStat(countryInfo.todayRecovered)}  total={prettyPrintStat(countryInfo.recovered)}/>
        <InfoBox 
         isBlue
         active = {casesType ==="deaths"}
        onClick={e=>setCasesType('deaths')}
        title="Deaths" cases={prettyPrintStat(countryInfo.todayDeaths)} total={prettyPrintStat(countryInfo.deaths)}/>
          </div>
      <Map 
      casesType={casesType}
      countries={mapCountries}
      center={mapCenter}
      zoom={mapZoom}
      />
      
      </div>
    
      </div>
      <div className="app_first_row">
      <Card className="app__right">
          <CardContent >
            <h3>Live Cases by Country</h3>
            <Table countries = {tableData}/>
                  <h3 className="app__graphTitle">Worldwide new cases {casesType}</h3>
            <LineGraph className="app_graph" casesType={casesType}/>
          </CardContent>
      </Card>
      </div>
      <div className="app_first_row">
     
      <Card className="app__bottom__left">
      
         <PieChart data={countryInfo.todayCases}/>
         
      </Card>
      </div>
      <div className="app_first_row">
      <Card className="app__bottom__left">
         <CircleBar countries = {tableData}/>
      </Card>
      </div>
      <div className="app_first_row">
      <Card className="app__bottom__left">
         <RadarGraph countries = {tableData}/>
      </Card>
      </div>
      
    </div>
      
      
     
    {/* </Paper> */}
    </ThemeProvider>
    </>
  );
}

export default App;
