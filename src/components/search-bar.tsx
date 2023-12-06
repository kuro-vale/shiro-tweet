import {Form, Input, InputRef} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {FormEvent, useEffect, useRef, useState} from "react";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {EXPLORE_ROUTE} from "../constants";

type SearchForm = {
  q: string,
}

function SearchBar() {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [search] = useSearchParams();
  const [form] = Form.useForm<SearchForm>();

  const query = search.get("q");
  useEffect(() => {
    if (query) {
      document.title = query + " - Search / shiro-tweet";
      form.setFieldValue("q", query);
    } else {
      document.title = "Explore / shiro-tweet";
      form.setFieldValue("q", "");
    }
  }, [form, query]);

  const handleClick = () => {
    inputRef?.current?.focus();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const valid = await form.validateFields().then(() => true).catch(() => false);
    if (valid) {
      navigate(`${EXPLORE_ROUTE}?q=${form.getFieldValue("q")}`, {replace: location.pathname === EXPLORE_ROUTE});
      inputRef?.current?.blur();
    }
  };

  return (
    <Form
      className="h-[45px] mt-1 flex bg-tag rounded-full border border-black focus-within:bg-black focus-within:border-primary"
      onClick={handleClick}
      form={form}
      onSubmitCapture={handleSubmit}
    >
      <SearchOutlined className={`text-xl pl-4 ${focused ? "text-primary" : "text-secondary"}`}/>
      <Form.Item<SearchForm>
        name="q"
        className="w-full mb-0 flex items-center pr-4"
        rules={[{required: true, message: ""}]}
        hasFeedback={false}
      >
        <Input
          ref={inputRef}
          className="h-full bg-tag border-0 rounded-full focus:bg-black transition-none ml-1"
          placeholder="Search"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          name="search"
        />
      </Form.Item>
    </Form>
  );
}

export default SearchBar;