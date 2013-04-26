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
$('#balancebox').append('</br><table class=\"mylists\" style="font-size: 70%"><tr><td colspan=5><strong>Profit</strong></td></tr><tr><th></th><th>Balance</th><th>Currently</th><th>Bought @</th><th>Profit</th></tr><tr><td colspan=\"5\"></td></tr><tr><td>BTC</td><td class=\"BTCBalance\">64.48127185</td><td class=\"Current1\">TEST</td></tr><tr class=\"alt\"><td>PPC</td><td class=\"PPCBalance\">19,900.00000001</td><td class=\"Current2\">' + AvgPPC + '</td><td class=\"BoughtAt\">' + InitPPC + '</td><td class=\"Profit2\">' + PPCProfit + '</td></tr><tr><td>TRC</td><td class=\"TRCBalance\">4,975.00000000</td><td class=\"Current3\">' + AvgTRC + '</td><td class=\"BoughtAt3\">' + InitTRC + '</td><td class=\"Profit3\">' + TRCProfit + '</td></tr></table>');

//Calling below function
Balancebox.balancecolour(TRCProfit, ".Profit3"); //trcprofit
Balancebox.balancecolour(PPCProfit, ".Profit2"); //ppcprofit

//Beginning of modular function container
var BalanceBox = {

balance: function(tr) {
  var Balance = $("#balancebox .mylists tr:nth-child(" + tr + ") td.coinformat:nth-child(2)").text();
  return Balance;
},

balanceType: function(tr) {
  var Balance = $("#balancebox .mylists tr:nth-child(" + tr + ") td.coinformat:nth-child(2)").text();
  return Balance;
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

Profit: function(Balance, AvgCal, InitCoinVal){
  Profit = ((Balance * AvgVal)-(Balance * InitCoinVal)).toFixed(6);
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

    function containsType(Alltypes, CurrencyType, x) {
        if(Alltypes[x] !Contains CurrencyType[x]){
          //offer stuff for CurrencyType[x]
        }
    }

    function BalanceValDerp() {
      for (var z = 2; z < 10; z++) 
      {
        if((BalanceBox.balanceType(z))!="") {
              //Avg = Balancebox.AvgVal(11);
              ((BalanceBox.balanceType(z)+Balance) = Balancebox.balance(z);        
        } else {
          break;
        }
      }
    }
