import { useEffect } from 'react';

const Auth = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const access = urlParams.get('access');
    const refresh = urlParams.get('refresh');

    if (access && refresh) {
      localStorage.setItem('access', access);
      localStorage.setItem('refresh', refresh);
      window.location.href = '/';
    }
  }, []);

  return <div>Вход через Telegram успешен, перенаправляем...</div>;
};

export default Auth;
