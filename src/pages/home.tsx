import TweetList from "../components/tweets/tweet-list";
import TimelineLayout from "../components/layouts/timeline-layout";
import Aside from "../components/menus/aside";

function Home() {
  return (
    <>
      <TimelineLayout>
        <TweetList/>
      </TimelineLayout>
      <Aside showSearchBar={true}/>
    </>
  );
}

export default Home;