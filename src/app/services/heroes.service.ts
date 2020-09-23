import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://heroesapp-6a039.firebaseio.com';

  constructor( private http: HttpClient ) { }

  crearHeroe( heroe: HeroeModel ) {
    return this.http.post(`${ this.url }/heroes.json`, heroe).pipe(
      map( (resp: any) => {
        console.log(resp);
        heroe.id = resp.name;
        return heroe;
      })
    );
  }

  actualizarHeroe( heroe: HeroeModel ) {
    const heroeTemp = {
      ...heroe
    };

    delete heroeTemp.id; //TODO: VER POR QUÉ SE HACE ESTA INSTRUCCIÓN

    return this.http.put(`${ this.url }/heroes/${ heroe.id }.json`, heroe);
  }

  borrarHeroe( id: string ) {
    return this.http.delete(`${ this.url }/heroes/${ id }.json`);
  }

  getHeroe( id: string ) {
    return this.http.get(`${ this.url }/heroes/${ id }.json`);
  }

  getHeroes() {
    return this.http.get(`${ this.url }/heroes.json`).pipe(
      map( this.crearArreglo ),
      delay(1500)
    );
  }

  private crearArreglo( heroesObj: object) {

    const heroes: HeroeModel[] = [];

    Object.keys( heroesObj ).forEach( key => {
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;
console.log(key);
      heroes.push( heroe );
    });

    if ( heroesObj === null ) { return []; }

    return heroes;
  }

}
