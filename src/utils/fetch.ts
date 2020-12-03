import getEnvironment from '../helpers/getEnvironment';
import { fetcher } from './fetcher';
import showToast from './showToast';

const environment = getEnvironment();

const fetch = fetcher(environment.apiEndpoint)
  .headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
  })
  .defaultCatcher(() => {
    showToast('Une erreur s\'est produite', 'Ça vient de chez nous, comme le bon goût', 'error');
  })
  .catcher(500, () => {
    showToast('Une erreur s\'est produite', 'Ça vient de chez nous, comme le bon goût', 'error');
  })
  .catcher(404, () => {
    showToast('Non trouvé', 'Nous n\'avons pas encore trouvé l\'arche perdue', 'error');
  })
  .catcher(422, () => {
    showToast('Données non valide', 'Fais attention à ce que tu envoies frérot', 'error');
  });

export default fetch;
