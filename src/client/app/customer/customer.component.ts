import { Component, OnInit } from '@angular/core';
import { OracleDBService } from '../shared/oracle-db/oracle-db.service';

@Component({
  /*moduleId: module.id,*/
  selector: 'sd-customer',
  templateUrl: 'customer.component.html',
  styleUrls: ['customer.component.scss'], 
}) 

export class CustomerComponent implements OnInit {

	form: any = {};	
	confirmDel: boolean = false;
	constructor(public oracle: OracleDBService) {

	}

	ngOnInit() {
		this.generateForms();
	}


	insert(): boolean {
		let columns: string[] = [];
		let values: string[] = [];
		let query: string = '';
		let err: boolean = false;
		this.form.inputs.forEach((input) => {
			if(input.value == '') 
				err = true;
			columns.push('"'+input.name+'"');
			if(input.name == 'DOB') {
				values.push("TO_DATE('"+input.value+"','yyyy-mm-dd')");
			} else {
				values.push("'"+input.value+"'");
			}
		});
		this.form.result = '';
		if(err) {
			this.form.error = 'Do not leave any input empty';
		} else {
			this.form.error = '';
			query = "INSERT INTO Customer("+columns.join(',')+") VALUES("+values.join(',')+")";
			this.oracle.get('/raw?query='+query).subscribe(
				result => {
					this.form.result = 'rows affected -> '+ result.rowsAffected;
					this.form.error = '';
				}, 
				error => {
					console.error(error);
					this.form.error = error.message;
					this.form.result = '';
				}
				);
		}
		
		return false;
	}

	update(): boolean {
		let query: string = 'UPDATE Customer SET ';
		let changes: string[] = [];
		let err: boolean = false;
		this.form.inputs.forEach((input) => {
			if(input.value == '')
				err = true;
			if(input.name !== 'ID') {
				if(input.name == 'DOB') {
					changes.push(input.name + "= TO_DATE('"+input.value+"','yyyy-mm-dd')");
				} else {
					changes.push(input.name + "='" + input.value+"'");
				}
			}
		});
		query += changes.join(',');
		query += ' WHERE ID=' + this.form.inputs[0].value;
		if(err) {
			this.form.error = 'Do not leave any input empty';
			this.form.result = '';
		} else {
			this.form.error = '';
			this.oracle.get('/raw?query='+query).subscribe(
				result => {
					this.form.result = 'rows affected -> '+ result.rowsAffected;
					this.form.error = '';
				}, 
				error => {
					console.error(error);
					this.form.error = error.message;
					this.form.result = '';
				}
				);
		}
		return false;
	}

	del(): boolean {
		if(this.confirmDel) {
			this.confirmDel = false;
			this.form.info = '';
			let query: string = "DELETE FROM Customer WHERE ID=" + this.form.inputs[0].value;
			this.form.result = '';
			if(this.form.inputs[0].value == '') {
				this.form.error = 'Enter a valid ID';
			} else {
				this.form.error = '';
				this.oracle.get('/raw?query=' + query).subscribe(
				result => {
					this.form.result = 'rows affected -> '+ result.rowsAffected;
					this.form.error = '';
				}, 
				error => {
					console.error(error);
					this.form.error = error.message;
					this.form.result = '';
				}
				);
			}
		} else {
			this.form.info = 'Press again to confirm delete';
			
			this.confirmDel = true;
			this.view();
		}
		
		return false;
	}

	view(): boolean {
		let query: string = "SELECT * FROM Customer WHERE ID=" + this.form.inputs[0].value;
		if(this.form.inputs[0].value == '') {
			this.form.error = 'Enter a valid ID';
		} else {
			this.form.error = '';
			this.oracle.get('/raw?query='+query).subscribe(
			result => {
				this.form.inputs.forEach((input)=>{
					if(result.rows.length > 0) {
						input.value = result.rows[0][input.name];
					} else {
						
						this.clear();
						this.form.error = 'ID not found';
					}
				});
			}, 
			error => {
				console.error(error);
				this.form.error = error.message;
				this.form.result = '';
			}
			);
		}
		return false;
	}

	clear() {
		this.form.inputs.forEach((input)=>{
			input.value='';
		})
		this.form.info = '';
		this.form.error = '';
		this.form.result = '';
		this.confirmDel = false;
	}

	generateForms() {
		this.form = {
				title: 'Customer form',
				inputs : [
					{
						type: 'number',
						name: 'ID',
						value: '',
						placeholder: 'Enter a new ID'
					},
					{
						type: 'text',
						name: 'NAME',
						value: '',
						placeholder: 'Enter name'
					},
					{
						type: 'email',
						name: 'EMAILID',
						value: '',
						placeholder: 'Enter email id'
					},
					{
						type: 'number',
						name: 'CONTACT',
						value: '',
						placeholder: 'Enter contact'
					},
					{
						type: 'date',
						name: 'DOB',
						value: '',
						placeholder: 'Enter DOB'
					},
					{
						type: 'text',
						name: 'GENDER',
						value: '',
						placeholder: 'Enter gender (M or F)'
					},
					{
						type: 'text',
						name: 'CITY',
						value: '',
						placeholder: 'Enter city'
					}
				]
			};
	}

}