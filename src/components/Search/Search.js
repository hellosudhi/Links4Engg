//@ts-check
import React, { useEffect, useState } from "react";
import data from "./data";
import "./Search.css";

function Search() {
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);
  useEffect(() => {
    if (input) {
      setItems([]);
      data
        .filter((item) =>
          item.username.toLowerCase().startsWith(input.toLowerCase())
        )
        .map((data) => {
          setItems((prevData) => [...prevData, data]);
        });
    } else {
      setItems([]);
    }
  }, [input]);
  const itemClicked = (ind) => {
    data.map((data, index) => {
      if (index === ind) {
        setInput("");
        setInput(`${data.username}-${data.taskno}-${data.status}`);
        setItems([]);
      }
    });
  };
  return (
    <div className="search">
      <div className="search__input">
        <input
          placeholder="Search Group"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <img alt="search" src="/Images/search.svg" />
      </div>
      <div className={items.length === 0 ? "search__hidden" : "search__result"}>
        <ul>
          {items.map((data, index) => (
            <li key={index} onClick={() => itemClicked(index)}>
              <span>
                {data.username}
                {"-"}
              </span>
              <span>
                {data.taskno}
                {"-"}
              </span>
              <span
                className={
                  data.status === "completed"
                    ? "search__result__completed"
                    : data.status === "pending"
                    ? "search__result__pending"
                    : "search__result__on-going"
                }
              >
                {data.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Search;
