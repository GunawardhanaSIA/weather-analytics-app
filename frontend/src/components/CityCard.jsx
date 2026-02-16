import React from 'react'
import { GoTrophy } from "react-icons/go";
import { FiAward } from "react-icons/fi";
import { IoMedalOutline } from "react-icons/io5";
import { IoMdCloudOutline } from "react-icons/io";
import { LuThermometer } from "react-icons/lu";
import { LuWind } from "react-icons/lu";
import { MdOutlineWaterDrop } from "react-icons/md";
import { IoMdTrendingUp } from "react-icons/io";

const getRankBadge = (rank) => {
    if (rank === 1) {
        return (
            <span className="badge badge-sm bg-yellow-500 hover:bg-yellow-600 text-white border-0 flex items-center gap-1">
                <GoTrophy className="w-3 h-3" aria-hidden="true" />
                #1 Most Comfortable
            </span>
        );
    }
    if (rank === 2) {
        return (
            <span className="badge badge-sm bg-gray-400 hover:bg-gray-500 text-white border-0 flex items-center gap-1">
                <FiAward className="w-3 h-3" aria-hidden="true" />
                #2 Runner Up
            </span>
        );
    }
    if (rank === 3) {
        return (
            <span className="badge badge-sm bg-orange-600 hover:bg-orange-700 text-white border-0 flex items-center gap-1">
                <IoMedalOutline className="w-3.5 h-3.5" aria-hidden="true" />
                #3 Third Place
            </span>
        );
    }
    return null;
};


const getComfortStyles = (score) => {
    if (score >= 70) {
        return {
            badge: "bg-green-50 border-green-200 text-green-600",
            progress: "text-green-500",
            status: "Very Comfortable"
        };
    }
    if (score >= 40) {
        return {
            badge: "bg-yellow-50 border-yellow-200 text-yellow-600",
            progress: "text-yellow-500",
            status: "Moderately Comfortable"
        };
    }
    return {
        badge: "bg-red-50 border-red-200 text-red-600",
        progress: "text-red-500",
        status: "Uncomfortable"
    };
};



const CityCard = ({ weather, rank }) => {
    const rankBadge = getRankBadge(rank);
    const score = weather.comfort_score;
    const comfortStyles = getComfortStyles(score);

    return (
        <div>
            <div className="card w-84 bg-base-100 shadow-sm">
                <div className='py-8 px-6'>
                    <div className='flex justify-between'>
                        <div>
                            <h1 className='text-xl font-semibold'>{weather.name}</h1>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                                <IoMdCloudOutline className="w-4 h-4" aria-hidden="true" />
                                <span className="text-base-content">
                                    {weather.weather[0].description.charAt(0).toUpperCase() + weather.weather[0].description.slice(1)}
                                </span>
                            </div>
                        </div>
                        {rankBadge && (
                            <div className="shrink-0">
                            {rankBadge}
                            </div>
                        )}
                    </div>
                </div>
                <div className="card-body">
                    <div className='flex justify-between justify-items-center items-center'>
                        <div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <LuThermometer className="w-6 h-6 text-red-600" aria-hidden="true" />
                                <span className="text-base-content">Temperature</span>
                            </div>
                        </div>
                        <h1 className='text-xl font-semibold'>{weather.main.temp} °C</h1>
                    </div>
                    <div className='flex gap-6 justify-items-center items-center'>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                            <MdOutlineWaterDrop className="w-6 h-6 text-blue-400" aria-hidden="true" />
                            <span className="text-base-content">Humidity: {weather.main.humidity}%</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                            <LuWind className="w-6 h-6 text-cyan-400" aria-hidden="true" />
                            <span className="text-base-content">Wind: {weather.wind.speed} m/s</span>
                        </div>
                    </div>
                    <div className="divider my-1"></div>
                    <div className='flex justify-between justify-items-center items-center'>
                        <div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <IoMdTrendingUp className="w-6 h-6 text-blue-600" aria-hidden="true" />
                                <span className="text-lg text-base-content font-semibold">Comfort Index</span>
                            </div>
                        </div>
                        <div className={`badge py-5 font-semibold text-xl ${comfortStyles.badge}`}>
                            {score}
                        </div>
                    </div>
                    <progress
                        className={`progress w-full mt-1 ${comfortStyles.progress}`}
                        value={score}
                        max="100"
                    ></progress>
                    <span className="text-xs">{comfortStyles.status}</span>
                    <div className="divider my-1"></div>
                    <div className='flex justify-between justify-items-center items-center'>
                        <span className="text-base-content">Rank Position</span>
                        <h1 className='text-lg font-semibold text-blue-500'># {rank}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CityCard