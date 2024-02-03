public with sharing class DisplayAccountsContacts {
   
    @AuraEnabled(cacheable = true)
    public static List<contact> getRelatedContacts(String accountId){
        return [SELECT id,FirstName,LastName,Email,Phone FROM Contact WHERE AccountId =:accountId];
    }

    @AuraEnabled(cacheable = true)
    public static List<Account> getAccountRecords(){
        return [SELECT Id,Name,Industry,(SELECT Id,LastName,FirstName FROM Contacts) FROM Account];
    }

    @AuraEnabled
    public static void updateOpportunity(String accountId){
        List<Opportunity> opportunities = [SELECT Id,accountId,name, StageName FROM opportunity WHERE accountId =: accountId];
        List<opportunity> opps = new List<opportunity>();
        for(opportunity opp : opportunities){
                opp.stageName = 'Closed Lost';
                opps.add(opp);
        }
        update opps;
    }
}