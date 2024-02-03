import { LightningElement, api, wire } from 'lwc';
import getRelatedContacts from '@salesforce/apex/DisplayAccountsContacts.getRelatedContacts';

const columns = [
    {label:"First Name", fieldName:"FirstName"},
    {label:"Last Name", fieldName:"LastName"},
    {label:"Email",fieldName:"Email"},
    {label:"Phone",fieldName:"Phone"}
]

export default class GetAccountsRelatedContacts extends LightningElement {
    columns = columns;
    @api recordid;

    @wire(getRelatedContacts,{accountId:'$recordid'}) contacts;
}