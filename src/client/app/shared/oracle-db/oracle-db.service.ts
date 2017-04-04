import { Injectable, Inject } from '@angular/core';
import {ORACLE} from './index';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OracleDBService {
	/**
	 * Creates a new OracleDBService with injected oracledb
	 * @param {ORACLE} oracledb - Injected oracledb to talk to the oracle db
	 * @constructor
	 */
	constructor(@Inject(ORACLE) private oracledb: any) {
		console.log(oracledb);
	}
	
	private connect(callback: any) {
		this.oracledb.getConnection({
			user         : 'pavan',
			password     : 'pavan',
			connectString: 'localhost/XE'
		}, callback);
	}
	
	private release(conn: any) {
		conn.close((err: any)=>{
			if(err) 
				console.error("Couldn't release", err);
		});
	}

	select(columns: string, table: string, where: string, groupby: string, orderby: string) {
		let query = "SELECT " + columns + " FROM " + table;
		if(where != null && where !== '') {
			query += " WHERE " + where;
		}
		if(groupby != null && groupby !== '') {
			query += " GROUP BY " + groupby;
		}
		if(orderby != null && orderby !== '') {
			query += " ORDER BY " + orderby;
		}
		this.connect((err: any, conn: any) => {
			if(err) {
				console.error("Couldn't connect", err);
				return;
			}
			conn.execute(query, [], (err: any, result: any) => {
				if(err) {
					console.error("Couldn't select", err);
					this.release(conn);
					return;
				}
				console.log("Result", result);
				this.release(conn);
			});
		});
	}
}


