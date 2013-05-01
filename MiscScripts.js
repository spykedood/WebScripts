/*
NOTE:
THIS ENTIRE SCRIPT IS A COMBINATION OF NON-WORKING/BETA VERSIONS OF SCRIPTS FOR FUTURE USE.
THEY MAY NOT WORK RIGHT OFF THE BAT, THIS IS MORE OF A TESTING ZONE.
*/

//******************************************//
//                                          //
//                                          //
//BEGINNING OF BALANCE SCRIPTS              //
//WARNING MASSIVE!!                         //
//MAKE HASTE BEFORE THINE SOUL IS DESTROYED!//
//                                          //
//                                          //
//******************************************//

//Ammending HTML to the balance box section - will be a profitability calculator.
//Quantity/Current Price/Price bought in at = +- profit infoboxes
//Change top row naming
$('.mainwindow').append('<div style="float:left;"></br><table class=\"mylists\" style="font-size: 80%">'
                          + '<tr><td colspan=6></td></tr>'
                          + '<tr><th>Currency</th><th>Current Value</th><th>Balance</th><th>Initial price</th></tr>'
                          + '<tr class=\"alt\"><td>'
                            + '<select id="currencyList" style="width:100px; min-height:25px">'
                              + '<option>Currency:</option>'
                              + '<option>BTC</option>'
                              + '<option>LTC</option>'  
                              + '<option>PPC</option>'
                              + '<option>TRC</option>'
                              + '<option>DVC</option>'
                              + '<option>NMC</option>'
                            + '</select>'
                            + '<td class=\"PPCBalance\"><input style="width:100px;  float:left" type="text" id="BalanceInput" /><input style="width:100px; float:right; min-height:25px" type="button" id="a" value="Auto" onClick="submit1();"></td><td class=\"BoughtAt\"><input style="width:100px" type="text" id="CoinInit" /></td><td class=\"Submit\"><input style="width:100px; min-height:25px" type="button" id="a" value="Go" onClick="BalanceBox.submit2();"></td></tr>'
                            + '<tr><td></td></tr>' 
                         + '<tr><th>Balance</th><th>Current Value</th><th>Bought @</th><th>Profit</th></tr>'
                            + '<tr><td class=\"Balance\"><input style="width:100px" type="text" id="Diff" /></td><td class=\"2\"><input style="width:100px" type="text" id="CoinInit" value="btc"/></td><td><input style="width:100px" type="text" id="CoinInit" value="Profit"/></td><td class=\"Submit\"><input style="width:100px; min-height:25px" type="button" id="a" value="Go" onClick="BalanceBox.submit2();"></td></tr>'
                            + '<tr><td></td></tr>' 
                         + '<tr><th>Balance</th><th>Current Value</th><th>Bought @</th><th>Profit</th></tr>'
                            + '<tr><td class=\"Balance\"><input style="width:100px" type="text" id="Diff" /></td><td class=\"2\"><input style="width:100px" type="text" id="CoinInit" value="btc"/></td><td><input style="width:100px" type="text" id="CoinInit" value="Profit"/></td><td class=\"Submit\"><input style="width:100px; min-height:25px" type="button" id="a" value="Go" onClick="BalanceBox.submit2();"></td></tr>'
                          + '</table></br>'
                        //
                        +'<table class=\"mylists\" style="font-size: 80%">'
                          +'<tr><td colspan=6></td></tr>'
                          +'<tr><th>Balance</th><th>Current Value</th><th>Bought @</th><th>Profit</th><td></td><th>Site Status</th></tr>'
                          +'<tr><td>1</td><td>2</td><td>3</td><td>4</td><td></td><td>MTgox:<td id="Sitestatus1">?</td></td></tr>'
                          +'<tr><td>1</td><td>2</td><td>3</td><td>4</td><td></td><td>bitcointalk:<td id="Sitestatus2">?</td></td></tr>'
                          +'<tr><td>1</td><td>2</td><td>3</td><td>4</td><td></td><td>BTC-e:<td id="Sitestatus3">?</td></td></tr>'
                          +'<tr><td>1</td><td>2</td><td>3</td><td>4</td><td></td><td>'
                            + '<select id="SiteList"  style="width:100px; min-height:25px">'
                              + '<option value=""></option>'
                              + '<option value="http://www.bitcoincharts.com/static/chartslogo.png">bitcoincharts</option>'
                              + '<option value="https://www.aurumxchange.com/images/logo.png>Aurumxchange</option>'
                              + '<option value="http://www.pool-x.eu/images/nlogo.jpg">pool-x</option>'
                              + '<option value="https://www.btcguild.com/images/top-bg.png>BTCGuild</option>'
                              + '<option value="https://www.bitstamp.net/s/images/bitstamp_logo_foot.png>bitstamp</option>'
                            + '</select>'
                            + '<td id="Sitestatus4">?</td>'
                          +'</td></tr>'
                        +'</table>'
                        +'</div>');

