import React from "react";
import Rating from "@mui/material/Rating";

function CourseCardIntroduce({ course }) {
  return (
    <div className="h-70 w-full rounded-2xl border border-gray-300 shadow-lg overflow-hidden bg-white cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl">
      <img
        src={course.image || "/default-image.jpg"}
        alt={course.name}
        className="h-[44%] w-full object-cover object-top rounded-t-2xl"
      />
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
          {course.name}
        </h3>
        <div className="flex items-center gap-1 text-yellow-500 text-sm">
          <Rating
            name="half-rating-read"
            defaultValue={course.rating}
            precision={0.1}
            readOnly
          />
          <p>{course.rating}</p>
        </div>
        <div className="flex items-center mt-2 gap-2">
          <span className="text-green-500 text-lg font-bold">
            {course.price.toLocaleString()}đ
          </span>
          <span className="text-gray-500 line-through">
            {course.originalPrice.toLocaleString()}đ
          </span>
        </div>
      </div>
    </div>
  );
}

export default CourseCardIntroduce;
