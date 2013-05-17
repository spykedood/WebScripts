// ==UserScript==
// @name        Combined Re-worked Misc & universal function scripts
// @namespace   Ricky
// @match       https://vircurex.com/*
// @include     https://vircurex.com/*
// @version     0.1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require     http://code.jquery.com/ui/1.10.2/jquery-ui.js
// @grant none
// ==/UserScript==

/*
DerpCORP is furnishing this item "as is". DerpCORP does not provide any warranty of the item whatsoever, whether express, implied, or statutory, including, but not limited to, any warranty of merchantability or fitness for a particular purpose or any warranty that the contents of the item will be error-free.
In no respect shall DerpCORP incur any liability for any damages, including, but limited to, direct, indirect, special, or consequential damages arising out of, resulting from, or any way connected to the use of the item, whether or not based upon warranty, contract, tort, or otherwise; whether or not injury was sustained by persons or property or otherwise; and whether or not loss was sustained from, or arose out of, the results of, the item, or any services that may be provided by DerpCORP.
*/

// GLOBAL VARS
'use strict';
var highestbuy = 0, lowestsell = 0, avg = 0, altDifference = 0, giBuyStrikeCount = 0, giSellStrikeCount = 0, giRecentStrikeCount = 0;
var AltCurrency = "a", BaseCurrency = "b";

