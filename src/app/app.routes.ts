import { Routes } from '@angular/router';
import { RecetasComponent } from './public/pages/recetas/recetas.component';
import { FavoritosComponent } from './public/pages/favoritos/favoritos.component';
import { DesayunosymeriendasComponent } from './public/pages/desayunosymeriendas/desayunosymeriendas.component';

import { AlmuerzosComponent } from './public/pages/almuerzos/almuerzos.component';
import { PostresComponent } from './public/pages/postres/postres.component';


export const routes: Routes = [
    { path: '', redirectTo: '/recetas', pathMatch: 'full' },
    { path: 'recetas', component: RecetasComponent },
    { path: 'almuerzos', component: AlmuerzosComponent },
    { path: 'postres', component: PostresComponent },
    { path: 'desayunos', component: DesayunosymeriendasComponent },
    { path: 'favoritos', component: FavoritosComponent },
  ];
