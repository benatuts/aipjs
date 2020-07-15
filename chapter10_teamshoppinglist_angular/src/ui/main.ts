import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ShoppingModule } from './shopping/shopping.module';

platformBrowserDynamic().bootstrapModule(ShoppingModule).catch(err => console.error(err));
