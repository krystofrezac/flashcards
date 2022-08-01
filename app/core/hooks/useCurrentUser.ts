import { useQuery } from 'blitz';
import getCurrentUser, { CurrentUser } from 'app/users/queries/getCurrentUser';

const useCurrentUser = (): CurrentUser | null => {
  const [user] = useQuery(getCurrentUser, null);
  return user;
};

export default useCurrentUser;
