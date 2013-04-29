/*
NOTE:
THIS ENTIRE SCRIPT IS A COMBINATION OF NON-WORKING/BETA VERSIONS OF SCRIPTS FOR FUTURE USE.
THEY MAY NOT WORK RIGHT OFF THE BAT, THIS IS MORE OF A TESTING ZONE.
*/

//Script for profit
var balance = //Grab input from user
var PreProfit = (LowestSell-HighestBuy) * Balance;
var Cost = 0;
    for (var i = 3; i < 23; i++) {
      If (SellQuantity < 0.x) { //sellquantity being the quantity of btc being exchanged
        Cost += Sellquantity
      } else {
        var lowPostPrice = //This row's price
        i = 23; //break out of loop
      }

    } //end of loop
var PostProfit = (((LowestSell-HighestBuy)*Balance) - PreProfit)-Cost;
If ((PostProfit > 0) && (RecentBuys > RecentSells)) {
  Alert("Worth spending" Cost "btc to raise price to" lowPostPrice "You'll earn" PostProfit);
} else {
  alert("Not worth it.")
}


//Website status Script
//Instead of an alert, we could have red/green lights if it doesnt load/ doesloads.
function reportError(xObj){  
  locationName = xObj.alt;  
  alert("Links on this page may not work since the server at " + locationName + " appears to be down!");  
}  

<img src="URL" alt="URL" style="width:0;height:0;visiblity:hidden;position:absolute;" onerror="reportError(this)">  

//**********************//
//
//
//BEGINNING OF BALANCE SCRIPT
//WARNING MASSIVE!!
//
//
//*********************//

//variables
var AvgPPC = 0;
var AvgTRC = 0;
var PPCHigh = 0;
var PPCLow = 0;
var TRCHigh = 0;
var TRCLow = 0;
//InitPPC = the price you bought in @
//Configure yourself. Multiple purchases not supported.
var InitPPC = 0.0002;
var PPCProfit = 0;
var PPCBalance = 0;
//InitTRC = the price you bought in @
//Configure yourself. Multiple purchases not supported.
var InitTRC = 0.00105;
var TRCProfit = 0;
var TRCBalance = 0;

AvgPPC = Balancebox.AvgVal(9);

PPCBalance = Balancebox.balance(9);

//Ammending HTML to the balance box section - will be a profitability calculator.
//Quantity/Current Price/Price bought in at = +- profit infoboxes
// ==UserScript==
// @name        Isolated buy & sell price function (Working)
// @namespace   Ricky
// @match       https://vircurex.com/orders*
// @match       https://vircurex.com/welcome/index?alt=*
// @include     https://vircurex.com/welcome/index?alt=*
// @include     https://vircurex.com/orders?alt=*
// @version     0.165
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require     http://code.jquery.com/ui/1.10.2/jquery-ui.js
// @grant none
// ==/UserScript==

//Quantity/Current Price/Price bought in at = +- profit infoboxes
$('.disclaimer').prepend('</br><table class=\"mylists\" style="font-size: 80%">'
                          + '<tr><td colspan=10></td></tr>'
                          + '<tr><th></th><th>Balance</th><th>Current Value</th><th>Bought @</th><th>Profit</th></tr>'
                          + '<tr class=\"alt\"><td>'
                            + '<select id="currencyList">'
                              + '<option>Currency:</option>'
                              + '<option>BTC</option>'
                              + '<option>LTC</option>'  
                              + '<option>PPC</option>'
                              + '<option>TRC</option>'
                              + '<option>DVC</option>'
                              + '<option>NMC</option>'
                            + '</select>'
                            + '<td class=\"PPCBalance\"><input type="text" id="BalanceInput" /><input type="button" id="a" value="Auto" onClick="submit1();"></td><td class=\"Current2\">' + "blah" + '</td><td class=\"BoughtAt\"><input type="text" id="CoinInit" /></td><td class=\"Submit\"><input type="button" id="a" value="Go" onClick="submit2();"></td></tr>'
                            + '<tr><td></td></tr>' 
                         + '<tr><th></th><th>Balance</th><th>Current Value</th><th>Bought @</th><th>Profit</th></tr>'
                            + '<tr><td class=\"Balance\"><input type="text" id="Diff" /></td><td class=\"2\"><input type="text" id="CoinInit" value="btc"/></td><td class=\"3\"></td><td><input type="text" id="CoinInit" value="Profit"/></td><td class=\"Submit\"><input type="button" id="a" value="Go" onClick="submit2();"></td></tr>'
                            + '<tr><td></td></tr>' 
                         + '<tr><th></th><th>Balance</th><th>Current Value</th><th>Bought @</th><th>Profit</th></tr>'
                            + '<tr><td class=\"Balance\"><input type="text" id="Diff" /></td><td class=\"2\"><input type="text" id="CoinInit" value="btc"/></td><td class=\"3\"></td><td><input type="text" id="CoinInit" value="Profit"/></td><td class=\"Submit\"><input type="button" id="a" value="Go" onClick="submit2();"></td></tr>'
                          + '</table></br>'
                        //
                        +'<table class=\"mylists\" style="font-size: 80%">'
                        +'<tr><td colspan=3></td></tr>'
                        +'<tr><th></th><th>Balance</th><th>Current Value</th><th>Bought @</th><th>Profit</th></tr>'
                        +'</table>');

//Following 2 things break it.. gotta enclose em or something..
function submit2()
{
 $("#a").click(function(){
      var InitCoinVal = document.getElementById("CoinInit");
      var Currency = document.getElementById("currencylist");
      balancebox.profit(InitCoinVal, Currency);
   });
}

