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

//a=cell location , b=cell value, c=qty/value rng, d=gradient!
function Multifunction(a, b, c, d) {
    if (b >= c[0] && b < c[1]) {
        $(a).css({ "background-color": d[0] });
    } else if (b >= c[1] && b < c[2]) {
        $(a).css({ "background-color": d[1] });
    } else if (b >= c[2] && b < c[3]) {
        $(a).css({ "background-color": d[2] });
    } else if (b >= c[3] && b < c[4]) {
        $(a).css({ "background-color": d[3] });
    } else if (b >= c[4] && b < c[5]) {
        $(a).css({ "background-color": d[4] });
    } else if (b >= c[5]) {
        $(a).css({ "background-color": d[5] });
    } else {
	//alert('derp');
	}
}

function value(a, b, c) {
        var cellvalue = $('.mainwindow .mylists tr:nth-child(' + a + ') td.coinformat:nth-child(' + b + ')').text();
        cellvalue = cellvalue.replace(",", "");
        cellvalue = (parseFloat(cellvalue)).toFixed(c);
		return cellvalue;
}

function myFunction3(a, b, c, d)
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
var recentHigh = 0;
var recentLow = 0;
var highestbuy = 0;
var lowestsell = 0;
var avg = 0;

//Avg between highest buy & Lowest sell
highestbuy = $("a", "tr:nth-child(3) td.coinformat:nth-child(2)").text();
highestbuy = highestbuy.replace(",", "");

lowestsell = $("a", "tr:nth-child(3) td.coinformat:nth-child(6)").text();
lowestsell = lowestsell.replace(",", "");
avg = ((parseFloat(highestbuy) + parseFloat(lowestsell)) / 2).toFixed(6);

    for (var a = 3; a < 23; a++) {
		//Grabbing buy/sell/recent values
		var buy = value(a, 2, 6);
		var sell = value(a, 6, 6);
		var recent = value(a, 11, 6);

		//Quantities; same as above!
		var buyquantities = value(a, 1, 4);
		var sellquantities = value(a, 5, 4);
		var recentquantities = value(a, 10, 4);
		
		//Grabbing the cell locations of buy/sell/recent to colour.
        var buycolour = $('.mainwindow .mylists tr:nth-child(' + a + ') td.coinformat:nth-child(2)')[0];
        var sellcolour = $('.mainwindow .mylists tr:nth-child(' + a + ') td.coinformat:nth-child(6)')[0];
        var recentcolour = $('.mainwindow .mylists tr:nth-child(' + a + ') td.coinformat:nth-child(11)')[0];
		
		//(a,b,c) a=row b=td column c=to fixed 4/6.
		//Could replace c with True/False or Value/Cell to make it more readable!
		//Grabbing the cell location of buy/sell/recent top
		//Top row colours
		var buytop = $('.mainwindow .mylists tr:nth-child(1) th:nth-child(1)')[0];
		var selltop = $('.mainwindow .mylists tr:nth-child(1) th:nth-child(3)')[0];
		var recenttop = $('.mainwindow .mylists tr:nth-child(1) th:nth-child(5)')[0];

        var buyqty = $('.mainwindow .mylists tr:nth-child(' + a + ') td.coinformat:nth-child(1)')[0];
        var sellqty = $('.mainwindow .mylists tr:nth-child(' + a + ') td.coinformat:nth-child(5)')[0];
        var recentqty = $('.mainwindow .mylists tr:nth-child(' + a + ') td.coinformat:nth-child(10)')[0];
		
		//Grab the alt/base from the url to determine the quantities in the page
		//var alt = getUrlVars()["alt"];
		//var base = getUrlVars()["base"];
		//alert(alt);
		//alert(base);
		//If alt = ppc then QtyArr=ppcQtyArr
		//Example of buyQtyArr - make more for each type of coin.
		
		var ppcQtyArr = ['0.0000','250.0000','500.0000','1000.0000','3500.0000','8000.0000'];
		var pctDiffArr = ['0.00','10.00','20.00','30.00','50.00','75.00'];
		//var btcQtyArr = [];
		//var trcQtyArr = [];
		
        //Partially finished buy colour ranking system
		var BuyGradient = ['#00FF66','#00CC66','#009966','#006666','#003366','#000066'];
		var SellGradient = ['#FFFF00','#FFCC00','#FF9900','#FF6600','#FF3300','#FF0000'];
		var RecentGradient = ['#006600','#B80000','#FF9900'];

		var pctDiffbuy = (Math.abs(((buy / avg) * 100) - 100)).toFixed(2);
		var pctDiffsell = (Math.abs(((sell / avg) * 100) - 100)).toFixed(2);
		
		//Calling function to colour the buy/sell/recent prices
		//a=cell location , b=cell value, c=qty/value rng, d=gradient!
        Multifunction(buycolour, pctDiffbuy, pctDiffArr, BuyGradient);
		Multifunction(sellcolour, pctDiffsell, pctDiffArr, SellGradient);

		//myFunction3(recent, avg, recentcolour, RecentGradient);
		
		//QtyColour(qty, qtycolor, ppcQtyArr);
		//myFunction4(recentHigh,recentLow,recentcolour);
    }
});