var init = {
    avg: function () {
        highestbuy = $('a', 'tr:nth-child(3) td.coinformat:nth-child(2)').text();
        highestbuy = highestbuy.replace(',', '');
        lowestsell = $('a', 'tr:nth-child(3) td.coinformat:nth-child(6)').text();
        lowestsell = lowestsell.replace(',', '');
        avg = ((parseFloat(highestbuy) + parseFloat(lowestsell)) / 2).toFixed(6);
        altDifference = (parseFloat(lowestsell) - parseFloat(highestbuy)).toFixed(6);
        AltCurrency = init.getURLParameter("alt");
        BaseCurrency = init.getURLParameter("base");
    },

    getURLParameter: function (param) {
        if (param === "alt") {
            CurrencyType = $('.mainwindow .mylists tr:nth-child(2) th:nth-child(1)').text();
            CurrencyType = ((CurrencyType.replace(" ", "")).replace("Quantity", "")).replace(/\[|\]/g,"");
        } else if (param === "base") {
            CurrencyType = $('.mainwindow .mylists tr:nth-child(2) th:nth-child(3)').text();
            CurrencyType = ((CurrencyType.replace(" ", "")).replace("Volume", "")).replace(/\[|\]/g,"");
        }
        return CurrencyType;
    },

    calculationInsert: function () {
    $('.mainwindow').append('<div style="float:top;"></br>'
                            + '<table class=\"mylists\" style="font-size: 80%">'
                        + '<tr><td colspan=5></td></tr>'
                        + '<tr>'
                          + '<th>Profit Calculator</th>'
                          + '<th>Balance</th>'
                          + '<th>Initial Price</th>'
                          + '<th>Current Value</th>'
                          + '<th>Profit</th>'
                          + '<th>Calculate</th>'
                        + '</tr>'
                        + '<tr class=\"alt\">'
                          + '<td class="coinType"></td>'
                          + '<td class=\"Balance\">'
                            + '<input style="width:100px; min-height:25px;  float:left" type="text" id="BalanceInput"/>'
                          + '</td>'
                          + '<td class=\"CoinInitBuy\">'
                            + '<input style="width:100px" type="text" id="CoinInit" />'
                          + '</td>'
                          + '<td class=\"CurrentValue\">'
                          + '</td>'
                          + '<td class=\"ProfitTD\">'
                          + '</td>'
                          + '<td class=\"Submit\">'
                            + '<input style="width:100px; min-height:25px" type="button" id="Calculate" value="Go">'
                          + '</td>'
                        + '</tr>'
                            //Blank row between tables!
                          + '<tr><td></td></tr>'
                            //Start of next table! 
                        + '<tr>'
                          + '<th>Price difference profit</th>'
                          + '<th>Difference</th>'
                          + '<th>BTC to use</th>'
                          + '<th>Profit</th>'
                          + '<th></th>'
                          + '<th>Calculate</th>'
                        + '</tr>'
                        + '<tr class=\"alt\">'
                          + '<td class="coinType"></td>'
                          + '<td class=\"Balance\">'
                            + '<input style="width:100px; min-height:25px;  float:left" type="text" id="altDifference"/>'
                          + '</td>'
                          + '<td class=\"CoinInitBuy\">'
                            + '<input style="width:100px" type="text" id="BaseToUse" />'
                          + '</td>'
                          + '<td class="ProfitTD2"></td>'
                          + '<td>'
                          + '</td>'
                          + '<td class=\"Submit\">'
                            + '<input style="width:100px; min-height:25px" type="button" id="CalculateDiffProfit" value="Go">'
                          + '</td>'
                        + '</tr>'
                            //Blank row between tables!
                          + '<tr>'
                          + '<td></td></tr>'
                            //Start of next table!
                       + '</br>'
                      //End of table above
                      //Onto the Results and Website Status Sections.
                      + '<table class=\"mylists\" style="font-size: 80%">'
                        + '<tr>'
                            + '<td colspan=6></td>'
                        + '</tr>'
                        + '<tr>'
                            + '<th>Readouts:</th>'
                          + '<th></th>'
                          + '<th></th>'
                          + '<th></th>'
                          + '<th></th>'
                          + '<th>Website</th>'
                          + '<th>Status</th>'
                        + '</tr>'
                        //
                            + '<tr>'
                                + '<td class="BSquan"></td>'
                                + '<td>∴</td>'
                                + '<td class="BSquan2">Value: </td>'
                                + '<td> </td>'
                                //gap between left and right
                                + '<td></td>'
                              //SiteStatus section
                                + '<td>MTgox:'
                                    + '<td id="Sitestatus1">?</td>'
                                + '</td>'
                            + '</tr>'
                        //2nd row
                        + '<tr class=\"alt\">'
                            + '<td class="RecBS"></td>'
                            + '<td>∴</td>'
                            + '<td class="RecBS2">Value: </td>'
                            + '<td></td>'
                            //gap between left and right
                            + '<td></td>'
                          //SiteStatus section
                            + '<td>Bitcointalk:'
                                + '<td id="Sitestatus2">?</td>'
                            + '</td>'
                        + '</tr>'
                        //2nd row
                        + '<tr>'
                            + '<td class="shenanegans1"></td>'
                            + '<td>∴</td>'
                            + '<td class="shenanegans2"></td>'
                            + '<td> </td>'
                            //gap between left and right
                            + '<td></td>'
                          //SiteStatus section
                            + '<td>BTC-e:'
                                + '<td id="Sitestatus3">?</td>'
                            + '</td>'
                        + '</tr>'
                        //3rd row
                        + '<tr class=\"alt\">'
                            + '<td class="shenanegans3"></td>'
                            + '<td>∴</td>'
                            + '<td class="shenanegans4"></td>'
                            + '<td> </td>'
                            //gap between left and right
                            + '<td></td>'
                          //SiteStatus section
                            + '<td>'
                              + '<select id="SiteSelect" style="width:100px; min-height:25px">'
                                    + '<option value="http://www.bitcoincharts.com/static/chartslogo.png">bitcoincharts</option>'
                                    + '<option value="https://www.aurumxchange.com/images/logo.png">Aurumxchange</option>'
                                    + '<option value="http://www.pool-x.eu/images/nlogo.jpg">pool-x</option>'
                                    + '<option value="https://www.btcguild.com/images/top-bg.png">BTCGuild</option>'
                                    + '<option value="https://www.bitstamp.net/s/images/bitstamp_logo_foot.png">bitstamp</option>'
                                + '</select>'
                              + '<td id="Sitestatus4">?</td>'
                            + '</td>'
                        + '</tr>'
                        //4th row
                        + '<tr>'
                            + '<td class="shenanegans5"></td>'
                            + '<td>∴</td>'
                            + '<td class="shenanegans6"></td>'
                            + '<td> </td>'
                            //gap between left and right
                            + '<td></td>'
                          //SiteStatus section
                            + '<td>'
                            //blank!
                            + '</td>'
                        + '</tr>'
                + '</table>'
            + '</div>');
    },

    colourloop: function () {
        for (var i = 3; i < 23; i++) {
            //---//
            var buy = Vircurex.derp('link', i, 2);
            var sell = Vircurex.derp('link', i, 6);
            var recent = Vircurex.derp('text', i, 11);
            //Grabbing the cell locations of buy/sell/recent to colour
            var buycolour = Vircurex.getCell('mainwindow', i, 2);
            var sellcolour = Vircurex.getCell('mainwindow', i, 6);
            var recentcolour = Vircurex.getCell('mainwindow', i, 11);

            //Grabbing buy/sell/recent quantity values
            var buyqty = Vircurex.derp('link', i, 1);
            var sellqty = Vircurex.derp('link', i, 5);
            var recentqty = Vircurex.derp('text', i, 10);
            //Grabbing the buy/sell/recent quantity cells
            var buyqtycell = Vircurex.getCell('mainwindow', i, 1);
            var sellqtycell = Vircurex.getCell('mainwindow', i, 5);
            var recentqtycell = Vircurex.getCell('mainwindow', i, 10);

            //Grabbing btc values
            var btcbuyqty = Vircurex.derp('text', i, 3);
            var btcsellqty = Vircurex.derp('text', i, 7);
            var btcrecqty = Vircurex.derp('text', i, 12);
            //Grabbing btc cells
            var btcBuyQtyCell = Vircurex.getCell('mainwindow', i, 3);
            var btcSellQtyCell = Vircurex.getCell('mainwindow', i, 7);
            var btcRecQtyCell = Vircurex.getCell('mainwindow', i, 12);

            //Grab recent time to maybe show difference in time between recent executions..
            //var recTime = Vircurex.getCell('mainwindow', i, 9);

            var pctDiffArr = [0.00, 5.00, 10.00, 25.00, 50.00, 75.00];
            var btcQtyArr = [0.000000, 0.0010000, 0.010000, 0.100000, 1.000000, 5.000000];

            //Partially finished buy colour ranking system
            var BuyGradient = ['#00FF33', '#00CC33', '#009933', '#006633', '#003333', '#000033'];
            var SellGradient = ['#FFFF33', '#FFCC33', '#FF9933', '#FF6633', '#FF3333', '#FF0033'];
            var GorGradient = ['#006600', '#B80000', '#FF9900'];  //Green/Orange/Red
            var QtyGradient = ['#FFFFFF', '#E0E0E0', '#C8C8C8', '#A8A8A8', '#808080', '#505050'];

            //Working PERCENT difference!
            var pctDiffbuy = (Math.abs(((buy / avg) * 100) - 100)).toFixed(2);
            var pctDiffsell = (Math.abs(((sell / avg) * 100) - 100)).toFixed(2);

            //Calling function to colour the buy/sell/recent prices
            Vircurex.Colours(buycolour, pctDiffbuy, pctDiffArr, BuyGradient);
            Vircurex.Colours(sellcolour, pctDiffsell, pctDiffArr, SellGradient);
            //---//
            Vircurex.Colours(buyqtycell, btcbuyqty, btcQtyArr, QtyGradient);
            Vircurex.Colours(sellqtycell, btcsellqty, btcQtyArr, QtyGradient);
            Vircurex.Colours(recentqtycell, btcrecqty, btcQtyArr, QtyGradient);
            //---//
            Vircurex.Colours(btcSellQtyCell, btcsellqty, btcQtyArr, QtyGradient);
            Vircurex.Colours(btcBuyQtyCell, btcbuyqty, btcQtyArr, QtyGradient);
            Vircurex.Colours(btcRecQtyCell, btcrecqty, btcQtyArr, QtyGradient);

            //Muh-Fuggan strike throughs!
            strikeThrough.Striking(btcbuyqty, buyqtycell, btcBuyQtyCell, buycolour, 1);
            strikeThrough.Striking(btcsellqty, sellqtycell, btcSellQtyCell, sellcolour, 2);
            strikeThrough.Striking(btcrecqty, recentqtycell, btcRecQtyCell, recentcolour, 3);
        }
    }
    //End of var
};

