import TweetList from "../components/tweet-list";
import TimelineLayout from "../components/layouts/timeline-layout";
import Aside from "../components/aside";

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