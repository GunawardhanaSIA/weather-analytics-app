import React from "react";
import { IoMdSearch } from "react-icons/io";
import { IoClose } from "react-icons/io5";

const SearchFilter = ({ value, onChange, resultsCount, totalCount }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="input input-bordered flex items-center gap-2 lg:w-96">
        <IoMdSearch className="opacity-50 text-lg" />

        <input
          type="search"
          placeholder="Search Cities"
          className="grow"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />

        {/* {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="opacity-50 hover:opacity-100"
          >
            <IoClose className="text-lg" />
          </button>
        )} */}
      </label>

      {value && (
        <p className="text-sm text-gray-600 mt-2" role="status">
          Showing {resultsCount} of {totalCount} cities
        </p>
      )}
    </div>
  );
};

export default SearchFilter;
