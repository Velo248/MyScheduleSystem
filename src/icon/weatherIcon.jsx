import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faSun, faCloudRain, faCloud,
} from "@fortawesome/free-solid-svg-icons"

// 지속적으로 weather 정보 추가

function WeatherIcon({ weather }) {
    return <FontAwesomeIcon icon={getWeatherIcon.call(this, weather)} />
}

export default WeatherIcon

function getWeatherIcon(weather) {
    switch(weather) {
        case "Clear": return faSun
        case "Rain": return faCloudRain
        // case "Snow": return faCloudHail
        case "Clouds": return faCloud
        default: return faSun
    }
}