var InitResults = {

    BSquantitytotal: function () {
        var buyqty = 0, buyqtytotal = 0, sellqty = 0, sellqtytotal = 0;

        for (var i = 3; i < 23; i++) {
            //Buy volume addition loop
            buyqty = $("a", "tr:nth-child(" + i + ") td.coinformat:nth-child(1)").text();
            buyqtytotal += BalanceBox.CleanUp(buyqty);
            //Sell volume addition loop
            sellqty = $("a", "tr:nth-child(" + i + ") td.coinformat:nth-child(5)").text();
            sellqtytotal += BalanceBox.CleanUp(sellqty);
        }

        if (buyqtytotal > sellqtytotal) {
            $('.BSquan').append("Buy.Qty > Sell.Qty");
            $('.BSquan2').append("▲");
        } else if (buyqtytotal === sellqtytotal) {
            $('.BSquan').append("Buy.Qty = Sell.Qty");
            $('.BSquan2').append("---");
        } else {
            $('.BSquan').append("Buy.Qty < Sell.Qty");
            $('.BSquan2').append("▼");
        }
    },

    recBuySell: function () {
        var recbuy = 0, recsell = 0;

        for (var q = 3; q < 23; q++) {
            var recentOrdVal = $('.mainwindow .mylists tr:nth-child(' + q + ') td:nth-child(13)').text();
            var recentOrdCell = $('.mainwindow .mylists tr:nth-child(' + q + ') td:nth-child(13)')[0];
            if (recentOrdVal === 'Buy') {
                $(recentOrdCell).css({ 'background-color': '#006600' });
                recbuy++;
            } else if (recentOrdVal === 'Sell') {
                $(recentOrdCell).css({ 'background-color': '#B80000' });
                recsell++;
            }
        }

        if (recbuy > recsell) {
            $('.RecBS').append("Rec.Buy > Rec.Sell");
            $('.RecBS2').append("▲");
        } else if (recbuy === recsell) {
            $('.RecBS').append("Rec.Buy = Rec.Sell");
            $('.RecBS2').append("---");
        } else if (recbuy < recsell) {
            $('.RecBS').append("Rec.Buy < Rec.Sell");
            $('.RecBS2').append("▼");
        }
    }
};

