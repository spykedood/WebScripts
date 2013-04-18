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

// Options vars
var op_colorOrderPriceCells, op_refreshRate;

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

    // Inject custom styles
    InjectStyles();

    // Create options
    CreateOptions();
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
    // (re)load options before setting UI elements
    LoadOptions();

    // Color cells [ RICKY: This line says if (op_colorOrderPriceCells == true) then call function ColorOrderPriceCells(); ]
    if (op_colorOrderPriceCells) ColorOrderPriceCells();

    // Resize Graph
    ResizeGraph();
}

// Creates an options interface
function CreateOptions() {
    // Create button
    $('body').append('<div class="btnOptions"><span></span></div>');

    // Create dialogue (this is where your options should go)
    $('body').append('<div id="dialog" title="Options">'
        + '<p style="margin-bottom:10px;">Select options below:</p>'
        // colorOrderPriceCells
        + '<p><input class="myCheckbox" id="colorOrderPriceCells" type="checkbox" value="true"/>'
        + '<label class="myCheckboxLabel" for="colorOrderPriceCells">Color the prices for order cells?</label> </p>'
        // refreshRate
        + '<p><label class="myCheckboxLabel" for="refreshRate">Refresh rate in ms. (Default: 90000)</label>'
        + '<input class="myInputBox" id="refreshRate" type="text" value="90000"/> </p>'
        + '</div>');

    // Initialise and set up on click listener for dialoge box
    $("#dialog").dialog({
        autoOpen: false,
        minWidth: 400,
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
                    // Save our options
                    SaveOptions();
                    // Update UI
                    UpdateUI();
                    // Close the dialog box
                    $(this).dialog("close");
                }
            }
        ]
    });

    $(".btnOptions").click(function () {
        $("#dialog").dialog("open");
    });


    // Set option values here
    $('#colorOrderPriceCells').attr('checked', GetBoolSetting('op_colorOrderPriceCells'));
}

// Saves options
function SaveOptions() {
    // colorOrderPriceCells
    SetSetting("op_colorOrderPriceCells", $('#colorOrderPriceCells').is(':checked'));
}

// Load options
function LoadOptions() {
    op_colorOrderPriceCells = GetBoolSetting("op_colorOrderPriceCells");
}

// Injects styles to DOM
function InjectStyles() {
    $('head').append(
        '<style>'
        // Options button
        + '.btnOptions {'
        + 'cursor: pointer;'
        + 'background: #ccc;'
        + 'border-radius: 10px;'
        + 'border: 1px solid #ddd;'
        + 'height: 25px; width: 25px;'
        + 'position: fixed; top: 5px; right: 5px;'
        + 'text-align: center;'
        + '}'
        // hover
        + '.btnOptions:hover {'
        + 'background: #bbb;'
        + '}'
        // Options button icon
        + '.btnOptions span {'
        + 'background-image: url("https://www.google.com/images/nav_logo123.png");'
        + 'background-position: -42px -259px;'
        + 'height: 17px; width: 17px; margin-top: 3px;'
        + 'display: inline-block; vertical-align: middle;'
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
        + 'margin: 5px;'
        + '}'
        // Text input box
        + '.myInputBox {'
        + 'width: 100px;'
        + '}'
        + '</style>'
    );
}

// Resizes the graph so that it takes advantage of all available screen space
function ResizeGraph() {

}

