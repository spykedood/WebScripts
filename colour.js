// ==UserScript==
// @name        Isolated buy & sell price function
// @namespace   Ricky
// @match       https://vircurex.com/orders*
// @match       https://vircurex.com/welcome/index?alt=*
// @include     https://vircurex.com/welcome/index?alt=*
// @include     https://vircurex.com/orders?alt=*
// @version     0.15
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant none
// ==/UserScript==


//Not working yet - pass through the quantities when base/alt coin is detected in url!
function colorize(qty, qtycolor, x) {
    //colour coding the quantities of recent orders
    if (qty > x[0] && qty < x[1]) {
        $(qtycolor).css({ "background-color": "#F0F0F0" });
    } else if (qty >= x[1] && qty < x[2]) {
        $(qtycolor).css({ "background-color": "#D8D8D8" });
    } else if (qty >= x[2] && qty < x[3]) {
        $(qtycolor).css({ "background-color": "#B8B8B8" });
    } else if (qty >= x[3] && qty < x[4]) {
        $(qtycolor).css({ "background-color": "#787878" });
    } else if (qty >= x[4] && qty < x[5]) {
        $(qtycolor).css({ "background-color": "#585858" });
    } else {
        $(qtycolor).css({ "background-color": "#404040" });
    }
}

// Colorizes background depending on percentage difference
function myFunction(a,b,c)
{
//Escuse the terrible variable naming plox
	f (c >= 0.00 && c < 10.00) {
		$(a).css({ "background-color": b[0] });
	} else if (c >= 10.00 && c < 20.00) {
		$(a).css({ "background-color": b[1] });
    	} else if (c >= 20.00 && c < 30.00) {
		$(a).css({ "background-color": b[2] });
    	} else if (c >= 30.00 && c < 50.00) {
		$(a).css({ "background-color": b[3] });
   	} else if (c >= 50.00 && c < 75.00) {
		$(a).css({ "background-color": b[4] });
    	 else if (c >= 75.00) {
		$(a).css({ "background-color": b[5] });
    	 else {
		//alert('derp');
    }
}

function valueAndCell(a,b,c,d)
{
if (c === 1){
        var cellvalue = $('.mainwindow .mylists tr:nth-child(' + a + ') td.coinformat:nth-child(' + b + ')').text();
        cellvalue = cellvalue.replace(",", "");
        cellvalue = (parseFloat(cellvalue)).toFixed(' + d + ');
		return cellvalue;
		}
else {
         var cell = $('.mainwindow .mylists tr:nth-child(' + a + ') td.coinformat:nth-child(' + b + ')')[0];
		return cell;
}
}

function myFunction3(a,b,c,d)
{
//Escuse the terrible variable naming plox
	 if (a > b) {
			$(c).css({ "background-color": d[0] });
    } else if (a < b) {
			$(c).css({ "background-color": d[1] });
    } else {
			$(c).css({ "background-color": d[2] });
    } 
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

$(document).ready(function () {
//Refresh page every 
setTimeout("location.reload();",90000);

//misc variables
var avg = 0;
var highestbuy = 0;
var lowestsell = 0;
var recentHigh = 0;
var recentLow = 0;

//Avg between highest buy & Lowest sell
highestbuy = $("a", "tr:nth-child(3) td.coinformat:nth-child(2)").text();
highestbuy = highestbuy.replace(",", "");

lowestsell = $("a", "tr:nth-child(3) td.coinformat:nth-child(6)").text();
lowestsell = lowestsell.replace(",", "");
avg = ((parseFloat(highestbuy) + parseFloat(lowestsell)) / 2).toFixed(6);

    for (var a = 3; a < 23; a++) {
		//Grabbing buy/sell/recent values
		var buy = valueAndCell(a,2,1, 6);
		var sell = valueAndCell(a,6,1, 6);
		var recent = valueAndCell(a,11,1, 6);
		
		//Grabbing the cell locations of buy/sell/recent to colour.
		var buycolour = valueAndCell(a,2,0,0);
		var sellcolour = valueAndCell(a,6,0,0);
		var recentcolour = valueAndCell(a,11,0,0);
		
		//(a,b,c) a=row b=td column c=(1=grab value.  0=grab cell) d=to fixed 4/6.
		//Could replace c with True/False or Value/Cell to make it more readable!
		//Grabbing the cell location of buy/sell/recent top
		var buytop = valueAndCell(1,2,0, 0);
		var selltop = valueAndCell(1,6,0, 0);
		var recenttop = valueAndCell(1,11,0, 0);
		
		//Quantities; same as above!
		var sellquantities = valueAndCell(a,5,1, 4);
		var buyquantities = valueAndCell(a,1,1, 4);
		var recentquantities = valueAndCell(a,10,1, 4);
		
		//Grab the alt/base from the url to determine the quantities in the page
		var alt = getUrlVars()["alt"];
		var base = getUrlVars()["base"];
		//alert(alt);
		//alert(base);
		//Example of buyQtyArr - make more for each type of coin.
		var buyPPCQtyArr = ['0.0000','250.0000','500.00','1000.0000','3500.0000','8000.0000']

        //Partially finished buy colour ranking system
		var BuyGradient = ['#00FF33','#00CC33','#009933','#006633','#003333','#000033'];
		var SellGradient = ['#CCFF00','#CCCC00','#CC9900','#CC6600','#CC3300','#CC0000'];
		var RecentGradient = ['#006600','#B80000 ','#FF9900'];

		var pctDiffbuy = (Math.abs(((buy / avg) * 100) - 100)).toFixed(2);
		var pctDiffsell = (Math.abs(((sell / avg) * 100) - 100)).toFixed(2);

        myFunction(buycolour, BuyGradient, pctDiffbuy);
		myFunction(sellcolour, SellGradient, pctDiffsell);
		myFunction3(recent, avg, recentcolour, RecentGradient);

		//myFunction4(recentHigh,recentLow,recentcolour);
    }
});