var strikeThrough = {
    Striking: function(a, b, c, d, e) {
            if (a < 0.015000) {
                //Strikes through the recent orders that are too small
                $(b).css('textDecoration', 'line-through');
                $(c).css('textDecoration', 'line-through');
                $(d).css('textDecoration', 'line-through');
                //            
                if (e === 1) {
                    giBuyStrikeCount++;
                } else if (e === 2) {
                    giSellStrikeCount++;
                } else if (e === 3) {
                    giRecentStrikeCount++;
                } 
            }
    },

    StrikeResult: function (Strike, tdloc1, tdloc2, Typeofstrike) {
        if (Strike > 10) {
            $('.shenanegans' + tdloc1).prepend(Typeofstrike + "strike > 10");
            $('.shenanegans' + tdloc2).prepend("Shenanegans?! ✓");
        } else if (Strike === 10) {
            $('.shenanegans' + tdloc1).prepend(Typeofstrike + "strike = 10");
            $('.shenanegans' + tdloc2).prepend("Shenanegans afoot?");
        } else if (Strike < 10) {
            $('.shenanegans' + tdloc1).prepend(Typeofstrike + "strike < 10");
            $('.shenanegans' + tdloc2).prepend("Shenanegans? ✘");
        }
    }
};

var Vircurex = {

    derp: function (a, b, c) {
        var cellvalue = 0;

        if (a === 'link') {
            cellvalue = $('a', 'tr:nth-child(' + b + ') td.coinformat:nth-child(' + c + ')').text();
        } else if (a === 'text') {
            cellvalue = $('.mainwindow .mylists tr:nth-child(' + b + ') td.coinformat:nth-child(' + c + ')').text();
        } else {
            alert("Value text type derp! text or hyperlink!");
        }

        cellvalue = BalanceBox.CleanUp(cellvalue);
        return cellvalue;
    },

    //a=Location ie (.mainwindow .mylists) or ('a').
    //b=Row number (just pass through variable 'a' from loop!).
    //c=td nth child number.
    getCell: function (a, b, c) {
        var cell = 'test';
        if (a === 'mainwindow') {
            cell = $('.mainwindow .mylists tr:nth-child(' + b + ') td.coinformat:nth-child(' + c + ')')[0];
        } else if (a === 'right') {
            cell = $('.mainwindow .mylists tr:nth-child(' + b + ') td.coinformat:nth-child(' + c + ')')[0];
        } else if (a === 'maintop') {
            cell = $('.mainwindow .mylists tr:nth-child(' + b + ') th:nth-child(' + c + ')')[0];
        } else {
            alert("Value location derp!");
        }
        return cell;
    },

    Colours: function (a, b, c, d) {
        if ((b >= c[0]) && (b < c[1])) {
            $(a).css({ 'background-color': d[0] });
        } else if ((b >= c[1]) && (b < c[2])) {
            $(a).css({ 'background-color': d[1] });
        } else if ((b >= c[2]) && (b < c[3])) {
            $(a).css({ 'background-color': d[2] });
        } else if ((b >= c[3]) && (b < c[4])) {
            $(a).css({ 'background-color': d[3] });
        } else if ((b >= c[4]) && (b < c[5])) {
            $(a).css({ 'background-color': d[4] });
        } else if (b >= c[5]) {
            $(a).css({ 'background-color': d[5] });
        }
    }
};

