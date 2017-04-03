import {OpaqueToken} from '@angular/core';

export const ORACLE: OpaqueToken = new OpaqueToken('oracledb');
export * from './oracle-db.service';