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


// GLOBAL VARS
var highestbuy = 0, lowestsell = 0, avg = 0;

// Initialize
function init() {
    // All initialization goes here.
    highestbuy = $("a", "tr:nth-child(3) td.coinformat:nth-child(2)").text();
    highestbuy = highestbuy.replace(",", "");
    lowestsell = $("a", "tr:nth-child(3) td.coinformat:nth-child(6)").text();
    lowestsell = lowestsell.replace(",", "");
    avg = ((parseFloat(highestbuy) + parseFloat(lowestsell)) / 2).toFixed(6);

    // Add JQUI css
    $('head').append('<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/themes/redmond/jquery-ui.css" type="text/css" />');
}

// When document is ready run thru our code.
$(document).ready(function () {
    //Refresh page every  90 secs
    setTimeout("location.reload();", 90000);

    // Initialization
    init();

    // Update UI.
    UpdateUI();
});

// Updates all UI elements
function UpdateUI() {
    // Inject custom style
    InjectStyles();

    // Create options
    CreateOptions();

    // Color cells
    ColorOrderPriceCells();

    // Resize Graph
    ResizeGraph();
}

// Creates an options interface
function CreateOptions() {
    // Create button
    $('body').append('<div class="btnOptions"></div>');

    // Create dialogue (this is where your options should go)
    $('body').append('<div id="dialog" title="Options">'
        + '<p style="margin-bottom:10px;">Select options below:</p>'
        + '<p><input class="myCheckbox" id="colorOrderPriceCells" type="checkbox" value="true"/>'
        + '<label class="myCheckboxLabel" for="colorOrderPriceCells">Color the prices for order cells?</label> </p>'
        + ' </div>');

    // Initialise and set up on click listener for dialoge box
    $("#dialog").dialog({
        autoOpen: false,
        show: {
            effect: "blind",
            duration: 1000
        },
        hide: {
            effect: "explode",
            duration: 1000
        },
        buttons: [
            {
                text: "Save",
                click: function () {
                    SaveOptions();
                    $( this ).dialog( "close" );
                }
            }
        ]
    });

    $(".btnOptions").click(function () {
        $("#dialog").dialog("open");
    });
}

// Saves options
function SaveOptions() {
    // TODO: Save code goes here.
}

// Injects styles to DOM
function InjectStyles() {
    $('body').prepend(
        '<style>'
        // Options button
        + '.btnOptions {'
        + 'cursor: pointer;'
        + 'background-image: url("https://www.google.com/images/nav_logo123.png");'
        + 'background-position: -42px -259px;'
        + 'height: 17px; width: 17px;'
        + 'position: fixed; top: 5px; right: 5px;'
        + '}'
        // Dialog checkboxes
        + '.myCheckbox {'
        + 'width: 25px; height: 25px;'
        + 'display: inline-block;'
        + 'padding: 0; margin: 0;'
        + 'vertical-align: middle;'
        + '}'
        // Dialoge checkbox labels
        + '.myCheckboxLabel {'
        + 'display: inline-block;'
        +'}'
        + '</style>'
    );
}

// Resizes the graph so that it takes advantage of all available screen space
function ResizeGraph() {

}

