import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OracleDBService {
	private base: string 
	/**
	 * Creates a new OracleDBService with injected oracledb
	 * @constructor
	 */
	constructor(private http: Http) {
		this.base = "http://localhost:3000";
	}
	
	get(url: string): Observable<any> {
		return this.http.get(this.base + url)
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
	}

	private handleError (error: any) {
	    // In a real world app, we might use a remote logging infrastructure
	    // We'd also dig deeper into the error to get a better message
	    let errMsg = (error.message) ? error.message :
	      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
	    console.error(errMsg); // log to console instead
	    return Observable.throw(errMsg);
	}
}


