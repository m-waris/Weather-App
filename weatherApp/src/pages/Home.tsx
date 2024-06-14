//Home.tsx
import logo from '../assets/logo.svg'
import Search from '../components/Search'

export default function Home() {
    return (
        <>
            <div className='main'>
                <div className='logo'>
                    <img src={logo} alt="Logo" />
                </div>
                <div className='title'>
                    <h1>Welcome to <span>Weather App</span></h1>
                    <p>Choose a location to see Weather forecast</p>
                </div>
                <Search />
            </div>
        </>
    )
}
