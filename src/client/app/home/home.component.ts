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
    //this.runQuery('/select?columns=*&table=Staff', false);
    this.oracle.get('/select?columns=*&table=Staff')
        .subscribe(
          result => {
            console.log(result);
          },
          error => {
            console.error(error);
          }
        );
  }

  populateQueries() {
    this.queries = [
      {
        statement: '1. Display the number of bookings done by all the customers',
        sql: '/select?columns=Count(*) As Total_Bookings, CustomerID&table=Booking&groupby=customerID',
      },
      {
        statement: '2. Display the offers and extra services provided by the hotel',
        sql: '/raw?query=SELECT o.slug,o.price,o.expiresat,o.description,o.stock,e.type,e.name,e.price,e.id FROM Offers o INNER JOIN offerextras p ON o.id = p.offerID INNER JOIN Extras e ON p.extraID = e.id'
      },
      {
        statement: '3. Display the details of the rooms and category of rooms booked by the customers',
        sql: '/raw?query=SELECT ca.name,ca.city,ca.contact,r.id,r.location,c.bedcount,c.isac,c.price,c.name FROM Customer ca INNER JOIN Booking b ON ca.id=b.customerID INNER JOIN Room r ON b.roomID = r.id INNER JOIN Category c ON r.categoryid = c.id'
      },
      {
        statement: '4. Display all the details of the Customers from its corresponding fragments',
        sql: '/raw?query=SELECT * FROM CustomerMUM UNION SELECT * FROM CustomerPUN UNION SELECT * FROM CustomerGOA'
      },
      {
        statement: '5. Display the booking details of all the customers',
        sql: '/raw?query=SELECT b.id,b.roomID,b.checkinat,b.checkoutat FROM Booking b INNER JOIN (SELECT * FROM CustomerMUM UNION SELECT * FROM CustomerPUN UNION SELECT * FROM CustomerGOA) c ON c.id = b.customerID'
      },
      {
        statement: '6. Display the contents of Staff using the vertical fragments created',
        sql: '/raw?query=SELECT b.*, l.emailid, l.password FROM StaffBio@hms2 b INNER JOIN StaffLogin@hms12 l ON b.id=l.id'
      },
      {
        statement: '7. Display the biodata of all the workers of Staffs from its fragments',
        sql: '/raw?query=SELECT * FROM StaffBioMUM@hms2 UNION SELECT * FROM StaffBioPUN@hms2 UNION SELECT * FROM StaffBioGOA@hms2'
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
    this.none = false;
    this.oracle.get(query)
        .subscribe( 
          result => {
            this.rows = result.rows;
            this.names = result.names;
          },
          error => { 
            console.error(error);
          }
        );
  }

  rawQuery() {
    this.rows=[];
    this.names=[];
    this.raw=true;
    this.none = true;
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
