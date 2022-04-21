import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./infrastructure/auth/auth.guard";
import {LayoutComponent} from "./interfaces/layout/layout.component";
import {ANIMATES} from "./domain/entity/animation";
import {PermissionResolve} from "./infrastructure/auth/permission.resole";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'index',
        pathMatch: 'full',
      },
      {
        path: 'index',
        canActivate: [AuthGuard],
        resolve: {session: PermissionResolve},
        data: {
          title: '耍微淘',
          animate: ANIMATES.Wave,
          animateTime: 600
        },
        loadChildren: () => import('./interfaces/index/index.module').then(res => res.IndexModule)
      },
      {
        path: 'init',
        canActivate: [AuthGuard],
        resolve: {session: PermissionResolve},
        data: {
          title: '初始化',
          animate: ANIMATES.Origami,
          animateTime: 600
        },
        loadChildren: () => import('./interfaces/init/init.module').then(res => res.InitModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
