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
