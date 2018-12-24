import { LightningElement, track, wire, api } from 'lwc';
import getAccountsList from '@salesforce/apex/AccountsController.getAccountsList';
import Id from '@salesforce/user/Id';  // this line is used to get the current logged in used Id
import {NavigationMixin} from 'lightning/navigation';
import {ShowToastEvent } from 'lightning/platformShowToastEvent';

//export default class HelloWorld extends LightningElement {} // this line is commented because I am using below code need to added for navigation
export default class MyCustomElement extends NavigationMixin(LightningElement) {
    @track greeting = 'World';
    @api recordId; //this line used to get the current recordid lwc
    @api objectApiName; //this line is used to get the object API Name in lwc.
    userId = Id;
    @wire(getAccountsList) accountsList; //Wire an Apex Method to a Property
    changeHandler(event) {
        this.greeting = event.target.value;
    }
    createNewAccount() {
        // Opens the new Account record modal
        // to create an Account.
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: this.objectApiName,
                actionName: 'new'
            }
        });
    }
    navigateToRecordViewPage() {
        // View a custom object record.
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordId,
                objectApiName: this.objectApiName, // objectApiName is optional
                actionName: 'view'
            }
        });
    }

    navigateToRecordEditPage() {
        // Opens the Account record modal
        // to view a particular record.
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId:this.recordId,
                objectApiName: this.objectApiName, // objectApiName is optional
                actionName: 'edit'
            }
        });
    }
    navigateToRelatedList() {
        // Navigate to the CaseComments related list page
        // for a specific Case record.
        this[NavigationMixin.Navigate]({
            type: 'standard__recordRelationshipPage',
            attributes: {
                recordId:this.recordId,
                objectApiName: this.objectApiName,
                relationshipApiName: 'Contacts',
                actionName: 'view'
            }
        });
        
    }
      showNotification() {
        const evt = new ShowToastEvent({
            title: this._title,
            message: this.message,
            variant: this.variant,
        });
        this.dispatchEvent(evt);
    }

}