// Colors buy/sell PRICE cells
function ColorOrderPriceCells() {
    for (var a = 3; a < 23; a++) {
        //Grabbing buy/sell/recent quantity values
        //Temporarily keep for future purposes
        //var buyqty = getHyperCellValue(a, 1);
        //var sellqty = getHyperCellValue(a, 5);
        //var recentqty = getCellValue(a, 10);
        
        //Grabbing buy/sell/recent values

        //a=Location ie (.mainwindow .mylists) or ('a').
        //b=Row number (just pass through variable "a" from loop!).
        //c=Either ".coinformat" or "".
        //d=td nth child number.
        //e=to fixed number (4/6)
        var buy = Cell.CellValue("a", a, ".coinformat", 2, 6);
        var sell = Cell.CellValue("a", a, ".coinformat", 6, 6);
        var recent = Cell.CellValue(".mainwindow .mylists", a, ".coinformat", 11, 6);

        //Grabbing buy/sell/recent quantity values
        var buyqty = Cell.CellValue("a", a, ".coinformat", 1, 4);
        var sellqty = Cell.CellValue("a", a, ".coinformat", 5, 4);
        var recentqty = Cell.CellValue(".mainwindow .mylists", a, ".coinformat", 10, 4);

        //Grabbing btc values
        var recent = Cell.CellValue(".mainwindow .mylists", a, ".coinformat", 3, 4);
        var recentqty = Cell.CellValue(".mainwindow .mylists", a, ".coinformat", 7, 4);
        var recentqty = Cell.CellValue(".mainwindow .mylists", a, ".coinformat", 12, 4);
        
        //Grabbing btc cells
        //a=Location ie (.mainwindow .mylists) or (.infobox) (Where you want)
        //b=Row number (just pass through variable "a" from loop!).
        //c=Either ".coinformat" or "".
        //d=td nth child number.
        var btcBuyQtyCell = Cell.getCell(".mainwindow .mylists", a, ".coinformat", 3);
        var btcSellQtyCell = Cell.getCell(".mainwindow .mylists", a, ".coinformat", 7);
        var btcRecQtyCell = Cell.getCell(".mainwindow .mylists", a, ".coinformat", 12);

        //Grabbing the buy/sell/recent quantity cells
        var buyqtycell = Cell.getCell(".mainwindow .mylists", a, ".coinformat", 1);
        var sellqtycell = Cell.getCell(".mainwindow .mylists", a, ".coinformat", 5);
        var recentqtycell = Cell.getCell(".mainwindow .mylists", a, ".coinformat", 10);

        //Grabbing the cell locations of buy/sell/recent to colour
        var buycolour = Cell.getCell(".mainwindow .mylists", a, ".coinformat", 2);
        var sellcolour = Cell.getCell(".mainwindow .mylists", a, ".coinformat", 6);
        var recentcolour = Cell.getCell(".mainwindow .mylists", a, ".coinformat", 11);
        //Recent value ("buy/sell") & recent cell
        var recentOrdVal = $('.mainwindow .mylists tr:nth-child(' + a + ') td:nth-child(13)').text();
        var recentOrdCell = $('.mainwindow .mylists tr:nth-child(' + a + ') td:nth-child(13)')[0];

        var pctDiffArr = [0.00, 5.00, 10.00, 25.00, 50.00, 75.00];
        //How about instead of manually stating the range of each coin, we calculate it?
        //Say 1btc = 0.0025ppc  then 1/0.0025 = a number we  could use..
        var ppcQtyArr = [0.0000, 250.0000, 500.0000, 1000.0000, 3500.0000, 8000.0000];
        var btcQtyArr = [0.000000, 0.0010000, 0.010000, 0.100000, 1.000000, 5.000000];

        //Partially finished buy colour ranking system
        var BuyGradient = ['#00FF33', '#00CC33', '#009933', '#006633', '#003333', '#000033'];
        var SellGradient = ['#FFFF33', '#FFCC33', '#FF9933', '#FF6633', '#FF3333', '#FF0033'];
        var RecentGradient = ['#006600', '#B80000', '#FF9900'];  //Green/Orange/Red
        var QtyGradient = ['#FFFFFF', '#E0E0E0', '#C8C8C8', '#A8A8A8', '#808080', '#505050'];

        //Working
        var pctDiffbuy = (Math.abs(((buy / avg) * 100) - 100)).toFixed(2);
        var pctDiffsell = (Math.abs(((sell / avg) * 100) - 100)).toFixed(2);

        //Calling function to colour the buy/sell/recent prices
        Cell.Colours(buycolour, pctDiffbuy, pctDiffArr, BuyGradient);
        Cell.Colours(sellcolour, pctDiffsell, pctDiffArr, SellGradient);
        //
        Cell.Colours(buyqtycell, btcbuyqty, btcQtyArr, QtyGradient);
        Cell.Colours(sellqtycell, btcsellqty, btcQtyArr, QtyGradient);
        Cell.Colours(recentqtycell, btcrecqty, btcQtyArr, QtyGradient);
        //
        Cell.Colours(btcSellQtyCell, btcsellqty, btcQtyArr, QtyGradient);
        Cell.Colours(btcBuyQtyCell, btcbuyqty, btcQtyArr, QtyGradient);
        Cell.Colours(btcRecQtyCell, btcrecqty, btcQtyArr, QtyGradient);

        Cell.recBuySell(recentOrdVal, recentOrdCell);
    }
}


/******************
 HELPER FUNCTIONS
 ******************/

// Saves setting to local storage
function SetSetting(key, value) {
    // Check if local storage is supported
    if (supports_html5_storage()) {
        // Try to save to local storage
        try {
            localStorage.setItem(key, value); // saves to the database, "key", "value"
        } catch (e) {
            if (e == QUOTA_EXCEEDED_ERR) {
                alert('Quota exceeded!'); //data wasn't successfully saved due to quota exceed so throw an error
            }
        }
    } else {
        alert("Browser does not support local storage!")
    }
};

// Gets settings from local storage (ASSUME ALWAYS RETURNS A STRING or NUMBER)
function GetSetting(key) {
    // Check if local storage is supported
    if (supports_html5_storage()) {
        // If it does then return the value.
        return localStorage.getItem(key);
    } else {
        alert("Browser does not support local storage!")
    }
}

// Gets a boolean from local storage
function GetBoolSetting(key) {
    if (GetSetting(key) == "true")
        return true;
    else if (GetSetting(key) == "false")
        return false;
    else
        return false;
}

// Check for HTML5 support for local storage?
function supports_html5_storage() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
};

var Cell = {

    //a=Location ie (.mainwindow .mylists) or ('a').
    //b=Row number (just pass through variable "a" from loop!).
    //c=Either ".coinformat" or "".
    //d=td nth child number.
    //e=to fixed number (4/6)
    Cellvalue: function(a, b, c, d, e) {
        var cellvalue = $(a, 'tr:nth-child(' + b + ')', ' td' + c + ':nth-child(' + d + ')').text();
        cellvalue = cellvalue.replace(",", "");
        cellvalue = (parseFloat(cellvalue)).toFixed(e);
        alert(cellValue);
        return cellvalue;
    },

    //a=Location ie (.mainwindow .mylists) or ('a').
    //b=Row number (just pass through variable "a" from loop!).
    //c=Either ".coinformat" or "".
    //d=td nth child number.
    getCell: function(a, b, c, d) {
        var cell = $(a, 'tr:nth-child(' + b + ')', ' td' + c + ':nth-child(' + d + ')')[0];
        return cell;
    },

    Colours: function(a, b, c, d) {
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
    },

    recBuySell: function(text, cell) {
        if (text === "Buy") {
            $(cell).css({ "background-color": "#006600" });
        } else {
            $(cell).css({ "background-color": "#B80000" });
        }
    }

}
