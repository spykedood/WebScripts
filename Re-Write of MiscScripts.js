/*
NOTE:
THIS ENTIRE SCRIPT IS A COMBINATION OF NON-WORKING/BETA VERSIONS OF SCRIPTS FOR FUTURE USE.
THEY MAY NOT WORK RIGHT OFF THE BAT, THIS IS MORE OF A TESTING ZONE.
*/

//GRAB BELOW THIS FOR WORKING-ISH TEST!
$(document).ready(function () 
{
  $('.mainwindow').append('<div style="float:top;"></br>'
    				+ '<table class=\"mylists\" style="font-size: 80%">'
                            + '<tr><td colspan=5></td></tr>'
                            + '<tr>'
                              + '<th>Profit Calculator</th>'
                              + '<th>Balance</th>'
                              + '<th>Initial Price</th>'
                              + '<th>Current Value</th>'
                              + '<th>Profit</th>'
                              + '<th></th>'
                            + '</tr>'
                            + '<tr class=\"alt\">'
                              + '<td class="coinType"></td>'
                              + '<td class=\"Balance\">'
                              	+ '<input style="width:100px; min-height:25px;  float:left" type="text" id="BalanceInput" />'
                              	+ '<input style="width:100px; float:right; min-height:25px;" type="button" id="a" value="Auto" onClick="submit1();">'
                              + '</td>'
                              + '<td class=\"CoinInitBuy\">'
                                + '<input style="width:100px" type="text" id="CoinInit" />'
                              + '</td>'
                              + '<td class=\"CurrentValue\">'
                                + '<input style="width:100px" type="text" id="CurrentVal" />'
                              + '</td>'
                              + '<td class="ProfitTD">Test</td>'
                              + '<td class=\"Submit\">'
                              	+ '<input style="width:100px; min-height:25px" type="button" id="a" value="Go" onClick="BalanceBox.submit2();">'
                              + '</td>'
                            + '</tr>'
                            	//Blank row between tables!
                              + '<tr><td></td></tr>'
                              	//Start of next table! 
                            + '<tr>'
                           		+ '<th>Price.Diff Calculator</th>'
                              + '<th>Difference</th>'
                              + '<th>BTC</th>'
                              + '<th>Profit</th>'
                              + '<th></th>'
                              + '<th></th>'
                            + '</tr>'
                            + '<tr class=\"alt\">'
                              + '<td class="coinType"></td>'
                              + '<td class=\"Difference\">'
                                + '<input style="width:100px; min-height:25px;  float:left" type="text" id="BalanceInput" />'
                              + '</td>'
                              + '<td class=\"BTCInput\">'
                                + '<input style="width:100px" type="text" id="CoinInit" />'
                              + '</td>'
                              + '<td class=\"Profitbox\">'
                                + '<input style="width:100px" type="text" id="CurrentVal" />'
                              + '</td>'
                              + '<td class="ProfitButton"></td>'
                              + '<td class=\"Submit\">'
                                + '<input style="width:100px; min-height:25px" type="button" id="a" value="Go" onClick="BalanceBox.submit2();">'
                              + '</td>'
                            + '</tr>'
                              	//Blank row between tables!
                              + '<tr>'
                              + '<td></td></tr>'
                              	//Start of next table!
                           + '<tr>'
                     		     + '<th>Value Manipulator</th>'
                             + '<th>Current Value</th>'
                             + '<th>Bought @</th>'
                             + '<th>Profit</th>'
                             + '<th>Profit2</th>'
                           + '</tr>'
                           + '<tr class=\"alt\">'
                           	  + '<td class=\"Balance\">'
                           	  	+ '<input style="width:100px;" type="text" id="Diff" />'
                           	  + '</td>'
                           	  + '<td class=\"2\">'
                           	  	+ '<input style="width:100px;" type="text" id="CoinInit" value="btc"/>'
                           	  + '</td>'
                           	  + '<td>'
                           	  	+ '<input style="width:100px;" type="text" id="CoinInit" value="Profit"/>'
                           	  + '</td><td class=\"Submit\">'
                           	  	+ '<input style="width:100px; min-height:25px" type="button" id="a" value="Go" onClick="BalanceBox.submit2();">'
                           	  + '</td>'
                           + '</tr>'
                            + '</table></br>'
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
                              + '<th></th>'
                              + '<th></th>'
                            + '</tr>'
                           	//1st row
                            + '<tr class=\"alt\">'
                            	+ '<td id="RecBS">RecB>RecS</td>'
                            	+ '<td>∴</td>'
                            	+ '<td id="RecBS2">Val &#9650;&#9660;</td>'
                            	+ '<td>4</td>'
                               	//gap between left and right
                            	+ '<td></td>'
                              //SiteStatus section
                            	+ '<td>MTgox:'
                            		+ '<td id="Sitestatus1">?</td>'
                            	+ '</td>'
                            + '</tr>'
                            //2nd row
                            + '<tr>'
                            	+ '<td id="BSquan">1</td>'
                            	+ '<td>∴</td>'
                            	+ '<td id="BSquan2">Val &#9650;&#9660;</td>'
                            	+ '<td>4</td>'
                            	//gap between left and right
                            	+ '<td></td>'
                              //SiteStatus section
                            	+ '<td>bitcointalk:'
                            		+ '<td id="Sitestatus2">?</td>'
                            	+ '</td>'
                            + '</tr>'
                            //3rd row
                            + '<tr class=\"alt\">'
                            	+ '<td>1</td>'
                            	+ '<td>∴</td>'
                            	+ '<td>Val &#9650;&#9660;</td>'
                            	+ '<td>4</td>'
                            	//gap between left and right
                            	+ '<td></td>'
                              //SiteStatus section
                            	+ '<td>BTC-e:'
                            		+ '<td id="Sitestatus3">?</td>'
                            	+ '</td>'
                            + '</tr>'
                            //4th row
                            + '<tr>'
	                            + '<td>1</td>'
	                            + '<td>∴</td>'
	                            + '<td>Val &#9650;&#9660;</td>'
	                            + '<td>4</td>'
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
                    +'</table>'
                +'</div>');

  SiteStatus.testImage("https://mtgox.com/img/hp_merchant.jpg", 1);
  SiteStatus.testImage("https://bitcointalk.org/Themes/custom1/images/off.gif", 2);
  SiteStatus.testImage("https://btc-e.com/images/1px.png", 3);
  $('.coinType').prepend((BalanceBox.getURLParameter("alt")).toUpperCase());

    //On change of #SiteSelect it calls the sitestatus script for the picked option
    $("#SiteSelect").change(function() 
    {
      var changedVal = $("#SiteSelect").val();
      SiteStatus.testImage(changedVal,4);
    });

//Closing the doc ready code section!
});


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
      }
  };  

//GRAB ABOVE THIS FOR WORKING-ISH TEST!


//Beginning of modular function container
var BalanceBox = {

    getURLParameter: function(param) 
    {
      var pageURL = window.location.search.substring(1);
      var URLVariables = pageURL.split('&');
      for (var i = 0; i < URLVariables.length; i++) {
          var parameterName = URLVariables[i].split('=');
          if (parameterName[0] == param) {
              return parameterName[1];
            }
      }
    }
};
