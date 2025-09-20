import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../config/redux/store";
import {
  setDateTime,
  nextStep,
  previousStep,
} from "../../modules/booking/bookingSlice";

const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
];

export const DateTimePicker: React.FC = () => {
  const dispatch = useDispatch();
  const selectedDate = useSelector((state: RootState) => state.booking.date);
  const selectedTime = useSelector((state: RootState) => state.booking.time);

  const [localDate, setLocalDate] = useState(selectedDate || "");
  const [localTime, setLocalTime] = useState(selectedTime || "");

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  const handleDateChange = (date: string) => {
    setLocalDate(date);
    if (localTime) {
      dispatch(setDateTime({ date, time: localTime }));
    }
  };

  const handleTimeSelect = (time: string) => {
    setLocalTime(time);
    if (localDate) {
      dispatch(setDateTime({ date: localDate, time }));
    }
  };

  const handleNext = () => {
    if (localDate && localTime) {
      dispatch(nextStep());
    }
  };

  const handleBack = () => {
    dispatch(previousStep());
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl lg:text-3xl font-light text-slate-800 mb-8 text-center">
        Select Date & Time
      </h2>

      <div className="space-y-8">
        {/* Date Selection */}
        <div>
          <label className="block text-lg font-medium text-slate-700 mb-4">
            Choose Your Date
          </label>
          <input
            type="date"
            min={today}
            value={localDate}
            onChange={(e) => handleDateChange(e.target.value)}
            className="w-full md:w-auto px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-pink-400 focus:outline-none transition-colors"
          />
        </div>

        {/* Time Selection */}
        <div>
          <label className="block text-lg font-medium text-slate-700 mb-4">
            Available Time Slots
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => handleTimeSelect(time)}
                className={`
                  px-4 py-3 rounded-lg font-medium transition-all duration-300
                  ${
                    localTime === time
                      ? "bg-gradient-to-r from-pink-500 to-blue-500 text-white shadow-md"
                      : "bg-white border-2 border-gray-200 text-slate-700 hover:border-pink-300 hover:shadow-sm"
                  }
                `}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Summary */}
        {localDate && localTime && (
          <div className="bg-gradient-to-r from-pink-50 to-blue-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              Your Appointment
            </h3>
            <div className="space-y-2 text-slate-600">
              <p>
                <span className="font-medium">Date:</span>{" "}
                {new Date(localDate + "T00:00:00").toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p>
                <span className="font-medium">Time:</span> {localTime}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={handleBack}
          className="px-8 py-3 rounded-lg font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={!localDate || !localTime}
          className={`
            px-8 py-3 rounded-lg font-semibold transition-all duration-300
            ${
              localDate && localTime
                ? "bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:shadow-lg transform hover:-translate-y-0.5"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }
          `}
        >
          Next: Your Information
        </button>
      </div>
    </div>
  );
};
