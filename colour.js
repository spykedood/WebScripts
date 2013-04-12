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
function myFunction(a,b,c)
{
	 if (c >= 0.00 && c < 10.00) {
            //$(a).style.background-Color = b[0];
			$(a).css({ "background-color": b[0] });
    } else if (c >= 10.00 && c < 20.00) {
           // $(a).style.background-Color = b[1];
			$(a).css({ "background-color": b[1] });
    } else if (c >= 20.00 && c < 30.00) {
          // $(a).style.background-Color = b[2];
			$(a).css({ "background-color": b[2] });
    } else if (c >= 30.00 && c < 50.00) {
           // $(a).style.background-Color = b[3];
			$(a).css({ "background-color": b[3] });
    } else if (c >= 50.00 && c < 75.00) {
           // $(a).style.background-Color = b[4];
			$(a).css({ "background-color": b[4] });
    } else if (c >= 75.00) {
           // $(a).style.background-Color = b[5];
			$(a).css({ "background-color": b[5] });
    } else {
			alert('derp');
    }
}


$(document).ready(function () {
    for (var a = 3; a < 23; a++) {
        //buy
        var buy = $('.mainwindow .mylists tr:nth-child(' + a + ') td.coinformat:nth-child(2)').text();
        buy = buy.replace(",", "");
        buy = (parseFloat(buy)).toFixed(6);
        //sell
        var sell = $('.mainwindow .mylists tr:nth-child(' + a + ') td.coinformat:nth-child(6)').text();
        sell = sell.replace(",", "");
        sell = (parseFloat(sell)).toFixed(6);

        //var colours
        var buycolour = $('.mainwindow .mylists tr:nth-child(' + a + ') td.coinformat:nth-child(2)')[0];
        var sellcolour = $('.mainwindow .mylists tr:nth-child(' + a + ') td.coinformat:nth-child(6)')[0];

        //Partially finished buy colour ranking system
		var BuyGradient = ['"#00FF33"','"#00CC33"','"#009933"','"#006633"','"#003333"','"#000033"'];
			//Alerts work properly, so it isnt the array that's the problem.
		    //alert(BuyGradient[0]);
			//alert(BuyGradient[1]);
			//alert(BuyGradient[2]);
			//alert(BuyGradient[3]);
			//alert(BuyGradient[4]);
			//alert(BuyGradient[5]);
		//var SellGradient = ['"#CCFF00"','"#CCCC00"','"#CC9900"','"#CC6600"','"#CC3300"','"#CC0000"'];

		 var pctDiff = (Math.abs(((buy / avg) * 100) - 100)).toFixed(2);

        myFunction(buycolour, BuyGradient, pctDiff);

        //Partially finished sell colour ranking system
        //colorizePending(sell, sellcolour, SellGradient);
    }
});