var SiteStatus = {

    testImage: function (url, siteNum, timeout) {
        timeout = timeout || 1000;
        var timedOut = false, timer;
        var img = new Image();

        img.onerror = function () {
            if (!timedOut) {
                clearTimeout(timer);
                SiteStatus.record("Down!", siteNum);
            }
        };

        img.onload = function () {
            if (!timedOut) {
                clearTimeout(timer);
                SiteStatus.record("Up", siteNum);
            }
        };

        img.src = url;

        timer = setTimeout(function () {
            timedOut = true;
            SiteStatus.record("Timeout", siteNum);
        }, timeout);
    },

    record: function (result, siteNum) {
        //This line works
        (document.getElementById("Sitestatus" + siteNum)).innerHTML = result;
    },

    init: function () {
        SiteStatus.testImage("https://mtgox.com/img/hp_merchant.jpg", 1);
        SiteStatus.testImage("https://bitcointalk.org/Themes/custom1/images/off.gif", 2);
        SiteStatus.testImage("https://btc-e.com/images/1px.png", 3);
        $('.coinType').prepend(AltCurrency);
        $('.CurrentValue').prepend(avg);
        $('#altDifference')[0].value = altDifference;

        //On change of #SiteSelect it calls the sitestatus script for the picked option
        $("#SiteSelect").change(function () {
            var changedVal = $("#SiteSelect").val();
            SiteStatus.testImage(changedVal, 4);
        });
    }
};

