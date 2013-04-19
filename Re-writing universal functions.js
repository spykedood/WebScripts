// ==UserScript==
// @name        Isolated buy & sell price function
// @namespace   Ricky
// @match       https://vircurex.com/orders*
// @match       https://vircurex.com/welcome/index?alt=*
// @include     https://vircurex.com/welcome/index?alt=*
// @include     https://vircurex.com/orders?alt=*
// @version     0.15
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require     http://code.jquery.com/ui/1.10.2/jquery-ui.js
// @grant none
// ==/UserScript==

function init() {
    // All initialization goes here.
    var highestbuy = $('a', 'tr:nth-child(3) td.coinformat:nth-child(2)').text();
    highestbuy = highestbuy.replace(',', '');
        //alert(highestbuy);
    var lowestsell = $('a', 'tr:nth-child(3) td.coinformat:nth-child(6)').text();
    lowestsell = lowestsell.replace(',', '');
        //alert(lowestsell);
    var avg = ((parseFloat(highestbuy) + parseFloat(lowestsell)) / 2).toFixed(6);
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
            alert('Loop start');
            //Grabbing buy/sell/recent quantity values
            //Temporarily keep for future purposes
            //var buyqty = getHyperCellValue(a, 1);
            //var sellqty = getHyperCellValue(a, 5);
            //var recentqty = getCellValue(a, 10);
            
            //Grabbing buy/sell/recent values

            //a=Location ie (.mainwindow .mylists) or ('a').
            //b=Row number (just pass through variable 'a' from loop!).
            //c=Either '.coinformat' or ''.
            //d=td nth child number.
            //e=to fixed number (4/6)
            var buy = CellValue('text', i, 2);
            var sell = CellValue('text', i, 6);
            var recent = CellValue('text', i, 11);

            //Grabbing buy/sell/recent quantity values
            var buyqty = CellValue('text', i, 1);
            var sellqty = CellValue('text', i, 5);
            var recentqty = CellValue('text', i, 10);

            //Grabbing btc values
            var btcbuyqty = CellValue('text', i, 3);
            var btcsellqty = CellValue('text', i, 7);
            var btcrecqty = CellValue('text', i, 12);
            
            //Grabbing btc cells
            //a=Location ie (.mainwindow .mylists) or (.infobox) (Where you want)
            //b=Row number (just pass through variable 'a' from loop!).
            //c=Either '.coinformat' or ''.
            //d=td nth child number.
            var btcBuyQtyCell = getCell( 'text', i, 3);
            var btcSellQtyCell = getCell( 'text', i, 7);
            var btcRecQtyCell = getCell( 'text', i, 12);

            //Grabbing the buy/sell/recent quantity cells
            var buyqtycell = getCell( 'text', i, 1);
            var sellqtycell = getCell( 'text', i, 5);
            var recentqtycell = getCell( 'text', i, 10);

            //Grabbing the cell locations of buy/sell/recent to colour
            var buycolour = getCell( 'text', i, 2);
            var sellcolour = getCell( 'text', i, 6);
            var recentcolour = getCell( 'text', i, 11);
            //Recent value ('buy/sell') & recent cell
            var recentOrdVal = $('.mainwindow .mylists tr:nth-child(' + i + ') td:nth-child(13)').text();
            var recentOrdCell = $('.mainwindow .mylists tr:nth-child(' + i + ') td:nth-child(13)')[0];

            var pctDiffArr = [0.00, 5.00, 10.00, 25.00, 50.00, 75.00];
            //How about instead of manually stating the range of each coin, we calculate it?
            //Say 1btc = 0.0025ppc  then 1/0.0025 = a number we  could use..
            //var ppcQtyArr = [0.0000, 250.0000, 500.0000, 1000.0000, 3500.0000, 8000.0000];
            var btcQtyArr = [0.000000, 0.0010000, 0.010000, 0.100000, 1.000000, 5.000000];

            //Partially finished buy colour ranking system
            var BuyGradient = ['#00FF33', '#00CC33', '#009933', '#006633', '#003333', '#000033'];
            var SellGradient = ['#FFFF33', '#FFCC33', '#FF9933', '#FF6633', '#FF3333', '#FF0033'];
            var RecentGradient = ['#006600', '#B80000', '#FF9900'];  //Green/Orange/Red
            var QtyGradient = ['#FFFFFF', '#E0E0E0', '#C8C8C8', '#A8A8A8', '#808080', '#505050'];

            //Working
            var pctDiffbuy = (Math.abs(((buy / avg) * 100) - 100)).toFixed(2);
            var pctDiffsell = (Math.abs(((sell / avg) * 100) - 100)).toFixed(2);
    }

                //Calling function to colour the buy/sell/recent prices
            Colours(buycolour, pctDiffbuy, pctDiffArr, BuyGradient);
            Colours(sellcolour, pctDiffsell, pctDiffArr, SellGradient);
            //
            Colours(buyqtycell, btcbuyqty, btcQtyArr, QtyGradient);
            Colours(sellqtycell, btcsellqty, btcQtyArr, QtyGradient);
            Colours(recentqtycell, btcrecqty, btcQtyArr, QtyGradient);
            //
            Colours(btcSellQtyCell, btcsellqty, btcQtyArr, QtyGradient);
            Colours(btcBuyQtyCell, btcbuyqty, btcQtyArr, QtyGradient);
            Colours(btcRecQtyCell, btcrecqty, btcQtyArr, QtyGradient);

            recBuySell(recentOrdVal, recentOrdCell);
});


//a=Location ie (.mainwindow .mylists) or ('a').
//b=Row number (just pass through variable 'a' from loop!).
//c=Either '.coinformat' or ''.
//d=td nth child number.
//e=to fixed number (4/6)
function CellValue(a, b, c) {
    var cellvalue;
        if (a === 'link') {
            cellvalue = $('a', 'tr:nth-child(' + b + ') td.coinformat:nth-child(' + c + ')').text();
        } else if (a === 'text') {
            cellvalue = $('.mainwindow .mylists tr:nth-child(' + b + ') td.coinformat:nth-child(' + c + ')').text();
        } else {
            alert("value derp");
        }
    cellvalue = cellvalue.replace(',', '');
    cellvalue = (parseFloat(cellvalue)).toFixed(6);
        alert(cellvalue);
    return cellvalue;
}

//a=Location ie (.mainwindow .mylists) or ('a').
//b=Row number (just pass through variable 'a' from loop!).
//c=Either '.coinformat' or ''.
//d=td nth child number.
function getCell(a, b, c) {
     var cell;
        if (a === 'link') {
            cell = $('.mainwindow .mylists tr:nth-child(' + b + ')', 'td:nth-child(' + c + ')')[0];
        } else if (a === 'text') {
            cell = $('.mainwindow .mylists tr:nth-child(' + b + ')', 'td.coinformat:nth-child(' + c + ')')[0];
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

function recBuySell(text, cell) {
    if (text === 'Buy') {
        $(cell).css({ 'background-color': '#006600' });
    } else {
        $(cell).css({ 'background-color': '#B80000' });
    }
}