function submit1()
{
 $("#b").click(function(){
      UsrBalInput = document.getElementById("BalanceInput");
   });
}

profit: function(InitCoinVal){
  //cant...brain...
  //grab currency they want to calculate from currencylist (list in table inserted above)
  //Calculate profit for that type of currency
  //requires the user to input initcoinval then hit GO to call this!
  //Need to call balance and avgval to grab the currency type's balance and avgval.
  //If the user tries to calculate without having a balance in that, it'll be a problem, it'll break the balance script!
  //Balance script will return nothing if balance = 0.
  //Make balance an inputable textbox with a button beside it to grab the user's ACTUAL value of balance?
    Profit = ((Balance * AvgVal)-(Balance * InitCoinVal)).toFixed(6);
},

//Calling below function
Balancebox.balancecolour(TRCProfit, ".Profit3"); //trcprofit
Balancebox.balancecolour(PPCProfit, ".Profit2"); //ppcprofit

//Beginning of modular function container
var BalanceBox = {

balance: function(tr) {
  var Balance = $("#balancebox .mylists tr:nth-child(" + tr + ") td.coinformat:nth-child(2)").text();
  return Balance;
},

//Issue with this is we need to grab the type which the following will do
//But we also need to know which tr within the balance this type is located.
//not all used will have the same balance types in the same places.
balanceType: function(tr) {
  var balanceType = $("#balancebox .mylists tr:nth-child(" + tr + ") td.coinformat:nth-child(1)").text();
  return balanceType;
},

AvgVal: function(tr) {
High = $("#exinfobox .mylists tr:nth-child(" + tr + ") td.coinformat:nth-child(2)").text();
High = Cleanup(High);
//alert(TRCHigh);
Low = $("#exinfobox .mylists tr:nth-child(" + tr + ") td.coinformat:nth-child(3)").text();
Low = Cleanup(Low);
//alert(TRCLow);
AvgVal = (((High) + (Low)) / 2).toFixed(6);
return AvgVal;
},

CleanUp: function(Value){
  Value = Value.replace(/,/g, '');
  parseFloat(Value);
  return Value;
},

BalanceValDerp: function() {
  for (var z = 2; z < 10; z++) 
  {
    if((BalanceBox.balanceType(z))!="") {
          //Avg = Balancebox.AvgVal(11);
          var ((BalanceBox.balanceType(z)+Balance) = Balancebox.balance(z);        
    } else {
      break;
    }
  }
},

//The above function will replace the following two lines.
//TRCProfit = ((TRCBalance * AvgTRC)-(TRCBalance * InitTRC)).toFixed(6);
//PPCProfit = ((PPCBalance * AvgPPC)-(PPCBalance * InitPPC)).toFixed(6);

//Above made into a function
//Could even probably merge this with the colouring of recent buy/sell.
//Both use green/orange/red.
balancecolour: function(a,b) {
if(a > 0) {
  $(b).css({"background-color": "green"});
  } else if (a === 0){
  $(b).css({"background-color": "orange"});
  } else {
  $b).css({"background-color": "red"});
  }
}
};


//Detecting what type of coin you have in balance
//There's probably a better way of doing this..meh.
    for (var x = 2; x < 6; x++) 
    {
        if((BalanceBox.balanceType(x))==="") {
          // WHERE CHECK CODE GOES! //
          Break;
        } else if ((BalanceBox.balanceType(x))==="PPC") {
            //AvgPPC = Balancebox.AvgVal(11);
            PPCBalance = Balancebox.balance(x);        
        } else if ((BalanceBox.balanceType(x))==="TRC") {
            //AvgTRC = Balancebox.AvgVal(11);
            TRCBalance = Balancebox.balance(x);
        } else if ((BalanceBox.balanceType(x))==="LTC") {
            //AvgLTC = Balancebox.AvgVal(11);
            LTCBalance = Balancebox.balance(x);        
        } else if ((BalanceBox.balanceType(x))==="EUR") {
            //AvgEUR = Balancebox.AvgVal(11);
            EURBalance = Balancebox.balance(x);        
        } else if ((BalanceBox.balanceType(x))==="USD") {
            //AvgUSD = Balancebox.AvgVal(11);
            USDBalance = Balancebox.balance(x);        
        } else if ((BalanceBox.balanceType(x))==="NMC") {
            //AvgNMC = Balancebox.AvgVal(11);
            NMCBalance = Balancebox.balance(x);        
        } else if ((BalanceBox.balanceType(x))==="DVC") {
            //AvgDVC = Balancebox.AvgVal(11);
            DVCBalance = Balancebox.balance(x);        
        } else if ((BalanceBox.balanceType(x))==="IXC") {
            //AvgIXC = Balancebox.AvgVal(11);
            IXCBalance = Balancebox.balance(x);        
        }

      //Read 
    }

    //NOTE THE FOLLOWING CODE IS PSEUDOCODE! (Shite-code more like amirite? ( ._.) )
    //The following would be put in line 129:
    if(AllTypes[] !Contains "Type") {
      //Offer places to get this "Type" of coin for free!
      //Refferals etc
      //Subtle links etc.
    } else if (AllTypes[] !Contains "Type2") {
      //ETC... for all types of currency
    }

    var CurrencyType = ['PPC', 'TRC', 'LTC', 'DVC', 'BTC', 'NMC', 'IXC', 'USD', 'EUR'];

    //How do you compare one array with another array?
    //If one array doesnt have some of the values in the second array,
    //We could assume they dont have that type of currency.
    function containsType(Alltypes, CurrencyType, x) {
        if(Alltypes[x] !Contains CurrencyType[x]){
          //offer stuff for CurrencyType[x]
        }
    }
