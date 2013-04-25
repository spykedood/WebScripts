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

AvgPPC = AvgVal(9);
AvgTRC = AvgVal(11)

TRCBalance = balance(6);
PPCBalance = balance(9);

function balance(tr) {
  var Balance = $("#balancebox .mylists tr:nth-child(" + tr + ") td.coinformat:nth-child(2)").text();
  return Balance;
}

function AvgVal(tr) {
High = $("#exinfobox .mylists tr:nth-child(" + tr + ") td.coinformat:nth-child(2)").text();
High = Cleanup(High);
//alert(TRCHigh);
Low = $("#exinfobox .mylists tr:nth-child(" + tr + ") td.coinformat:nth-child(3)").text();
Low = Cleanup(Low);
//alert(TRCLow);
AvgVal = (((High) + (Low)) / 2).toFixed(6);
return AvgVal;
}

function CleanUp(Value){
  Value = Value.replace(/,/g, '');
  parseFloat(Value);
  return Value;
}

function Profit(Balance, AvgCal, InitCoinVal){
  Profit = ((Balance * AvgVal)-(Balance * InitCoinVal)).toFixed(6);
}

//The above function will replace the following two lines.
//TRCProfit = ((TRCBalance * AvgTRC)-(TRCBalance * InitTRC)).toFixed(6);
//PPCProfit = ((PPCBalance * AvgPPC)-(PPCBalance * InitPPC)).toFixed(6);

//Ammending HTML to the balance box section - will be a profitability calculator.
//Quantity/Current Price/Price bought in at = +- profit infoboxes
$('#balancebox').append('</br><table class=\"mylists\" style="font-size: 70%"><tr><td colspan=5><strong>Profit</strong></td></tr><tr><th></th><th>Balance</th><th>Currently</th><th>Bought @</th><th>Profit</th></tr><tr><td colspan=\"5\"></td></tr><tr><td>BTC</td><td class=\"BTCBalance\">64.48127185</td><td class=\"Current1\">TEST</td></tr><tr class=\"alt\"><td>PPC</td><td class=\"PPCBalance\">19,900.00000001</td><td class=\"Current2\">' + AvgPPC + '</td><td class=\"BoughtAt\">' + InitPPC + '</td><td class=\"Profit2\">' + PPCProfit + '</td></tr><tr><td>TRC</td><td class=\"TRCBalance\">4,975.00000000</td><td class=\"Current3\">' + AvgTRC + '</td><td class=\"BoughtAt3\">' + InitTRC + '</td><td class=\"Profit3\">' + TRCProfit + '</td></tr></table>');

//Above made into a function
//Could even probably merge this with the colouring of recent buy/sell.
//Both use green/orange/red.
function balancecolour(a,b) {
if(a > 0) {
  $(b).css({"background-color": "green"});
  } else if (a === 0){
  $(b).css({"background-color": "orange"});
  } else {
  $b).css({"background-color": "red"});
  }
}

//Calling above function
balancecolour(TRCProfit, ".Profit3"); //trcprofit
balancecolour(PPCProfit, ".Profit2"); //ppcprofit