var SiteStatus = {

    testImage: function(url, siteNum, timeout) {
        timeout = timeout || 1000;
        var timedOut = false, timer;
        var img = new Image();
        
        img.onerror = function() {
          if (!timedOut) {
            clearTimeout(timer);
            SiteStatus.record("Down!", siteNum);
          }
        };

        img.onload = function() {
          if (!timedOut) {
            clearTimeout(timer);
            SiteStatus.record("Up", siteNum);
          }
        };

        img.src = url;
        timer = setTimeout(function() {
            timedOut = true;
            SiteStatus.record("Timeout", siteNum);
        }, timeout); 
    }, 

    record: function(result, siteNum) {
        //This line works
        (document.getElementById("Sitestatus" + siteNum)).innerHTML = result;
    },

    multipleSites: function() {
      //Doesn't get called
      //Dont think this would work either :/
        var SiteList = document.getElementById("SiteList");
        var y = SiteList.options[SiteList.selectedIndex].value;
        return y;
    }
};  

SiteStatus.testImage("https://mtgox.com/img/hp_merchant.jpg", 1);
SiteStatus.testImage("https://bitcointalk.org/Themes/custom1/images/off.gif", 2);
SiteStatus.testImage("https://btc-e.com/images/1px.png", 3);
$(function(){
    $('select.SiteList').on('change', function(){
        var blah = $(this).val();
        SiteStatus.testImage(blah, 3);
    });        
});


//Beginning of modular function container
var BalanceBox = {

    //not tested the below.. WIP!
    submit2: function()
    {
     $("#a").click(function(){
          var InitCoinVal = document.getElementById("CoinInit");
          var Currency = document.getElementById("currencylist");
          var CurrencyBalance = BalanceBox.BalanceVal(Currency);
          balancebox.profit(InitCoinVal, Currency);
       });
    },

    submit1: function()
    {
     $("#b").click(function(){
          UsrBalInput = document.getElementById("BalanceInput");
       });
    },

    balance: function(tr) {
      var Balance = $("#balancebox .mylists tr:nth-child(" + tr + ") td.coinformat:nth-child(2)").text();
      return Balance;
    },

    //Issue with this is we need to grab the type which the following will do
    //But we also need to know which tr within the balance this type is located.
    //not all used will have the same balance types in the same places.
    balanceType: function(tr) {
      var balanceType = $("#balancebox .mylists tr:nth-child(" + tr + ") td.coinformat:nth-child(1)").text();
      return balanceType;
    },

    AvgVal: function(tr) {
      High = $("#exinfobox .mylists tr:nth-child(" + tr + ") td.coinformat:nth-child(2)").text();
      High = BalanceBox.Cleanup(High);
      //alert(TRCHigh);
      Low = $("#exinfobox .mylists tr:nth-child(" + tr + ") td.coinformat:nth-child(3)").text();
      Low = BalanceBox.Cleanup(Low);
      //alert(TRCLow);
      AvgVal = (((High) + (Low)) / 2).toFixed(6);
      return AvgVal;
    },

    CleanUp: function(Value){
      Value = Value.replace(/,/g, '');
      parseFloat(Value);
      return Value;
    },

    profit: function(InitCoinVal){
      //cant...brain...
      //grab currency they want to calculate from currencylist (list in table inserted above)
      //Calculate profit for that type of currency
      //requires the user to input initcoinval then hit GO to call this!
      //Need to call balance and avgval to grab the currency type's balance and avgval.
      //If the user tries to calculate without having a balance in that, it'll be a problem, it'll break the balance script!
      //Balance script will return nothing if balance = 0.
      //Make balance an inputable textbox with a button beside it to grab the user's ACTUAL value of balance?
      Profit = ((Balance * AvgVal)-(Balance * InitCoinVal)).toFixed(6);
      BalanceBox.balancecolour(Profit, ".Profit2"); //ppcprofit
    },

    BalanceVal: function(Currency) {
      for (var z = 2; z < 10; z++) 
      {
        if((BalanceBox.balanceType(z))!="") {
            If(BalanceBox.balanceType(z)===Currency) {
                var Balance = BalanceBox.balance(z);
                return Balance;
            }
        } else {
            break;
        }
      }
    },

    //Could even probably merge the following with the colouring of recent buy/sell orders!.
    //Both use green/orange/red.
    balancecolour: function(a,b) {
    if(a > 0) {
      $(b).css({"background-color": "green"});
      } else if (a === 0){
      $(b).css({"background-color": "orange"});
      } else {
      $(b).css({"background-color": "red"});
      }
    }
};



