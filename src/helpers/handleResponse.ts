import { AUTH_TOKEN } from 'helpers/constants';
import { useHistory } from 'react-router-dom';

export async function handleResponse(response: Response) {
  const text = await response.text();
  const data = text && JSON.parse(text);
  const history = useHistory();
  if (!response.ok) {
    if ([401, 403].indexOf(response.status) !== -1) {
      localStorage.removeItem(AUTH_TOKEN);
      history.push(`/`);
    }
  }
  return data;
}
