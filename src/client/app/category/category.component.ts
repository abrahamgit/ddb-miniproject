import { Component, OnInit } from '@angular/core';
import { OracleDBService } from '../shared/oracle-db/oracle-db.service';

@Component({
  /*moduleId: module.id,*/
  selector: 'sd-category',
  templateUrl: 'category.component.html',
  styleUrls: ['category.component.scss'], 
}) 

export class CategoryComponent implements OnInit {

	forms: any[] = [];	
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
		this.forms[0].inputs.forEach((input) => {
			if(input.value == '') 
				err = true;
			columns.push('"'+input.name+'"');
			if(input.name == 'DOB') {
				values.push("TO_DATE('"+input.value+"','yyyy-mm-dd')");
			} else {
				values.push("'"+input.value+"'");
			}
		});
		this.forms[0].result = '';
		if(err) {
			this.forms[0].error = 'Do not leave any input empty';
		} else {
			this.forms[0].error = '';
			query = "INSERT INTO Category("+columns.join(',')+") VALUES("+values.join(',')+")";
			this.oracle.get('/raw?query='+query).subscribe(
				result => {
					this.forms[0].result = 'rows affected -> '+ result.rowsAffected;
					this.forms[0].error = '';
				}, 
				error => {
					console.error(error);
					this.forms[0].error = error.message;
					this.forms[0].result = '';
				}
				);
		}
		
		return false;
	}

	update(): boolean {
		let query: string = 'UPDATE Category SET ';
		let changes: string[] = [];
		let err: boolean = false;
		this.forms[1].inputs.forEach((input) => {
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
		query += ' WHERE ID=' + this.forms[1].inputs[0].value;
		if(err) {
			this.forms[1].error = 'Do not leave any input empty';
		} else {
			this.forms[1].error = '';
			this.oracle.get('/raw?query='+query).subscribe(
				result => {
					this.forms[1].result = 'rows affected -> '+ result.rowsAffected;
					this.forms[1].error = '';
				}, 
				error => {
					console.error(error);
					this.forms[1].error = error.message;
					this.forms[1].result = '';
				}
				);
		}
		return false;
	}

	del(): boolean {

		let query: string = "DELETE FROM Category WHERE ID=" + this.forms[2].inputs[0].value;
		this.forms[2].result = '';
		if(this.forms[2].inputs[0].value == '') {
			this.forms[2].error = 'Enter a valid ID';
		} else {
			this.forms[2].error = '';
			this.oracle.get('/raw?query='+query).subscribe(
			result => {
				this.forms[2].result = 'rows affected -> '+ result.rowsAffected;
				this.forms[2].error = '';
			}, 
			error => {
				console.error(error);
				this.forms[2].error = error.message;
				this.forms[2].result = '';
			}
			);
		}
		
		return false;
	}

	submit(par: any): boolean {
		switch(par){
			case 'INSERT':
				this.insert();
				break;
			case 'UPDATE':
				this.update();
				break;
			case 'DELETE':
				this.del();
				break;
		}
		return false;
	}

	generateForms() {
		this.forms = [
			{
				title: 'Insert form',
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
						type: 'number',
						name: 'BEDCOUNT',
						value: '',
						placeholder: 'Enter number of beds'
					},
					{
						type: 'number',
						name: 'ISAC',
						value: '',
						placeholder: 'If AC Room (1 or 0)'
					},
					
					{
						type: 'number',
						name: 'PRICE',
						value: '',
						placeholder: 'Enter Price'
					}
				],
				submit : {
					button: 'INSERT'
				}
			},
			{
				title: 'Update form',
				inputs : [
					{
						type: 'number',
						name: 'ID',
						value: '',
						placeholder: 'Enter an ID to modify'
					},
					{
						type: 'text',
						name: 'NAME',
						value: '',
						placeholder: 'Enter name'
					},
					{
						type: 'number',
						name: 'BEDCOUNT',
						value: '',
						placeholder: 'Enter number of beds'
					},
					{
						type: 'number',
						name: 'ISAC',
						value: '',
						placeholder: 'If AC Room (1 or 0)'
					},
					
					{
						type: 'number',
						name: 'PRICE',
						value: '',
						placeholder: 'Enter Price'
					}
				],
				submit : {
					button: 'UPDATE'
				}
			},
			{
				title: 'Delete form',
				inputs : [
					{
						type: 'number',
						name: 'ID',
						value: '',
						placeholder: 'Enter an ID to delete'
					}
				],
				submit : {
					button: 'DELETE'
				}
			}
		]
	}

}