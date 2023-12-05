import {Typography} from "antd";
import WhoFollowList from "../users/who-follow-list";
import SearchBar from "../search-bar";
import {useMediaQuery} from "react-responsive";

const {Link, Text} = Typography;
type AsideProps = {
  showSearchBar: boolean;
}

function Aside(props: AsideProps) {
  const isMobile = useMediaQuery({maxWidth: 1000});
  const isTablet = useMediaQuery({maxHeight: 800});
  return (
    <>
      {!isMobile && !isTablet &&
        <aside className="w-[350px] lg:w-[290px] h-full fixed ml-[630px] lg:ml-[610px]">
          {props.showSearchBar && <SearchBar/>}
          <WhoFollowList/>
          <div className="flex flex-wrap justify-center w-full h-10">
            <Link className="pr-4 text-[13px]" href="https://github.com/kuro-vale/shiro-tweet" target="_blank">
              Repo</Link>
            <Link className="pr-4 text-[13px]" href="https://x.com" target="_blank">
              Based on X</Link>
            <Link className="pr-4 text-[13px]" href="https://twitter.com/_Silvervale_" target="_blank">
              Best girl</Link>
            <Link className="pr-4 text-[13px]" href={process.env.REACT_APP_API} target="_blank">
              API</Link>
            <Link className="pr-4 text-[13px]" href="https://github.com/kuro-vale" target="_blank">
              Github</Link>
            <Link className="pr-4 text-[13px]" href="https://twitter.com/kuro_vale" target="_blank">
              Twitter</Link>
            <Link className="pr-4 text-[13px]" href="https://www.linkedin.com/in/kurovale/" target="_blank">
              LinkedIn</Link>
            <Link className="pr-4 text-[13px]" href="mailto:jsalcedo218@gmail.com" target="_blank">
              Gmail</Link>
            <Text className="text-secondary text-[13px]">@2023 kurovale</Text>
          </div>
        </aside>
      }
    </>
  );
}

export default Aside;