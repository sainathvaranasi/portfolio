import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS, JSONP_PROVIDERS} from 'angular2/http';
import {provide, enableProdMode} from 'angular2/core';
import {RouteConfig, LocationStrategy, HashLocationStrategy, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';

import {AppComponent} from './app.component';
import {QuoteService} from './quote.service';

if ('production' === NODE_ENV) enableProdMode();

bootstrap(AppComponent,
  [ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    JSONP_PROVIDERS,
    provide(LocationStrategy, {useClass: HashLocationStrategy}),
    QuoteService
  ]
);
