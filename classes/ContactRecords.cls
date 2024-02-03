
public with sharing class ContactRecords {
    @AuraEnabled(cacheable = true)
    public static List<contact> getContactRecords(){
        List<contact> contacts = new List<contact>();
        contacts =[SELECT id,LastName,FirstName,Email FROM Contact];
        return contacts;
    }
    
    @AuraEnabled(cacheable = true)
    public static void deleteMassRecords(List<Contact> conList){
        List<Contact> contacts = [SELECT id FROM contact Where id =:conList];
        if(contacts != null && contacts.size() > 0){
            delete contacts;
            //return contacts;
        }
    }
}