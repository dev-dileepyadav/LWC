public with sharing class OpportunityHandler {
    
    public static void getHighestAmountOpportunity(List<opportunity> oppList, Map<Id,Opportunity> oldOpp){
        
        Set<Id> accIds = new Set<Id>();
        List<Account> updatedAccount = new List<Account>();
        if(!oppList.isEmpty()){
            for(Opportunity opp : oppList){
                if(oldOpp != null){
                    Opportunity oldOp = oldOpp.get(opp.id);
                    if(oldOp.AccountId != opp.AccountId){
                        
                        accIds.add(opp.AccountId);
                        accIds.add(oldOp.AccountId);
                    }else{
                        accIds.add(opp.AccountId);
                    }
                }else{
                    accIds.add(opp.AccountId);
                }
            }
        }
        Map<Id,Decimal> highestAmountOpp = new Map<Id,Decimal>();
        if(!accIds.isEmpty()){
            List<opportunity> relatedOpp = [SELECT id,
                                            Name,
                                            AccountId,
                                            Amount 
                                            FROM opportunity
                                            WHERE AccountId =: accIds AND isClosed = true];

            for(Opportunity opp : relatedOpp){
                Decimal maxAmount = highestAmountOpp.get(opp.AccountId);
                System.debug('Max Amount var--> '+maxAmount);
                if(maxAmount == null || opp.Amount > maxAmount){
                    highestAmountOpp.put(opp.AccountId,opp.Amount);
                    system.debug('Amount Map --> '+highestAmountOpp);
                }
            }
            
            for(Id accid : accIds){
                Decimal maxAmount = highestAmountOpp.get(accid);
                System.debug('Max Amount var in For loop--> '+maxAmount);
                Account acc = new Account();
                acc.id = accid;
                acc.Highest_Closed_Won_Opp_Amount__c = maxAmount;
                updatedAccount.add(acc);
            }
            if(!updatedAccount.isEmpty()){
                update updatedAccount;
            }
        }
    }

    public static void getSumOfAmount(List<opportunity> opportunities,Map<id,Opportunity> oldOpportunities){
        Set<id> accids = new Set<id>();

        if(!opportunities.isEmpty()){
            for(opportunity opp : opportunities){
                if(oldOpportunities != null){
                if(opp.accountId !=  oldOpportunities.get(opp.id).accountId){
                        accids.add(oldOpportunities.get(opp.id).accountId);
                        accids.add(opp.accountId);
                    }else{
                        accids.add(opp.accountId);
                    }
                }else{
                    accids.add(opp.accountId);
                }
            }
        }

        List<Account> updateaccList = new List<Account>();
        List<aggregateResult> sumOfAmount = [SELECT accountid ids, SUM(amount) amt FROM opportunity WHERE accountId =: accids GROUP BY accountId];

        for(aggregateResult ag : sumOfAmount){
            account acc = new account();
            acc.id = (id)ag.get('ids');
            acc.total_opportunity_amount__c = (Decimal)ag.get('amt');
            updateaccList.add(acc);
        }

        update updateaccList;
    }
}