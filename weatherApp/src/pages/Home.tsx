// Home.tsx
import logo from '../assets/logo.svg'
import Forecast from '../components/Forecast'
import Search from '../components/Search'
import { ChangeEvent, useState } from "react"

type listType = {
    name: string,
    lat: number,
    lon: number,
}

type WeatherType = {
    local_names: { [key: string]: string };
    list: [
        {
            dt: number;
            main: {
                feels_like: number;
                temp: number;
                temp_min: number;
                temp_max: number;
                humidity: number;
            };
            weather: [
                {
                    main: string;
                    description: string;
                    icon: string;
                }
            ];
            wind: {
                speed: number;
                deg: number;
            };
            clouds: {
                all: number;
            };
            dt_txt: string;
            pop: number;
            visibility: number;
        }
    ];
    city: {
        id: number;
        name: string;
        coord: {
            lat: number;
            lon: number;
        };
        country: string;
        population: number;
        timezone: number;
        sunrise: number;
        sunset: number;
    };
};


export default function Home() {
    const [search, setSearch] = useState<string>('')
    const [list, setList] = useState<Array<listType>>([])
    const [selectedOption, setSelectedOption] = useState<listType | null>(null)
    const [weatherData, setWeatherData] = useState<WeatherType | null>(null)

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearch(value)
        if (value === '') {
            setList([])
            return
        }
        getOptions(value)
    }

    const getOptions = (value: string) => {
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${import.meta.env.VITE_WEATHER_API}`)
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setList(data)
                } else {
                    setList([])
                }
            })
            .catch((error) => {
                console.error("Error fetching options:", error)
                setList([])
            })
    }

    const onOptionSelect = (option: listType) => {
        console.log(option)
        setSelectedOption(option)
        setList([])
        setSearch(option.name)
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${option.lat}&lon=${option.lon}&units=metric&exclude=minutely,hourly&appid=${import.meta.env.VITE_WEATHER_API}`)
            .then((response) => response.json())
            .then((data) => {
                setWeatherData(data)
            })
            .catch((error) => {
                console.error("Error fetching weather data:", error)
            })
    }

    return (
        <>

            {
                weatherData ? (
                    <div>
                        <Forecast
                            weatherData={weatherData}

                        />
                    </div>

                ) : (
                    <>
                        <div className=' relative min-h-screen flex flex-col justify-center items-center text-center text-white'>
                            <div className=" absolute top-[46px]">
                                <img src={logo} alt="Logo" />
                            </div>
                            <div className=' absolute top-[240px]'>
                                <div>
                                    <h1 className="text-[32px] font[700] mb-2">Welcome to <span className="text-[#8FB2F5]">Weather App</span></h1>
                                    <p className="text-[20px] font[400] text-[#BFBFD4]">Choose a location to see Weather forecast</p>
                                </div>
                                <div className="mt-4 relative">
                                    <Search
                                        search={search}
                                        list={list}
                                        onOptionSelect={onOptionSelect}
                                        onInputChange={onInputChange}
                                    />
                                </div>
                            </div>

                        </div>


                    </>
                )

            }


        </>
    )
}
