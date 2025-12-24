import React from "react";

const Title = ({text1, text2}) => {
  return (
    <div>
      <div className="inline-flex gap-1 lg:gap-2 items-center mb-3">
        <p className="text-gray-500">
          {text1} <span className="text-gray-700 font-medium">{text2}</span>
        </p>
        <p className=" hidden xs:block w-6 sm:w-6 h-[1px] lg:w-12 sm:h-[2px]  bg-green-600 mt-[3px]"></p>
      </div>
    </div>
  );
};

export default Title;
