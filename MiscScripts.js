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

//Working code!
//Alerts for debugging
PPCHigh = $("#exinfobox .mylists tr:nth-child(9) td.coinformat:nth-child(2)").text();
PPCHigh = PPCHigh.replace(/,/g, '');
//alert(PPCHigh);
PPCLow = $("#exinfobox .mylists tr:nth-child(9) td.coinformat:nth-child(3)").text();
PPCLow = PPCLow.replace(/,/g, '');
//alert(PPCLow);
AvgPPC = ((parseFloat(PPCHigh) + parseFloat(PPCLow)) / 2).toFixed(6);
//alert(AvgPPC)

//Working code!
//Alerts for debugging
TRCHigh = $("#exinfobox .mylists tr:nth-child(11) td.coinformat:nth-child(2)").text();
TRCHigh = TRCHigh.replace(/,/g, '');
//alert(TRCHigh);
TRCLow = $("#exinfobox .mylists tr:nth-child(11) td.coinformat:nth-child(3)").text();
TRCLow = TRCLow.replace(/,/g, '');
//alert(TRCLow);
AvgTRC = ((parseFloat(TRCHigh) + parseFloat(TRCLow)) / 2).toFixed(6);
//alert(AvgTRC);

TRCBalance = $("#balancebox .mylists tr:nth-child(6) td.coinformat:nth-child(2)").text();
TRCBalance = TRCBalance.replace(/,/g, '');
//PPCBalance = $("#balancebox .mylists tr:nth-child(9) td.coinformat:nth-child(2)").text();
PPCBalance = $("#balancebox .mylists tr:nth-child(5) td.coinformat:nth-child(2)").text();
PPCBalance = PPCBalance.replace(/,/g, '');

TRCProfit = ((TRCBalance * AvgTRC)-(TRCBalance * InitTRC)).toFixed(6);
PPCProfit = ((PPCBalance * AvgPPC)-(PPCBalance * InitPPC)).toFixed(6);

//Ammending HTML to the balance box section - will be a profitability calculator.
//Quantity/Current Price/Price bought in at = +- profit infoboxes
$('#balancebox').append('</br><table class=\"mylists\" style="font-size: 70%"><tr><td colspan=5><strong>Profit</strong></td></tr><tr><th></th><th>Balance</th><th>Currently</th><th>Bought @</th><th>Profit</th></tr><tr><td colspan=\"5\"></td></tr><tr><td>BTC</td><td class=\"BTCBalance\">64.48127185</td><td class=\"Current1\">TEST</td></tr><tr class=\"alt\"><td>PPC</td><td class=\"PPCBalance\">19,900.00000001</td><td class=\"Current2\">' + AvgPPC + '</td><td class=\"BoughtAt\">' + InitPPC + '</td><td class=\"Profit2\">' + PPCProfit + '</td></tr><tr><td>TRC</td><td class=\"TRCBalance\">4,975.00000000</td><td class=\"Current3\">' + AvgTRC + '</td><td class=\"BoughtAt3\">' + InitTRC + '</td><td class=\"Profit3\">' + TRCProfit + '</td></tr></table>');

if(TRCProfit > 0) {
  $(".Profit3").css({"background-color": "green"});
  } else if (TRCProfit === 0){
  $(".Profit3").css({"background-color": "orange"});
  } else {
  $(".Profit3").css({"background-color": "red"});
  }
  
if(PPCProfit > 0) {
  $(".Profit2").css({"background-color": "green"});
  } else if (PPCProfit === 0){
  $(".Profit2").css({"background-color": "orange"});
  } else {
  $(".Profit2").css({"background-color": "red"});
  }
