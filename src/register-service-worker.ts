import { Workbox } from 'workbox-window';
import { PWA_READY_UPDATE } from './utils/constants';

const SW_URL = '/service-worker.js';

export type RegistrationType = any;

type MakeNewCustomEventArgsType = [
  registration: ServiceWorkerRegistration,
  eventName: string,
];

type DetailType = {
  registration: ServiceWorkerRegistration;
};

function makeNewCustomEvent(args:MakeNewCustomEventArgsType) {
  const [registration, eventName] = args;
  const newCustomEvent = new CustomEvent<DetailType>(eventName, {
    bubbles: true,
    detail: { registration },
  });
  document.dispatchEvent(newCustomEvent);
}

export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    const wb = new Workbox(SW_URL);
    wb.register()
      .then((registration) => {
        if (registration) {
          if (registration.waiting) {
            makeNewCustomEvent([registration, PWA_READY_UPDATE]);
            console.log('norm');
          }
          registration.onupdatefound = () => {
            makeNewCustomEvent([registration, PWA_READY_UPDATE]);
          };
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
