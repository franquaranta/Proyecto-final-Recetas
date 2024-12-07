import { Routes } from '@angular/router';
import { RecetasComponent } from './public/pages/recetas/recetas.component';
import { FavoritosComponent } from './public/pages/favoritos/favoritos.component';
import { DesayunosymeriendasComponent } from './public/pages/desayunosymeriendas/desayunosymeriendas.component';
import { CenasComponent } from './public/pages/cenas/cenas.component';
import { AlmuerzosComponent } from './public/pages/almuerzos/almuerzos.component';

export const routes: Routes = [
    { path: '', redirectTo: '/recetas', pathMatch: 'full' },
    { path: 'recetas', component: RecetasComponent },
    { path: 'almuerzos', component: AlmuerzosComponent },
    { path: 'cenas', component: CenasComponent },
    { path: 'desayunos', component: DesayunosymeriendasComponent },
    { path: 'favoritos', component: FavoritosComponent },
  ];
