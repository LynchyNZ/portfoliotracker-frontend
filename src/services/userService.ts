import { AUTH_TOKEN } from 'helpers/constants';
import { useHistory } from 'react-router-dom';

export const userService = {
  logout,
};

function logout() {
  localStorage.removeItem(AUTH_TOKEN);
  const history = useHistory();
  history.push(`/`);
}