var BalanceBox = {

    //not tested the below.. WIP!
    ProfitCalcSubmit: function () {
        var UserBalance = BalanceBox.CleanUp(document.getElementById("BalanceInput").value);
        UserBalance = (parseFloat(UserBalance)).toFixed(6);

        var InitCoinVal = BalanceBox.CleanUp(document.getElementById("CoinInit").value);
        InitCoinVal = (parseFloat(InitCoinVal)).toFixed(6);


        if (InitCoinVal.length === 0 || UserBalance.length === 0) {
            alert("Dont leave the initial coin value/balance fields empty!");
        } else {
            var profitblah = BalanceBox.profit(InitCoinVal, UserBalance);
            $('.ProfitTD').empty().prepend(profitblah);
        }
    },

    CalculateDiffProfit: function () {
        var BaseToUse = BalanceBox.CleanUp(document.getElementById("BaseToUse").value);
        BaseToUse = (parseFloat(BaseToUse)).toFixed(6);

        if (BaseToUse.length === 0) {
            alert("Dont leave the" + BaseCurrency + "field empty!");
        } else {
            var differenceProfit = (((BaseToUse/highestbuy)*lowestsell)-BaseToUse).toFixed(6);
            $('.ProfitTD2').empty().prepend(differenceProfit);
        }      
    },

    CleanUp: function (Value) {
        Value = Value.replace(/,/g, '');
        return Value;
    },

    profit: function (InitCoinVal, Balance) {
        var profit = ((Balance * avg) - (Balance * InitCoinVal)).toFixed(6);
        profit = parseFloat(profit);
        return profit;
    },

    //Two following functions could be squished into the one function.
    //However, one is a wordy string, and the other is a numbery string.
    balanceType: function (tr) {
        var balanceType = $("#balancebox .mylists tr:nth-child(" + tr + ") td:nth-child(1)").html();
        balanceType = balanceType.trim();
        return balanceType;
    },

    balance: function (tr) {
        var Balance = $("#balancebox .mylists tr:nth-child(" + tr + ") td:nth-child(2)").html();
        Balance = parseFloat(Balance);
        return Balance;
    },

    BalanceGrab: function () {
            for (var z = 5; z < 12; z++) {
            //Declaring vars before If's
            var LineType = BalanceBox.balanceType(z);

                 if ( ( LineType.length > 0 ) && (LineType === AltCurrency) ) {
                      //
                      var LineValue = BalanceBox.balance(z);
                      $('#BalanceInput')[0].value = LineValue;
                      break;
                      //
                  } else if ( ( LineType.length > 0 ) && (LineType !== AltCurrency) ) {                  
                      //
                      continue;
                      //
                  } else if (LineType.length < 1) {
                      //
                      alert("You dont own this type of currency.");
                      break;
                      //
                  }
          }
    }
};

// When document is ready run thru our code.
$(document).ready(function () {
    //Refresh page every  90 secs
    //Can make this a user variable instead of fixed @ 90seconds.
    setTimeout('location.reload();', 90000);

    // Initialization
    init.avg();
    init.colourloop();
    init.calculationInsert();
    SiteStatus.init();
    InitResults.recBuySell();
    InitResults.BSquantitytotal();
    strikeThrough.StrikeResult(giBuyStrikeCount, '1', '2', 'Buy');
    strikeThrough.StrikeResult(giSellStrikeCount, '3', '4', 'Sell');
    strikeThrough.StrikeResult(giRecentStrikeCount, '5', '6', 'Recent');
    BalanceBox.BalanceGrab();

    $("#Calculate").click(function () {
        if ($('.nothing').length === 0) {
            alert("Log in!");
        } else if ($('.nothing').length !== 0) {
            BalanceBox.ProfitCalcSubmit();
        }
    });

    $("#CalculateDiffProfit").click(function () {
        if ($('.nothing').length === 0) {
            alert("Log in!");
        } else if ($('.nothing').length !== 0) {
            BalanceBox.CalculateDiffProfit();
        }
    });
});
