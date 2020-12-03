import fetch from '../utils/fetch';
import showToast from '../utils/showToast';

const login = async (username: string, password:string): Promise<{token: string}> => {
  const res = await fetch
    .catcher(401, () => {
      showToast('Indentifiants invalides', 'Merci pour ton mot de passe Netflix :)', 'error');
    })
    .catcher(404, () => {
      showToast('Utilisateur non trouvé', 'Va t\'inscrire genre fissa', 'error');
    })
    .post<{token: string}>('/auth/login', { password, username });

  return res;
};

export default login;
