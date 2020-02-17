import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Shell } from '@app/shell/shell.service';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'areadoaluno', loadChildren: './areadoaluno/areadoaluno.module#AreadoalunoModule' },
    { path: 'home', loadChildren: './home/home.module#HomeModule' },
    { path: 'login', loadChildren: './login/login.module#LoginModule' },
    { path: 'busca', loadChildren: './busca/busca.module#BuscaModule' },
    { path: 'unidade', loadChildren: './unidade/unidade.module#UnidadeModule' },
    { path: 'faleconosco', loadChildren: './faleconosco/faleconosco.module#FaleconoscoModule' },
    { path: 'aselfit', loadChildren: './aselfit/aselfit.module#AselfitModule' }
  ]),
  // Fallback when no prior route is matched
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
