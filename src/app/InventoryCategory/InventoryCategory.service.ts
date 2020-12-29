import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { InventoryCategory } from './InventoryCategory';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
 const apiUrl  = 'api/InventoryCategorys';//'https://localhost:44328/api/';

@Injectable({
  providedIn: 'root'
})
export class InventoryCategoryService {
 // private productsUrl = 'https://localhost:44328/api/Inventorycategory/GetInventoryCategory';
 // private productsUrl = 'https://localhost:44328/api/inventorycategory/EditInventoryCategory/?Id=20';
 //private productsUrl = 'api/InventoryCategorys';
  //private productsUrl = 'api/Inventorycategory/GetInventoryCategory';
 // private productUrl = 'https://localhost:44328/api/inventorycategory/GetInventoryCategory';
  //https://localhost:44328/api/inventorycategory/GetInventoryCategory
 // private productsUrl = 'https://localhost:44328/api/inventorycategory/InventoryCategoryById/?Id=5'
  //https://localhost:44328/api/inventorycategory/EditInventoryCategory/?Id=20
  //https://localhost:44328/api/inventorycategory/DeleteInventoryCategory/?Id=5
  
  constructor(private http: HttpClient) { }

  getProducts(): Observable<InventoryCategory[]> {
    debugger;
    
/* return this.http.get(this.productsUrl).pipe(
    tap(data => console.log(data)))
   */ 

   
    return this.http.get<InventoryCategory[]>(apiUrl,httpOptions)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );  
  }

  getProduct(id: number): Observable<InventoryCategory> {
    debugger;
    if (id === 0) {
      return of(this.initializeProduct());
    }
    const url = `${apiUrl+'Inventorycategory/GetInventoryCategory'}/${id}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<InventoryCategory>(url, { headers })
      .pipe(
        tap(data => console.log('getProduct: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );

      
  }

  createProduct(InventoryCategory: InventoryCategory): Observable<InventoryCategory> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    InventoryCategory.id = null;
    return this.http.post<InventoryCategory>(apiUrl+'Inventorycategory/GetInventoryCategory', InventoryCategory, { headers })
      .pipe(
        tap(data => console.log('createProduct: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteProduct(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${apiUrl+'Inventorycategory/GetInventoryCategory'}/${id}`;
    return this.http.delete<InventoryCategory>(url, { headers })
      .pipe(
        tap(data => console.log('deleteProduct: ' + id)),
        catchError(this.handleError)
      );
  }

  updateProduct(product: InventoryCategory): Observable<InventoryCategory> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${apiUrl+'Inventorycategory/GetInventoryCategory'}/${product.id}`;
    return this.http.put<InventoryCategory>(url, product, { headers })
      .pipe(
        tap(() => console.log('updateProduct: ' + product.id)),
        // Return the product on an update
        map(() => product),
        catchError(this.handleError)
      );
  }

  private handleError(err) {
    debugger;
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

  private initializeProduct(): InventoryCategory {
    // Return an initialized object
    return {   
   id: 0,
  Alias: null,
  ShortString: null,
  LongString: null,
  IsDeleted: null,
  CreationDate:null,
  LastEditDate:null,
  InsertUserId:null,
  UpdateUserId:null,
  DeleteUserId:null,
  CanShowDialogForScan: 0,
    };
  }
}
