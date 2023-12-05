import TimelineLayout from "../components/layouts/timeline-layout";
import Aside from "../components/menus/aside";
import ExploreTabs from "../components/explore-tabs";

function Explore() {
  return (
    <>
      <TimelineLayout>
        <ExploreTabs/>
      </TimelineLayout>
      <Aside showSearchBar={false}/>
    </>
  );
}

export default Explore;