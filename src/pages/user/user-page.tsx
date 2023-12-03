import TimelineLayout from "../../components/layouts/timeline-layout";
import {Outlet, useLocation, useParams} from "react-router-dom";
import Aside from "../../components/menus/aside";
import {useQuery} from "@apollo/client";
import {GetUserData, User} from "../../types";
import {GET_USER_QUERY} from "../../graphql/queries";
import ErrorResult from "../../components/error-result";
import {useEffect, useState} from "react";
import ProfileProvider from "../../profile-provider";
import UserProfile from "../../components/users/user-profile";

function UserPage() {
  const {username} = useParams();
  const location = useLocation();
  const {error, data} = useQuery<GetUserData>(GET_USER_QUERY, {
    variables: {
      username
    },
    fetchPolicy: "no-cache"
  });
  const [profile, setProfile] = useState<User | null>(null);
  const user = data?.UserQueries.userByUsername;
  useEffect(() => {
    if (user) setProfile(user);

    return () => {
      setProfile(null);
    };
  }, [user]);
  if (error) return (<ErrorResult error={error}/>);

  return (
    <>
      <TimelineLayout>
        {!location.pathname.includes("follow") && <UserProfile user={user}/>}
        <ProfileProvider profile={profile}>
          <Outlet/>
        </ProfileProvider>
      </TimelineLayout>
      {/* TODO: search user's tweets */}
      <Aside showSearchBar={true}/>
    </>
  );
}

export default UserPage;