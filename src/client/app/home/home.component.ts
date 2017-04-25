import { Component, OnInit } from '@angular/core';
import { NameListService } from '../shared/name-list/name-list.service';
import { OracleDBService } from '../shared/oracle-db/oracle-db.service';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  /*moduleId: module.id,*/
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'], 
})
export class HomeComponent implements OnInit {

  /*newName: string = '';
  errorMessage: string;*/
  names: any[] = [];
  quer:string = ''; 
  rows: any[] = [];
  queries: any[] = [];
  raw: boolean = false;
  none: boolean = true;
  err:boolean = false;
  insert: boolean = false;
  error: string = '';
  rowsAffected: string = '';
  /**
   * Creates an instance of the HomeComponent with the injected
   * NameListService.
   *
   * @param {NameListService} nameListService - The injected NameListService.
   */
  constructor(public nameListService: NameListService, public oracle: OracleDBService) {

  }

  /**
   * Get the names OnInit
   */
  ngOnInit() {
    this.populateQueries();
  }

  populateQueries() {
    this.queries = [
      {
        statement: '1. Display the number of bookings done by all the customers',
        sql: '/select?columns=CustomerID, Count(*) As Total_Bookings&table=Booking&groupby=customerID',
      },
      {
        statement: '2. Display the offers and extra services provided by the hotel',
        sql: '/raw?query=SELECT e.id as Extra_ID,o.slug,o.expiresat,o.description,o.price as Offer_price,o.stock,e.type,e.name,e.price as Extra_Price FROM Offers o INNER JOIN offerextras p ON o.id = p.offerID INNER JOIN Extras e ON p.extraID = e.id'
      },
      {
        statement: '3. Display the details of the rooms and category of rooms booked by the customers',
        sql: '/raw?query=SELECT ca.name AS Customer_Name,ca.city,ca.contact,r.id AS Room_Number,r.location,c.bedcount,c.isac,c.price,c.name AS Category_Name FROM Customer ca INNER JOIN Booking b ON ca.id=b.customerID INNER JOIN Room r ON b.roomID = r.id INNER JOIN Category c ON r.categoryid = c.id'
      },
      {
        statement: '4. Display all the details of the Customers from its corresponding fragments',
        sql: '/raw?query=SELECT * FROM CustomerMUM UNION SELECT * FROM CustomerPUN UNION SELECT * FROM CustomerGOA'
      },
      {
        statement: '5. Display the booking details of all the customers',
        sql: '/raw?query=SELECT b.id AS BookingID,b.roomID,b.checkinat,b.checkoutat, c.name AS Customer_Name, c.city FROM Booking b INNER JOIN (SELECT * FROM CustomerMUM UNION SELECT * FROM CustomerPUN UNION SELECT * FROM CustomerGOA) c ON c.id = b.customerID'
      },
      {
        statement: '6. Display the contents of Staff using the vertical fragments created',
        sql: '/raw?query=SELECT b.*, l.emailid, l.password FROM StaffBio@hms2 b INNER JOIN StaffLogin@hms12 l ON b.id=l.id'
      },
      {
        statement: '7. Display the biodata of all the workers of Staffs from its fragments',
        sql: '/raw?query=SELECT * FROM StaffBioMUM@hms2 UNION SELECT * FROM StaffBioPUN@hms2 UNION SELECT * FROM StaffBioGOA@hms2'
      }, {
        statement: '8. Generate total bill for all booking ids',
        sql: '/raw?query=select id, sum(t) as total FROM ((select sum(b.quantity*c.price) as t, b.bookid as id from bill b  inner join room r on r.id=b.roomid inner join category c on c.id=r.categoryid where roomid is not null group by b.bookid) UNION (select sum(b.quantity*e.price) as t, b.bookid as id from bill b inner join extras e on e.id=b.extraid where extraid is not null group by b.bookid) UNION (select sum(b.quantity*o.price) as t, b.bookid as id from bill b inner join offers o on o.id=b.offerid where offerid is not null group by b.bookid)) group by id'
      }      
    ]
  }

  /**
   * Handle the nameListService observable
   */
  /*getNames() {
    this.nameListService.get()
      .subscribe(
        names => this.names = names,
        error => this.errorMessage = <any>error
      );
  }*/

  runQuery(query: string, raw:boolean) {
    this.raw = raw;
    this.err = false;
    this.none = false;
    this.rowsAffected = '';
    this.oracle.get(query)
        .subscribe( 
          result => {
            this.rows = result.rows;
            this.names = result.names;
            this.insert = result.rowsAffected != undefined;
            this.rowsAffected = 'rows affected -> ' + result.rowsAffected;
          },
          error => { 
            this.err=true;
            console.error(error);
            this.error = error;
            this.rows = [];
            this.names = [];
            this.insert = false;
          }
        );
  }

  rawQuery() {
    this.rows=[];
    this.names=[];
    this.raw=true;
    this.none = true;
  }

  crossSystem() {
    this.raw = false;
    this.none = false;
    this.err = false;
    this.rowsAffected = '';
    this.rows = [];
    this.names = [];
    let query = '/raw?query=SELECT * FROM Customer';
    this.oracle.get(query)
        .subscribe( 
          result => {
            this.insert= false;
            this.rows = result.rows;
            this.rows.forEach((row) => {
              row.SITE = 1;
            });
            this.names = result.names;
            this.names.push({name: 'SITE'});
            this.oracle.getRemote(query)
                .subscribe( 
                  result => {
                    this.insert= false;
                    result.rows.forEach((row) => {
                      row.SITE = 2;
                    });
                    this.rows = this.rows.concat(result.rows);
                  },
                  error => { 
                    this.err=true;
                    console.error(error);
                    this.error = error;
                    this.insert = false;
                  }
                );
          },
          error => { 
            this.err=true;
            console.error(error);
            this.error = error;
            this.insert = false;
          }
        );

  }

  /**
   * Pushes a new name onto the names array
   * @return {boolean} false to prevent default form submit behavior to refresh the page.
   */
  /*addName(): boolean {
    // TODO: implement nameListService.post
    this.names.push(this.newName);
    this.newName = '';
    return false;
  }*/


  generateArray(obj){
   return Object.keys(obj).map((key)=>{ return obj[key]});
  }
}
