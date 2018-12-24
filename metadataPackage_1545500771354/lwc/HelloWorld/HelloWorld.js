import { LightningElement, track, wire, api } from 'lwc';
import getAccountsList from '@salesforce/apex/AccountsController.getAccountsList';
import Id from '@salesforce/user/Id';  // this line is used to get the current logged in used Id

export default class HelloWorld extends LightningElement {
    @track greeting = 'World';
    @api recordId; //this line used to get the current recordid lwc
    @api objectApiName; //this line is used to get the object API Name in lwc.
    userId = Id;
    @wire(getAccountsList) accountsList; //Wire an Apex Method to a Property
    changeHandler(event) {
        this.greeting = event.target.value;
    }
}