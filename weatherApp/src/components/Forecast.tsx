import logo from '../assets/imgs/logo2.svg';
import divider from '../assets/imgs/divider.svg';

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

type Props = {
  weatherData: WeatherType;
};

export default function Forecast({ weatherData }: Props): JSX.Element {
  return (
    <>
      <div className="relative min-h-screen flex flex-col lg:flex-row p-4 gap-4">
        <div className='flex flex-col gap-6'>
          {/* Action */}
          <div className="flex w-full ">
            <img src={logo} alt="Logo" className="mr-4" />
            <input
              type="text"
              className="py-[12px] px-[28px] border-none rounded-[8px] bg-[#22222F] w-full"
              placeholder="Search Location"
            />
          </div>

          {/* Today */}
          <div className="forecast flex flex-col  rounded-[8px] p-4 bg-[#16161F]">
            {/* info */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
              {/* location */}
              <div className="flex flex-col">
                <p className="text-xl font-semibold">{weatherData.city.name}</p>
                <p>{weatherData.city.country}</p>
              </div>
              <p>
                {new Date(weatherData.city.timezone * 1000).toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>

            {/* weather */}
            <div className="flex flex-col items-start lg:items-end gap-4 lg:gap-12">
              <p className="text-[76px]">
                {Math.round(weatherData.list[0].main.temp) + '°C'}
              </p>
              {/* details */}
              <div className="flex items-center gap-4">
                <p>
                  {Math.round(weatherData.list[0].main.temp_min) +
                    ' / ' +
                    Math.round(weatherData.list[0].main.temp_max)}
                </p>
                <img src={divider} alt="Divider" className="" />
                <p>{weatherData.list[0].weather[0].description.toUpperCase()}</p>
              </div>
            </div>
          </div>

        </div>

        {/* Weather details */}
        <div className="flex flex-col w-full h-4/6 p-4 gap-4 border-[1px] border-[#2D2D3A] rounded-[8px] bg-[#16161F]">
          <div>
            <p className="text-lg font-semibold">Details</p>
          </div>
          {/* list */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center border-b-[1px] border-[#1C1C27] p-4">
              <p>Feels like</p>
              <p className="text-[20px] font-[700]">{Math.round(weatherData.list[0].main.feels_like) + '°C'}</p>
            </div>
            <div className="flex justify-between items-center border-b-[1px] border-[#1C1C27] p-4">
              <p>Probability of rain</p>
              <p className="text-[20px] font-[700]">{weatherData.list[0].pop + '%'}</p>
            </div>
            <div className="flex justify-between items-center border-b-[1px] border-[#1C1C27] p-4">
              <p>Wind speed</p>
              <p className="text-[20px] font-[700]">{weatherData.list[0].wind.speed + 'm/s'}</p>
            </div>
            <div className="flex justify-between items-center border-b-[1px] border-[#1C1C27] p-4">
              <p>Air Humidity</p>
              <p className="text-[20px] font-[700]">{weatherData.list[0].main.humidity + '%'}</p>
            </div>
            <div className="flex justify-between items-center border-b-[1px] border-[#1C1C27] p-4">
              <p>UV Index</p>
              <p className="text-[20px] font-[700]">0</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
