import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => {
    const errorMsgElement = document.querySelector('#errorMessage');
    const loader = document.querySelector('#loader');
    loader?.remove();

    let message = 'Application initialization failed';
    if (errorMsgElement) {
      message += ': ' + err;
      errorMsgElement.textContent = message;
    }
  });
