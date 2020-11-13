import fetch from '../utils/fetch';
import showToast from '../utils/showToast';

const signUp = async (username: string, password: string): Promise<void> => {
  try {
    await fetch
      .catcher(409, () => {
        showToast('Identifiant déjà utilisé', 'Veuillez choisir un autre identifiant', 'error');
      })
      .post('/auth/register', { body: { password, username } });
  // eslint-disable-next-line no-empty
  } catch (err) {}

  showToast('Compte créé avec succès', 'Vous pouvez dès à présent vous connecter', 'success');
};

export default signUp;
