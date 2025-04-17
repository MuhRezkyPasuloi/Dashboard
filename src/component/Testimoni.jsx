import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faQuoteRight } from "@fortawesome/free-solid-svg-icons";

const Testimoni = ({ text, username, mount, rating }) => {
    return (
        <div className="relative p-6 bg-white rounded-lg shadow-md">
            <FontAwesomeIcon icon={faQuoteRight} className="absolute top-4 right-4 text-[#FFC100] text-3xl" />

            <div className="mb-4 flex gap-4 items-center">
                <div className="h-10 w-10 bg-gray-500 rounded-full"></div>
                <div>
                    <h1 className="font-bold text-lg text-[#FFC100]">{username}</h1>
                    <h4 className="text-gray-500 text-sm">{mount}</h4>
                </div>
            </div>

            <p className="mb-4 text-xs text-gray-700">
                {text}
            </p>

            <div className="flex items-center gap-1">
                {[...Array(rating)].map((_, index) => (
                    <FontAwesomeIcon
                        key={index}
                        icon={faStar}
                        className="text-[#FFC100] text-lg"
                    />
                ))}
            </div>
        </div>
    );
};

export default Testimoni;