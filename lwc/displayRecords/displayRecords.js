import { LightningElement, track, wire } from 'lwc';
import getAccounts from '@salesforce/apex/DisplayAccountsContacts.getAccountRecords';
import updateOpportunity from '@salesforce/apex/DisplayAccountsContacts.updateOpportunity'
import { createRecord } from 'lightning/uiRecordApi';

export default class DisplayRecords extends LightningElement {

    account;
    error;
    isSelected;
    clickaccId;

    @wire(getAccounts) 
    wiredAccounts({data,error}){
        if(data){
            this.account = data;
            this.error = undefined;
            console.log(data);
        }else if(error){
            this.error = error;
            this.data = undefined;
        }
    }

    // 02/01/2024
    handleScroll(e){
        const ids = e.target.dataset.ac;
        this.clickaccId = '#'+ids;
        
    }

    handelCheckBox(e){
        this.isSelected = e.target.checked
    }
    



    handleBooking(e){

        const fields = {
            "Name": e.target.dataset.accname,
            "StageName":"Prospecting",
            "CloseDate":new Date().toJSON().slice(0, 10),
            "AccountId":e.target.dataset.accid,
        }

        const recordDetails = {
            apiName:"Opportunity",
            fields:fields
        };
        createRecord(recordDetails).then((x)=>{
            console.log(x);
            alert("record created");
        }).catch((err)=>{
            console.log(err);
            alert("Can not make opportunity");
        })
    }

    handleCancel(e){
       const accountIdForCloseLostOpp = e.target.dataset.accid
        console.log(e.target.dataset.accid);
        updateOpportunity({accountId: accountIdForCloseLostOpp})
    }

    
    

    @track accounts = [{ name: 'First Account', contacts: [{ name: 'contact1', date: 'Thrus 21, 2023', time: '10PM - 2 PM', status: 'Book Now', statusCode: 'Not-Booked' },
    { name: 'contact2', date: 'Thrus 21, 2023', time: '10PM - 2 PM', status: 'Cancel Booking', statusCode: 'Booked' },
    { name: 'contact3', date: 'Thrus 21, 2023', time: '10PM - 2 PM', status: 'Book Now', statusCode: 'Not-Booked' },
    { name: 'contact4', date: 'Thrus 21, 2023', time: '10PM - 2 PM', status: 'Cancel Booking', statusCode: 'Booked' },
    { name: 'contact4', date: 'Thrus 21, 2023', time: '10PM - 2 PM', status: 'Cancel Booking', statusCode: 'Booked' }]
           }];
}