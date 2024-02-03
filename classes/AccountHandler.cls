public with sharing class AccountHandler {
    // If Create related contact check box is checked while creating or updating Account then create contact
    public static void createRelatedContact(List<Account> AccList, Map<Id,Account> oldAccount){
        
        List<contact> conList = new List<contact>();
        //Account oldRecord = new Account();
        for(Account acc : accList){
            //if(oldAccount != null){
              //  oldRecord = oldAccount.get(acc.id);
           // }
             
            if(acc.Create_related_Contact__c && 
            (oldAccount == null || !oldAccount.get(acc.id).Create_related_Contact__c)){
                contact con = new contact();
                con.LastName = acc.Name;
                con.FirstName = ' Contact';
                con.Phone = acc.Phone;
                con.AccountId = acc.id;
                conList.add(con);
            }
        }
        insert conList;
    }
// whenever a account is created Phone field should not be empty
    public static void canNotInsertAccWithoutPhone(List<Account> accounts){
        for(Account acc  :accounts){
            if(acc.Phone == null){
                acc.addError('Can Not Insert Account Without Phone');
            }
        }
    }
// Whenever a Account is created or updated map the shiping address with billing address
    public static void updateBillingAddress(List<Account> accounts){

        if(!accounts.isEmpty()){
            for(Account acc : accounts){
                if(acc.billingCity != null){
                    acc.shippingCity = acc.billingCity;
                }
                if(acc.billingCountry != null){
                    acc.shippingCountry = acc.billingCountry;
                }
            }
        }
    }

    // Whenever Account's phone updated then all related contacts phone should updated
// first Method

/*
    public static void updaterelatedContactField(List<Account> accounts, Map<id,Account> oldAccounts){
        Set<id> accIds = new Set<id>();
        List<contact> updateContacts = new List<contact>();
        if(!accounts.isEmpty()){
            for(Account acc : accounts){
                if(acc.phone != oldAccounts.get(acc.id).Phone){
                    accIds.add(acc.id);
                }
            }
            
            List<Account> accList = [SELECT id,Phone,(SELECT id,Phone FROM contacts) FROM account WHERE id =: accIds];

            for(Account acc : accList){
                for(contact con : acc.contacts){
                    con.phone = acc.phone;
                    updateContacts.add(con);
                }
            }
           update updateContacts;
        }
    }
*/
    // Second Method

    public static void updaterelatedContactField(List<Account> accounts, Map<id,Account> oldAccounts){

        Map<id,String> accWithPhone = new Map<id,String>();

        if(!accounts.isEmpty()){
            for(Account acc : accounts){
                if(acc.Phone != oldAccounts.get(acc.id).Phone){
                    accWithPhone.put(acc.id,acc.phone);
                }
            }
        }
        List<contact> conList = [SELECT Id,Phone,AccountId FROM Contact WHERE accountId =: accWithPhone.keyset()];

        List<contact> updatedContacts = new List<Contact>();
        for(Contact con : conList){
           con.Phone = newAccountById.get(con.AccountId).Phone;
           updatedContacts.add(con);
        }
        if(!updatedContacts.isEmpty()){
            update updatedContacts;
        }
    }

    // Avoide duplicate Name Account 

    public static void avoideDuplicateName(List<Account> accounts){
        set<String> accountNames = new set<String>();

        if(!accounts.isEmpty()){
            for(Account acc : accounts){
                accountNames.add(acc.Name);
            }
        }

        List<Account> excistingAccounts = [SELECT Name FROM account WHERE name =: accountNames];

        Map<String,Account> accountMap = new Map<String,Account>();
        for(Account acc : excistingAccounts){
            accountMap.put(acc.name,acc);
        }

        for(Account acc : accounts){
            if(accountMap.containsKey(acc.name)){
                acc.addError('Duplicate Record in Account');
            }
        }
    }

    // Create related account of checkbox is checked;

    public static void createRelatedContact(List<Account> accounts){

        List<contact> contacts=  new List<contact>();
        for(account acc : accounts){
            if(acc.Create_related_Contact__c){
                contact con = new contact();
                con.LastName = acc.name;
                con.AccountId = acc.id;
                contacts.add(con);
            }
        }

        insert contacts;
    }

    public static void sendEmails(List<Account> accounts, Map<id,Account> oldAccount){

        set<id> accids= new set<id>();

        for(Account acc : accounts){
            if(acc.Type != oldAccount.get(acc.id).type){
                accIds.add(acc.Id);
            }
        }

        List<contact> contacts = [SELECT id,LastName,Email,AccountId FROm contact WHERE accountId =: accIds];

        List<messaging.singleEmailMessage> emails = new List<messaging.singleEmailMessage>();
        if(!contacts.isEmpty()){
            for(contact con : contacts){
                messaging.singleEmailMessage email = new messaging.singleEmailMessage();
                email.setTargetObjectId(con.id);
                email.Toaddresses = new List<String>{con.email}; //new String [] {con.email};
                email.setSubject('Account Type changed');
                String body = 'Hello'+con.LastName+'<br/>';
                body += 'Your Account Type Changed successfully';
                email.setHTMLBody(body);
                emails.add(email);
            }
        }
        if(!emails.isEmpty()){
            messaging.sendEmail(emails);
        }
        
    }
    
// on updation
    public static void updateAccountCountOnUserOnUpdate(List<Account>accounts){

        set<id> userids = new set<id>();

        for(Account acc : accounts){
            userids.add(acc.LastModifiedById);
        }
        List<User> users = [SELECT Id, Name, Account_Update_Count__c FROM User WHERE id =: userids];

        List<user> user = new List<user>();
        for(user use  : users){
            Decimal previousValue = use.Account_Update_Count__c;
            user us = new user();
            us.id = use.id;
            us.Account_Update_Count__c = previousValue+1;
            user.add(us);
        }
        update user;
    }
// on delete
    public static void updateAccountCountOnUserOnDelete(List<Account>accounts){

        set<id> userids = new set<id>();

        for(Account acc : accounts){
            userids.add(acc.LastModifiedById);
        }
        List<User> users = [SELECT Id, Name, Account_Update_Count__c FROM User WHERE id =: userids];

        List<user> user = new List<user>();
        for(user use  : users){
            Decimal previousValue = use.Account_Update_Count__c;
            user us = new user();
            us.id = use.id;
            us.Account_Update_Count__c = previousValue-1;
            user.add(us);
        }
        update user;
    }
}