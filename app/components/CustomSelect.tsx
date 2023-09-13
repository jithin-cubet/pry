"use client";

import React, { useState, useRef } from "react";

interface CustomSelectProps {
  options: string[];
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options }) => {
  const [search, setSearch] = useState<string[]>(options);
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [selected, setSelected] = useState<string[]>([]);
  const contentEditableRef = useRef<HTMLDivElement>(null);

  const removeMathOperators = (inputString: string) => {
    const regex = /[+\-*()/]/g;

    const resultString = inputString.replace(regex, "");

    return resultString;
  };

  const searchOptions = () => {
    const value = contentEditableRef.current!.textContent || "";
    const items = value.replace("X", "").split(" ");
    const lastItem = removeMathOperators(
      items[items.length - 1].trim().replace("X", "")
    );

    if (lastItem) {
      setOpenDropdown(true);
      const search = options.filter((item) =>
        item.toLowerCase().includes(lastItem)
      );
      setSearch(search);
    } else setOpenDropdown(false);
  };

  const addToSelected = (value: string) => {
    setSelected((prev) => [...prev, value]);
    setOpenDropdown(false);
  };

  const removeItem = (value: string) => {
    const newSelected = selected.filter((item) => item !== value);
    setSelected(newSelected);
  };

  console.log(selected);

  return (
    <div>
      <div
        className="contenteditable"
        contentEditable={true}
        onKeyUp={searchOptions}
        ref={contentEditableRef}
      >
        {selected.map((item) => (
          <React.Fragment key={item}>
            <div className="selected-item">
              <span className="value">{item}</span>{" "}
              <span className="close" onClick={() => removeItem(item)}>
                X
              </span>
            </div>
            <br />
          </React.Fragment>
        ))}
      </div>
      <div className={openDropdown ? "dropdown" : "hide"}>
        <ul>
          {search.length > 0 ? (
            search.map((item) => (
              <li onClick={() => addToSelected(item)} key={item}>
                {item}
              </li>
            ))
          ) : (
            <li>No result found</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CustomSelect;
