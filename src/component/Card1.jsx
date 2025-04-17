import React from "react";

const Card1 = ({ imageUrl, name }) => {
    return (
        <div className="border-2 border-gray-300 rounded-lg w-64 h-full">
            <div className="h-80">
                <img
                    src={imageUrl}
                    alt="guide"
                    className="h-full w-full object-cover rounded-t-lg"
                />
            </div>
            <h4 className="p-4 text-[#FFC100] font-semibold text-center truncate">{name}</h4>
        </div>
    );
};

export default Card1;