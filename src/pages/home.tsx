import TweetList from "../components/tweet-list";

function Home() {
  return (
    <>
      <div className="w-[598px] h-full border-x-[1px] border-x-border xs:border-x-0">
        <TweetList/>
      </div>
      <div className="w-[350px] md:hidden h-full fixed ml-[598px] ht:ml-[950px]">
        <h1 className="text-white">Who to follow</h1>
      </div>
    </>
  );
}

export default Home;