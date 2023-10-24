import {Input, InputRef} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {useRef, useState} from "react";

function SearchBar() {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<InputRef>(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // TODO: make this work
  return (
    <div
      className="h-[45px] mt-1 flex bg-tag rounded-full border focus-within:bg-black focus-within:border-primary"
      onClick={handleClick}
    >
      <SearchOutlined className={`text-xl pl-4 ${focused ? "text-primary" : "text-secondary"}`}/>
      <Input ref={inputRef}
             className="h-full bg-tag border-0 rounded-full focus:bg-black transition-none ml-1"
             placeholder="Search"
             onFocus={() => setFocused(true)}
             onBlur={() => setFocused(false)}
      />
    </div>
  );
}

export default SearchBar;