let waitWindowLoad:Promise<any>;
const SW_URL = './service-worker.js';

if (typeof window !== 'undefined') {
  if (typeof Promise !== 'undefined') {
    waitWindowLoad = new Promise((resolve) => {
      window.addEventListener('load', resolve);
      console.log('load');
    });
  }
}

export type RegistrationType = any;

type MakeNewCustomEventArgsType = [
  registration: RegistrationType,
  eventName: string,
];

function makeNewCustomEvent(args:MakeNewCustomEventArgsType) {
  const [registration, eventName] = args;
  const newCustomEvent = new CustomEvent<RegistrationType>(eventName, {

    bubbles: true,
    detail: {
      registration,
    },

  });
  document.dispatchEvent(newCustomEvent);
}

function registrationSW(navigator:any) {
  console.log('startRegis');

  navigator.serviceWorker
    .register(SW_URL)
    .then((registration:any) => {
      if (registration.waiting) {
        makeNewCustomEvent(['pwa-updated: ', registration]);
        console.log('waiting: ', registration);
        makeNewCustomEvent([registration, 'pwa-ready-work-offline']);
      }
      registration.onupdatefound = () => {
        makeNewCustomEvent([registration, 'pwa-updatefound']);
        console.log(registration, 'pwa-updatefound');
        const installingWorker = registration.installing;
        installingWorker.onstatechange = () => {
          console.log(registration, 'onstatechange');
          if (installingWorker.state === 'installed') {
            console.log(registration, 'installed');
            if (navigator.serviceWorker.controller) {
              console.log('pwa-ready-install-update: ', registration);
              makeNewCustomEvent([registration, 'pwa-ready-install-update']);
            } else {
              makeNewCustomEvent([registration, 'pwa-ready-work-offline']);
            }
          }
        };
      };
    });

  navigator.serviceWorker.ready.then((registration:any) => {
    makeNewCustomEvent([registration, 'pwa-ready']);
  });
}

export function register() {
  if ('serviceWorker' in navigator) {
    waitWindowLoad?.then(() => {
      fetch(SW_URL)
        .then((response) => {
          if (response.status === 404) {
            console.log('not found serviceWorker');
          } else if (response.headers.get('content-type')?.indexOf('javascript') === -1) {
            console.log(`found ${response.headers.get('content-type')}`);
          } else {
            registrationSW(navigator);
          }
        });
    });
  }
}
