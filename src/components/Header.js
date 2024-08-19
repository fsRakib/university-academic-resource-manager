"use client";
import React from "react";
import OptionSwitcher from "../components/OptionSwitcher";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Header() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("Questions");
  const options = ["Questions", "Books", "Notes"];
  const handleSelectOption = (option) => {
    setSelectedOption(option);
    if (option === "Questions") {
      router.push("/questions");
    } else if (option === "Books") {
      router.push("/books");
    } else {
      router.push("/notes");
    }
  };
  return (
    <div className="mt-2 flex justify-between w-full max-w-4xl space-x-2">
      <div className="flex-auto">
        <OptionSwitcher
          options={options}
          selectedOption={selectedOption}
          onSelectOption={handleSelectOption}
        />
      </div>
      <div className="flex-auto">
        <button
          className="bg-black px-6 py-2 rounded-lg font-bold w-full"
          style={{ color: "#FFAA33" }}
          onClick={() => router.push("/home")}
        >
          Modify Search
        </button>
      </div>
    </div>
  );
}

export default Header;
