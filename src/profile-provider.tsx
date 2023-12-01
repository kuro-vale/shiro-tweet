import {ProfileContext} from "./contexts";
import {ParentProps, ProfileContextProps, User} from "./types";

type ProfileProviderProps = {
  profile: User | null,
} & ParentProps

function ProfileProvider({children, profile}: ProfileProviderProps) {

  const value: ProfileContextProps = {
    profile,
  };

  return (
    <ProfileContext.Provider value={value}>
      <div className="min-h-screen">
        {children}
      </div>
    </ProfileContext.Provider>
  );
}

export default ProfileProvider;