import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
const CountTask = () => {
  const [count, setCount] = useState();
  const [isDropDown, setIsDropDown] = useState([]);
  const firstRef = useRef(0);

  useEffect(() => {
    axios.get("https://dummyjson.com/users").then((response) => {
      const gun = response.data.users;
      const gta = gun?.filter((bus) => bus.id < 5);
      setCount(gta);
    });
  }, []);
  console.log("firstRef :>> ", firstRef);
  console.log("isDropDown :>> ", isDropDown);
  return (
    <div>
      {count?.map((car) => (
        <div
          className="space-y-2 my-2 border w-72 rounded-lg "
          key={car.id}
        >
          <div className="flex justify-between items-center p-4">
            <div className="flex gap-4">
              <div className="bg-gray-100 rounded-full overflow-hidden">
                <img
                  src={car?.image}
                  alt="User"
                  className="h-16 w-16 object-cover"
                />
              </div>
              <div>
                <div className={`${isDropDown.includes(car.id)&&car?.firstName==='Terrill'  ?'text-red-400 ':' font-medium text-lg '}`}>
                  {car?.firstName} {car?.lastName}
                </div>
                <p className="text-sm">{car?.email}</p>
              </div>
            </div>
            <button
              onClick={() => {
                setIsDropDown((prev) =>
                  prev.includes(car.id)
                    ? prev.filter((id) => id !== car.id)
                    : [...prev, car.id]
                );
              }}
              className="text-blue-500"
            >
              {isDropDown.includes(car.id) ? "Up" : "Down"}
            </button>

          </div>
          {isDropDown.includes(car.id) && (
            <div>
              <p className="font-bold">{car?.firstName}</p>
              <p>{car?.address?.address}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
export default CountTask;
