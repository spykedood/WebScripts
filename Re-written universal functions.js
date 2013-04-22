// ==UserScript==
// @name        Isolated buy & sell price function (Working)
// @namespace   Ricky
// @match       https://vircurex.com/orders*
// @match       https://vircurex.com/welcome/index?alt=*
// @include     https://vircurex.com/welcome/index?alt=*
// @include     https://vircurex.com/orders?alt=*
// @version     0.16
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require     http://code.jquery.com/ui/1.10.2/jquery-ui.js
// @grant none
// ==/UserScript==

/*
DerpCORP is furnishing this item "as is". DerpCORP does not provide any warranty of the item whatsoever, whether express, implied, or statutory, including, but not limited to, any warranty of merchantability or fitness for a particular purpose or any warranty that the contents of the item will be error-free.
In no respect shall DerpCORP incur any liability for any damages, including, but limited to, direct, indirect, special, or consequential damages arising out of, resulting from, or any way connected to the use of the item, whether or not based upon warranty, contract, tort, or otherwise; whether or not injury was sustained by persons or property or otherwise; and whether or not loss was sustained from, or arose out of, the results of, the item, or any services that may be provided by DerpCORP.
*/

// GLOBAL VARS
var highestbuy = 0, lowestsell = 0, avg = 0, buysell = 0;

function init() {
    // All initialization goes here.
    highestbuy = $('a', 'tr:nth-child(3) td.coinformat:nth-child(2)').text();
    highestbuy = highestbuy.replace(',', '');
        //alert(highestbuy);
    lowestsell = $('a', 'tr:nth-child(3) td.coinformat:nth-child(6)').text();
    lowestsell = lowestsell.replace(',', '');
        //alert(lowestsell);
    avg = ((parseFloat(highestbuy) + parseFloat(lowestsell)) / 2).toFixed(6);
        //alert(avg);
}

// When document is ready run thru our code.
$(document).ready(function () 
{
    //Refresh page every  90 secs
    setTimeout('location.reload();', 90000);

    // Initialization
    init();

    for (var i = 3; i < 23; i++) 
    {
            //Alert for debugging, checking that the loop's actually working!
            //alert('Loop start');
            
            //a=Location mainwindow or right (hand side of page).
            //b=Value text type (hyperlink or plaintext).
            //c=Either '.coinformat' or ''.
            //d=td nth child number.
            var buy = CellValue('mainwindow', 'link', i, 2);
            var sell = CellValue('mainwindow', 'link', i, 6);
            var recent = CellValue('mainwindow', 'text', i, 11);

            //Grabbing buy/sell/recent quantity values
            var buyqty = CellValue('mainwindow', 'link', i, 1);
            var sellqty = CellValue('mainwindow', 'link', i, 5);
            var recentqty = CellValue('mainwindow', 'text', i, 10);

            //Grabbing btc values
            var btcbuyqty = CellValue('mainwindow', 'text', i, 3);
            var btcsellqty = CellValue('mainwindow', 'text', i, 7);
            var btcrecqty = CellValue('mainwindow', 'text', i, 12);
            
            //Grabbing btc cells
            //a=Location ie (.mainwindow .mylists) or (.infobox) (Where you want)
            //b=Row number (just pass through variable 'a' from loop!).
            //c=Either '.coinformat' or ''.
            //d=td nth child number.
            var btcBuyQtyCell = getCell('mainwindow', i, 3);
            var btcSellQtyCell = getCell('mainwindow', i, 7);
            var btcRecQtyCell = getCell('mainwindow', i, 12);

            //Grabbing the buy/sell/recent quantity cells
            var buyqtycell = getCell('mainwindow', i, 1);
            var sellqtycell = getCell('mainwindow', i, 5);
            var recentqtycell = getCell('mainwindow', i, 10);

            //Grabbing the cell locations of buy/sell/recent to colour
            var buycolour = getCell('mainwindow', i, 2);
            var sellcolour = getCell('mainwindow', i, 6);
            var recentcolour = getCell('mainwindow', i, 11);
            var recTime = getCell('mainwindow', i, 9);

            //Grabbing the 3 top cells
            var buytop = getCell('maintop', 1, 1);
            var selltop = getCell('maintop', 1, 2);
            var rectop = getCell('maintop', 1, 3);

            //Recent value ('buy/sell') & recent cell
            var recentOrdVal = $('.mainwindow .mylists tr:nth-child(' + i + ') td:nth-child(13)').text();
            var recentOrdCell = $('.mainwindow .mylists tr:nth-child(' + i + ') td:nth-child(13)')[0];

            var pctDiffArr = [0.00, 5.00, 10.00, 25.00, 50.00, 75.00];
            var btcQtyArr = [0.000000, 0.0010000, 0.010000, 0.100000, 1.000000, 5.000000];

            //Partially finished buy colour ranking system
            var BuyGradient = ['#00FF33', '#00CC33', '#009933', '#006633', '#003333', '#000033'];
            var SellGradient = ['#FFFF33', '#FFCC33', '#FF9933', '#FF6633', '#FF3333', '#FF0033'];
            var GorGradient = ['#006600', '#B80000', '#FF9900'];  //Green/Orange/Red
            var QtyGradient = ['#FFFFFF', '#E0E0E0', '#C8C8C8', '#A8A8A8', '#808080', '#505050'];

            //Working PERCENT difference!
            var pctDiffbuy = (Math.abs(((buy / avg) * 100) - 100)).toFixed(2);
            //alert(pctDiffbuy);
            var pctDiffsell = (Math.abs(((sell / avg) * 100) - 100)).toFixed(2);
            //alert(pctDiffsell);

            //alert("Loop end!");
    

            //Calling function to colour the buy/sell/recent prices
            Colours(buycolour, pctDiffbuy, pctDiffArr, BuyGradient);
            Colours(sellcolour, pctDiffsell, pctDiffArr, SellGradient);
            //---//
            Colours(buyqtycell, btcbuyqty, btcQtyArr, QtyGradient);
            Colours(sellqtycell, btcsellqty, btcQtyArr, QtyGradient);
            Colours(recentqtycell, btcrecqty, btcQtyArr, QtyGradient);
            //---//
            Colours(btcSellQtyCell, btcsellqty, btcQtyArr, QtyGradient);
            Colours(btcBuyQtyCell, btcbuyqty, btcQtyArr, QtyGradient);
            Colours(btcRecQtyCell, btcrecqty, btcQtyArr, QtyGradient);

            //Colouring in recent "buy/sell"
            recBuySell(recentOrdVal, recentOrdCell, i, rectop);

            //Muh-Fuggan strike throughs!
            Strike(btcbuyqty, buyqtycell, btcBuyQtyCell, buycolour);
            Strike(btcsellqty, sellqtycell, btcSellQtyCell, sellcolour);
            Strike(btcrecqty, recentqtycell, btcRecQtyCell, recentcolour);
    }
});