// Colors buy/sell PRICE cells
function ColorOrderPriceCells() {
    for (var a = 3; a < 23; a++) {
        //Grabbing buy/sell/recent values
        var buy = getHyperCellValue(a, 2);
        var sell = getHyperCellValue(a, 6);
        var recent = getCellValue(a, 11);
        //Grabbing buy/sell/recent quantity values
        var buyqty = getHyperCellValue(a, 1);
        var sellqty = getHyperCellValue(a, 5);
        var recentqty = getCellValue(a, 10);
        //Grabbing the buy/sell/recent quantity cells
        var buyqtycell = getCell(a, 1);
        var sellqtycell = getCell(a, 5);
        var recentqtycell = getCell(a, 10);
        //Grabbing the cell locations of buy/sell/recent to colour.
        var buycolour = getCell(a, 2);
        var sellcolour = getCell(a, 6);
        var recentcolour = getCell(a, 11);
        //BROKEN IT WHOOPS
        var recentOrdVal = $('.mainwindow .mylists tr:nth-child(' + a + ') td:nth-child(13)').text();
        var recentOrdCell = getCell(a, 13);

        var pctDiffArr = [0.00, 5.00, 10.00, 25.00, 50.00, 75.00];
        //How about instead of manually stating the range of each coin, we calculate it?
        //Say 1btc = 0.0025ppc  then 1/0.0025 = a number we  could use..
        var ppcQtyArr = [0.0000, 250.0000, 500.0000, 1000.0000, 3500.0000, 8000.0000];
        //var btcQtyArr = [0.0000, 0.2500,0.500,1.0000,2.5000,5.0000]

        //Partially finished buy colour ranking system
        var BuyGradient = ['#00FF33', '#00CC33', '#009933', '#006633', '#003333', '#000033'];
        var SellGradient = ['#FFFF33', '#FFCC33', '#FF9933', '#FF6633', '#FF3333', '#FF0033'];
        var RecentGradient = ['#006600', '#B80000', '#FF9900'];  //Green/Orange/Red
        var QtyGradient = ['#FFFFFF', '#E0E0E0', '#C8C8C8', '#A8A8A8', '#808080', '#505050'];

        //Working
        var pctDiffbuy = (Math.abs(((buy / avg) * 100) - 100)).toFixed(2);
        var pctDiffsell = (Math.abs(((sell / avg) * 100) - 100)).toFixed(2);

        //Calling function to colour the buy/sell/recent prices
        //a=cell location , b=cell value, c=qty/value rng/what to compare b to! , d=gradient!
        Multifunction(buycolour, pctDiffbuy, pctDiffArr, BuyGradient);
        Multifunction(sellcolour, pctDiffsell, pctDiffArr, SellGradient);
        Multifunction(buyqtycell, buyqty, ppcQtyArr, QtyGradient);
        Multifunction(sellqtycell, sellqty, ppcQtyArr, QtyGradient);
        Multifunction(recentqtycell, recentqty, ppcQtyArr, QtyGradient);

        //Colouring in recent buy/sell columns
        recBuySell(recentOrdVal, recentOrdCell);
    }
}


/******************
 HELPER FUNCTIONS
 ******************/
//a=cell location , b=cell value, c=qty/value rng, d=gradient!
function Multifunction(a, b, c, d) {
    if ((b >= c[0]) && (b < c[1])) {
        $(a).css({ "background-color": d[0] });
        //alert(b + ' '+ c[0] + ' '+ c[1]);
    } else if ((b >= c[1]) && (b < c[2])) {
        $(a).css({ "background-color": d[1] });
        //alert(b + ' '+ c[1] + ' '+ c[2]);
    } else if ((b >= c[2]) && (b < c[3])) {
        $(a).css({ "background-color": d[2] });
        //alert(b + ' '+ c[2] + ' '+ c[3]);
    } else if ((b >= c[3]) && (b < c[4])) {
        $(a).css({ "background-color": d[3] });
        //alert(b + ' '+ c[3] + ' '+ c[4]);
    } else if ((b >= c[4]) && (b < c[5])) {
        $(a).css({ "background-color": d[4] });
        //alert(b + ' '+ c[4] + ' '+ c[5]);
    } else if (b >= c[5]) {
        $(a).css({ "background-color": d[5] });
        //alert(b + ' '+ c[5]);
    } else {
        //alert('derp');
    }
}

function recBuySell(text, cell) {
    if (text === "Buy") {
        $(cell).css({ "background-color": "green" });
    } else {
        $(cell).css({ "background-color": "red" });
    }
}

//Hyper = grabbing value of cell, when the value is contained within a hyperlink!
function getHyperCellValue(a, b) {
    var cellvalue = $('a', 'tr:nth-child(' + a + ') td.coinformat:nth-child(' + b + ')').text();
    cellvalue = cellvalue.replace(",", "");
    cellvalue = (parseFloat(cellvalue)).toFixed(6);
    return cellvalue;
}

function getCellValue(a, b) {
    var cellvalue = $('.mainwindow .mylists tr:nth-child(' + a + ') td.coinformat:nth-child(' + b + ')').text();
    cellvalue = cellvalue.replace(",", "");
    cellvalue = (parseFloat(cellvalue)).toFixed(6);
    return cellvalue;
}

function getCell(a, b) {
    var cell = $('.mainwindow .mylists tr:nth-child(' + a + ') td.coinformat:nth-child(' + b + ')')[0];
    return cell;
}
