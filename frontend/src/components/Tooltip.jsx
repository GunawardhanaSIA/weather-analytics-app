import React from 'react'
import { IoIosInformationCircleOutline } from "react-icons/io";

const Tooltip = () => {
  return (
    <div>
        <div className="tooltip tooltip-bottom items-center align-middle">
            <div className="tooltip-content text-left">
                <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Comfort Index Formula (0-100)</h4>
                    <div className="text-xs space-y-1">
                        <p><strong>Temperature (40 pts):</strong> Ideal 18-24°C</p>
                        <p><strong>Humidity (30 pts):</strong> Ideal 40-60%</p>
                        <p><strong>Wind Speed (30 pts):</strong> Ideal 5-15 km/h</p>
                    </div>
                    <div className="pt-2 border-t text-xs space-y-1">
                        <p className="text-green-600">● 70-100: Very Comfortable</p>
                        <p className="text-yellow-600">● 40-69: Moderate</p>
                        <p className="text-red-600">● 0-39: Uncomfortable</p>
                    </div>
                </div>
            </div>
            <IoIosInformationCircleOutline className='text-xl text-gray-400' />
        </div>
    </div>
  )
}

export default Tooltip