//a=Location mainwindow or right (hand side of page).
//b=Value text type (hyperlink or plaintext).
//c=Either '.coinformat' or ''.
//d=td nth child number.
//e=to fixed number (4/6)
function CellValue(a, b, c, d) {
    var cellvalue = 0;
    if (a === 'mainwindow') {
        derp(b, c, d);
    } else if (a === 'right') {
        derp(b, c, d);
    } else {
        alert("Value location derp!");
    }

    function derp(b, c, d){
        if (b === 'link') {
            cellvalue = $('a', 'tr:nth-child(' + c + ') td.coinformat:nth-child(' + d + ')').text();
        } else if (b === 'text') {
            cellvalue = $('.mainwindow .mylists tr:nth-child(' + c + ') td.coinformat:nth-child(' + d + ')').text();
        } else {
            alert("Value text type derp! text or hyperlink!");
        }
    }

    cellvalue = cellvalue.replace(',', '');
    cellvalue = (parseFloat(cellvalue)).toFixed(6);
    //alert(cellvalue);
    return cellvalue;
}

function Strike(a, b, c, d) {
            //Strike through Script
            if (a < 0.020000) {
                //Strikes through the recent orders that are too small
                $(b).css('textDecoration', 'line-through');
                $(c).css('textDecoration', 'line-through'); 
                $(d).css('textDecoration', 'line-through'); 
            }
}

//a=Location ie (.mainwindow .mylists) or ('a').
//b=Row number (just pass through variable 'a' from loop!).
//c=Either '.coinformat' or ''.
//d=td nth child number.
function getCell(a, b, c) {
    var cell = 'test';
    //var cell = 0;
    //var cell;
    if (a === 'mainwindow') {
            cell = $('.mainwindow .mylists tr:nth-child(' + b + ') td.coinformat:nth-child(' + c + ')')[0];
            //alert(cell);
    } else if (a === 'right') {
            cell = $('.mainwindow .mylists tr:nth-child(' + b + ') td.coinformat:nth-child(' + c + ')')[0];
            //alert(cell);
    } else if (a === 'maintop') {
            cell = $('.mainwindow .mylists tr:nth-child(' + b + ') th:nth-child(' + c + ')')[0];
            //alert(cell);
    } else {
        alert("Value location derp!");
    }
    return cell;
}

function Colours(a, b, c, d) {
    if ((b >= c[0]) && (b < c[1])) {
        $(a).css({ 'background-color': d[0] });
            //alert(b + ' '+ c[0] + ' '+ c[1]);
    } else if ((b >= c[1]) && (b < c[2])) {
        $(a).css({ 'background-color': d[1] });
            //alert(b + ' '+ c[1] + ' '+ c[2]);
    } else if ((b >= c[2]) && (b < c[3])) {
        $(a).css({ 'background-color': d[2] });
            //alert(b + ' '+ c[2] + ' '+ c[3]);
    } else if ((b >= c[3]) && (b < c[4])) {
        $(a).css({ 'background-color': d[3] });
            //alert(b + ' '+ c[3] + ' '+ c[4]);
    } else if ((b >= c[4]) && (b < c[5])) {
        $(a).css({ 'background-color': d[4] });
            //alert(b + ' '+ c[4] + ' '+ c[5]);
    } else if (b >= c[5]) {
        $(a).css({ 'background-color': d[5] });
            //alert(b + ' '+ c[5]);
    } else {
        alert('derp');
    }
}

function recBuySell(a, b, c, d) 
    {
        if (a === 'Buy') {
            $(b).css({ 'background-color': '#006600' });
            buysell += 1;
        } else if (a === 'Sell') {
            $(b).css({ 'background-color': '#B80000' });
            buysell -= 1;
        } 

        if (c === 23) {
            if (buysell > 10){
                $(d).css({ 'background-color': '#006600' });
                alert("green");
            } else if (buysell === 10) {
                $(d).css({ 'background-color': '#FF9900' });
                alert("orange");
            } else {
                $(d).css({ 'background-color': '#B80000' });
                alert("red");
            } 
        } else if (c < 23) {
            //what is this?!
        }
}
