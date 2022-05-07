const WeatherStatics = ({ country, data }) => {
    return (
        <>
            <h2>Weather in {country.name.common}</h2>
            <div>
                <p><strong>temperature</strong> {data.current.temperature} Celcius</p>
                <img src={data.current.weather_icons[0]} width="5%" height="5%"></img>
                <p><strong>wind</strong>{data.current.wind_speed} mph direction {data.current.wind_dir}</p>
            </div>
        </>
    )
}
export default WeatherStatics;


