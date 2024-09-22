"use client";
import React, { useState } from "react";

function Upload() {
  const [file, setFile] = useState();

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("file is",file);
    const data = new FormData();
    data.set("file", file);

    const result = await fetch("api/upload", {
      method: "POST",
      body: data,
    });
    console.log("your result is",result);
  };

  return (
    <div>
      <h1 className="text-4xl font-extrabold underline">Upload Image</h1>
      <br />
      <form onSubmit={onSubmit}>
        <input
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files?.[0])}
        />
        <button
          className="border-2 rounded-xl px-4 py-1 border-black"
          type="submit"
        >
          Upload Image
        </button>
      </form>
    </div>
  );
}

export default Upload;