//Below this line lies code of the damned. Nary a man returns from such depths of depravity.


//Detecting what type of coin you have in balance
//There's probably a better way of doing this..meh.
    for (var x = 2; x < 6; x++) 
    {
        if((BalanceBox.balanceType(x))==="") {
          // WHERE CHECK CODE GOES! //
          Break;
        } else if ((BalanceBox.balanceType(x))==="PPC") {
            //AvgPPC = Balancebox.AvgVal(11);
            PPCBalance = Balancebox.balance(x);        
        } else if ((BalanceBox.balanceType(x))==="TRC") {
            //AvgTRC = Balancebox.AvgVal(11);
            TRCBalance = Balancebox.balance(x);
        } else if ((BalanceBox.balanceType(x))==="LTC") {
            //AvgLTC = Balancebox.AvgVal(11);
            LTCBalance = Balancebox.balance(x);        
        } else if ((BalanceBox.balanceType(x))==="EUR") {
            //AvgEUR = Balancebox.AvgVal(11);
            EURBalance = Balancebox.balance(x);        
        } else if ((BalanceBox.balanceType(x))==="USD") {
            //AvgUSD = Balancebox.AvgVal(11);
            USDBalance = Balancebox.balance(x);        
        } else if ((BalanceBox.balanceType(x))==="NMC") {
            //AvgNMC = Balancebox.AvgVal(11);
            NMCBalance = Balancebox.balance(x);        
        } else if ((BalanceBox.balanceType(x))==="DVC") {
            //AvgDVC = Balancebox.AvgVal(11);
            DVCBalance = Balancebox.balance(x);        
        } else if ((BalanceBox.balanceType(x))==="IXC") {
            //AvgIXC = Balancebox.AvgVal(11);
            IXCBalance = Balancebox.balance(x);        
        }

      //Read 
    }

    //NOTE THE FOLLOWING CODE IS PSEUDOCODE! (Shite-code more like amirite? ( ._.) )
    //The following would be put in line 129:
    if(AllTypes[] !Contains "Type") {
      //Offer places to get this "Type" of coin for free!
      //Refferals etc
      //Subtle links etc.
    } else if (AllTypes[] !Contains "Type2") {
      //ETC... for all types of currency
    }

    //Below line is an idea - maybe not a good one, duno..
    //var CurrencyType = ['PPC', 'TRC', 'LTC', 'DVC', 'BTC', 'NMC', 'IXC', 'USD', 'EUR'];

    //How do you compare one array with another array?
    //If one array doesnt have some of the values in the second array,
    //We could assume they dont have that type of currency.
    function containsType(Alltypes, CurrencyType, x) {
        if(Alltypes[x] !Contains CurrencyType[x]){
          //offer stuff for CurrencyType[x]
        }
    }

//Script for price manipulation & profit from doing so!!
var balance = //Grab input from user
var PreProfit = (LowestSell-HighestBuy) * Balance;
var Cost = 0;
    for (var i = 3; i < 23; i++) {
      If (SellQuantity < 0.x) { //sellquantity being the quantity of btc being exchanged
        Cost += Sellquantity
      } else {
        var lowPostPrice = //This row's price
        i = 23; //break out of loop
      }

    } //end of loop
var PostProfit = (((LowestSell-HighestBuy)*Balance) - PreProfit)-Cost;
If ((PostProfit > 0) && (RecentBuys > RecentSells)) {
  Alert("Worth spending" Cost "btc to raise price to" lowPostPrice "You'll earn" PostProfit);
} else {
  alert("Not worth it.")
}
