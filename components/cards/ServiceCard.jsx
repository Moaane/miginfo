import React from "react";

const ServiceCard = React.forwardRef(({ data, className, ...props }, ref) => {
  return (
    <div className={`group ${className}`} {...props}>
      <div className="p-6 max-w-64 md:max-w-none h-full bg-white shadow-md rounded-md space-y-4 md:space-y-6 lg:hover:-translate-y-10 transition-transform duration-500">
        <div className="flex items-center justify-center w-fit p-3 rounded-full bg-primary transition-all duration-300 group-hover:bg-sky-400">
          <img
            src={`/api/images/${data.icon.filename}`}
            alt="On Hover"
            className="w-12 h-12"
          />
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-xl md:text-2xl lg:text-xl xl:text-2xl text-primary">{data.name}</h3>
          <p className="text-base md:text-lg lg:text-base w-full opacity-70">{data.description}</p>
        </div>
      </div>
    </div>
  );
});

export default ServiceCard;
