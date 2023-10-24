import {Typography} from "antd";
import UserCardList from "../users/user-card-list";

const {Link, Text} = Typography;
type AsideProps = {
  showSearchBar: boolean;
}

function Aside(props: AsideProps) {
  return (
    <aside className="w-[350px] lg:w-[290px] h-full fixed ml-[598px] lg:ml-[578px] ht:hidden md:hidden">
      {props.showSearchBar && <div className="text-white">TODO: searchbar</div>}
      <UserCardList/>
      <div className="flex flex-wrap justify-center w-60 h-10 ml-8">
        <Link className="pr-4 text-[13px]" href="https://github.com/kuro-vale/shiro-tweet" target="_blank">
          Repo</Link>
        <Link className="pr-4 text-[13px]" href="https://twitter.com/_Silvervale_" target="_blank">
          Best girl</Link>
        <Link className="pr-4" href={process.env.REACT_APP_API} target="_blank">
          API</Link>
        <Link className="pr-4 text-[13px]" href="https://twitter.com/kuro_vale" target="_blank">
          Twitter</Link>
        <Link className="pr-4 text-[13px]" href="https://www.linkedin.com/in/kurovale/" target="_blank">
          LinkedIn</Link>
        <Link className="pr-4 text-[13px]" href="mailto:jsalcedo218@gmail.com" target="_blank">
          Gmail</Link>
        <Text className="text-secondary text-[13px]">@2023 kurovale</Text>
      </div>
    </aside>
  );
}

export default Aside;