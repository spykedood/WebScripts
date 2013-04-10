// ==UserScript==
// @name        Collaboration, Synergy, Money.
// @namespace   Ricky
// @match       https://vircurex.com/orders*
// @match       https://vircurex.com/welcome/index?alt=*
// @include     https://vircurex.com/welcome/index?alt=*
// @include     https://vircurex.com/orders?alt=*
// @version     0.1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant none
// ==/UserScript==

//Avg between highest buy & Lowest sell
var highestbuy = $("a", "tr:nth-child(3) td.coinformat:nth-child(2)").text();
highestbuy = highestbuy.replace(",", "");

var lowestsell = $("a", "tr:nth-child(3) td.coinformat:nth-child(6)").text();
lowestsell = lowestsell.replace(",", "");
avg = ((parseFloat(highestbuy) + parseFloat(lowestsell)) / 2).toFixed(6);