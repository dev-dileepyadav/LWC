public with sharing class ContactTriggerHandler {
    
    // Wheneve contact description is updated then update the descritpion of Account as well

    public static void updateRelatedAccdescription(List<contact>contacts, Map<id,contact>oldContact){

        Map<id,String> accidWithConDescription = new Map<id,String>();
        if(!contacts.isEmpty()){
            for(contact con : contacts){
                if(con.AccountId != null &&  con.description != oldContact.get(con.id).description){
                    accidWithConDescription.put(con.accountid,con.description);
                }
            }
        }


        List<Account> accounts = [SELECT id,Description FROM Account WHERE id =: accidWithConDescription.keyset()];

        List<Account> updatedAccount = new List<Account>();
        for(Account acc : accounts){
            acc.description = accidWithConDescription.get(acc.id);
            updatedAccount.add(acc);
        }

        update updatedAccount;
    }

    // count total number of contacts associted to an Account

    // First Way to do that
    /*
    public static void countTotalContacts(List<contact> contacts, Map<id,Contact> oldContact){
        Set<id> accids = new Set<Id>();

        if(!contacts.isEmpty()){
            for(contact con : contacts){
                if(oldContact != null){
                    if(con.Accountid != oldContact.get(con.id).AccountId){
                        accIds.add(con.accountId);
                        accids.add(oldContact.get(con.id).AccountId);
                    }else{
                        accids.add(con.AccountId);
                    }
                }else{
                    accids.add(con.AccountId);
                }
                
            }
        }
        List<Account> Accounts = [SELECT id,total_contacts__c,(SELECT id FROM Contacts) FROM Account WHERE id =: accids];

        List<Account> updateAccount = new List<Account>();
        for(Account acc : accounts){
            acc.total_contacts__c = acc.contacts.size();
            updateAccount.add(acc);
        }
        update updateAccount;
    }
*/
    //Second Way To do That 
/*
    public static void countTotalContacts(List<contact> contacts, Map<id,Contact> oldContact){

        set<id> accids = new set<id>();

        if(!contacts.isEmpty()){
            for(contact con : contacts){
                if(oldContact != null){
                    if(con.AccountId != oldContact.get(con.id).accountId){
                        accids.add(con.AccountId);
                        accIds.add(oldContact.get(con.id).accountId);
                    }else{
                        accIds.add(con.AccountId);
                    }
                }else{
                    accIds.add(con.AccountId);
                }
            }
        }

        List<Account> updateAccounts = new List<Account>();

        List<Account> accList = [SELECT id,total_contacts__c,(SELECT id FROM contacts) FROM Account WHERE id =: accids];

        
        if(!accList.isEmpty()){
            for(Account acc : accList){
                Integer numberOfContatct = 0;
                for(contact con : acc.Contacts){
                    numberOfContatct = numberOfContatct+1;
                    acc.total_contacts__c = numberOfContatct;
                }
                updateAccounts.add(acc);
            }
        }
        if(!updateAccounts.isEmpty()){
            update updateAccounts;
        }
        
    }
    */

    // Third way to do

    public static void countTotalContacts(List<contact> contacts, Map<id,Contact> oldContact){

        set<id> accIds = new set<id>();

        if(!contacts.isEmpty()){
            for(Contact con : contacts){
                if(oldContact != null){
                if(con.accountId != oldContact.get(con.id).accountId){
                        accIds.add(con.accountid);
                        accIds.add(oldContact.get(con.id).accountId);
                    }else{
                        accids.add(con.accountId);
                    }
                }else{
                    accIds.add(con.accountId);
                }
            }
        }

        List<Account> accList = [SELECT id FROM Account WHERE id =: accids];
        Map<id,Integer> numOfConWithAccId = new Map<id,Integer>();
        for(Account acc : accList){
            Integer numberOfContacts = [SELECT count() FROM Contact WHERE accountId =: acc.id];
            numOfConWithAccId.put(acc.id,numberOfContacts);
        }
        
        for(Account acc : accList){
            acc.total_contacts__c = numOfConWithAccId.get(acc.id);
        }

        update accList;
    }


    
}