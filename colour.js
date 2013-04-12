// ==UserScript==
// @name        Isolated buy & sell price function
// @namespace   Ricky
// @match       https://vircurex.com/orders*
// @match       https://vircurex.com/welcome/index?alt=*
// @include     https://vircurex.com/welcome/index?alt=*
// @include     https://vircurex.com/orders?alt=*
// @version     0.1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant none
// ==/UserScript==

//loop variables
var buy = 0;
var sell = 0;
//misc variables
var avg = 0;
var highestbuy = 0;
var lowestsell = 0;

//Avg between highest buy & Lowest sell
highestbuy = $("a", "tr:nth-child(3) td.coinformat:nth-child(2)").text();
highestbuy = highestbuy.replace(",", "");

lowestsell = $("a", "tr:nth-child(3) td.coinformat:nth-child(6)").text();
lowestsell = lowestsell.replace(",", "");
avg = ((parseFloat(highestbuy) + parseFloat(lowestsell)) / 2).toFixed(6);

// Colorizes background depending on percentage difference
function colorizePending(buysellvalue, qtyColour, bgColour) {
    var pctDiff = (Math.abs(((buysellvalue / avg) * 100) - 100)).toFixed(2);
    //Alert shows that  pctDiff works, it's the switch that's not working!
	//Perhaps it's the bgcolour thats not working, or the qtycolour?
	//alert(pctDiff);
    
    switch (pctDiff) {
        case (pctDiff >= 0.00 & pctDiff < 10.00):
            $(qtyColour).css({ "background-color": bgColour[0] });
            break;
        case (pctDiff >= 10.00 & pctDiff < 20.00):
            $(qtyColour).css({ "background-color": bgColour[1] });
            break;
        case (pctDiff >= 20.00 & pctDiff < 40.00):
            $(qtyColour).css({ "background-color": bgColour[2] });
            break;
        case (pctDiff >= 40.00 & pctDiff < 75.00):
            $(qtyColour).css({ "background-color": bgColour[3] });
            break;
        case (pctDiff >= 75):
            $(qtyColour).css({ "background-color": bgColour[4] });
            break;
    }
}


$(document).ready(function () {
    for (var a = 3; a < 23; a++) {
        //buy
        buy = $('.mainwindow .mylists tr:nth-child(' + a + ') td.coinformat:nth-child(2)').text();
        buy = buy.replace(",", "");
        buy = (parseFloat(buy)).toFixed(6);
        //sell
        sell = $('.mainwindow .mylists tr:nth-child(' + a + ') td.coinformat:nth-child(6)').text();
        sell = sell.replace(",", "");
        sell = (parseFloat(sell)).toFixed(6);

        //var colours
        var buycolour = $('.mainwindow .mylists tr:nth-child(' + a + ') td.coinformat:nth-child(2)')[0];
        var sellcolour = $('.mainwindow .mylists tr:nth-child(' + a + ') td.coinformat:nth-child(6)')[0];

        //Partially finished buy colour ranking system
		var BuyGradient=["#00FF33","#00CC33","#009933","#006633","#003333","#000033"];
		var SellGradient=["#CCFF00","#CCCC00","#CC9900","#CC6600","#CC3300","#CC0000"];

		
        colorizePending(buy, buycolour, BuyGradient);

        //Partially finished sell colour ranking system
        colorizePending(sell, sellcolour, SellGradient);
    }
});
