// ==UserScript==
// @name        Vircurex Assistant
// @namespace   Ricky & Mark
// @match       https://vircurex.com/*
// @include     https://vircurex.com/*
// @version     0.15
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require     http://code.jquery.com/ui/1.10.2/jquery-ui.js
// @grant none
// ==/UserScript==


// When document is ready run thru our code.
$(document).ready(function () {
    // *************
    // Our Object  *
    // *************
    var VA = (function () {
        // Settings variables TODO: Put in JSON array object
        var bColorOrderPriceCells, iRefreshRate;
        var originalPageState;

        // Initialise
        var init = function () {
            // Add JQUI css
            $('head').append('<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/themes/redmond/jquery-ui.css" type="text/css" />');

            InjectStyles();
            CreateOptions();
        },

        // Creates an options interface
        CreateOptions = function () {
            // Create button
            $('body').append('<div class="btnOptions"><span></span></div>');

            // Create dialogue (this is where your options should go)
            $('body').append('<div id="dialog" title="Options" style="display: none;">'
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
                minWidth: 800,
                show: {
                    effect: "blind",
                    duration: 500
                },
                hide: {
                    effect: "explode",
                    duration: 500
                },
                buttons: [
                    {
                        text: "Save",
                        click: function () {
                            // Save our options
                            SaveSettings();

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

            SavePageState();
            InitSettings();
            SaveSettings();
        },

        // Initialises settings values
        InitSettings = function () {
            $('#colorOrderPriceCells').attr('checked', GetBoolSetting('bColorOrderPriceCells'));
            $('#refreshRate').attr('value', isNaN(GetIntSetting('iRefreshRate')) ? 90000 : GetIntSetting('iRefreshRate'));
        },

        // Saves options
        SaveSettings = function () {
            SetSetting("bColorOrderPriceCells", $('#colorOrderPriceCells').is(':checked'));
            SetSetting("iRefreshRate", $('#refreshRate').attr("value"));
        },

        // Load options
        LoadSettings = function () {
            bColorOrderPriceCells = GetBoolSetting("bColorOrderPriceCells");
            iRefreshRate = GetIntSetting("iRefreshRate");
        },

        // Saves the page state to memory
        SavePageState = function () {
            originalPageState = $('body').html();
        },

        // Restores the page to it's original format
        RestorePageState = function () {
            $('body').html(originalPageState);
        },

        // Updates all UI elements
        UpdateUI = function () {
            // Restores the page to it's original format
            RestorePageState();

            // (re)load options before setting UI elements
            LoadSettings();

            // Color cells [ RICKY: This line says if (bColorOrderPriceCells == true) then call function ColorOrderPriceCells(); ]
            if (bColorOrderPriceCells) ColorOrderPriceCells();

            //Refresh page every  90 secs
            setTimeout("location.reload();", iRefreshRate);
        },

        // Injects styles to DOM
        InjectStyles = function () {
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
        },
        
        // TODO 
        ColorOrderPriceCells = function () {
            alert("coloring cells");
        }

        //return true;
        return {
            init: init,
            UpdateUI: UpdateUI
        };

    })();

    // Initialization
    VA.init();

    // Update UI.
    VA.UpdateUI();
});


/******************
 HELPER FUNCTIONS
 ******************/

// Saves setting to local storage
function SetSetting(key, value) {
    // Check if local storage is supported
    if (hasLocalStorageSupport()) {
        // Try to save to local storage
        try {
            localStorage.setItem(key, value); // saves to the database, "key", "value"
        } catch (e) {
            if (e == QUOTA_EXCEEDED_ERR) {
                alert('Quota exceeded!'); //data wasn't successfully saved due to quota exceed so throw an error
            }
        }
    } else {
        alert("Browser does not support local storage!");
    }
}

// Gets settings from local storage (ASSUME ALWAYS RETURNS A STRING or NUMBER)
function GetSetting(key) {
    // Check if local storage is supported
    if (hasLocalStorageSupport()) {
        // If it does then return the value.
        return localStorage.getItem(key);
    } else {
        alert("Browser does not support local storage!");
    }
}

// Gets a boolean from local storage
function GetBoolSetting(key) {
    if (GetSetting(key) == "true") {
        return true;
    } else if (GetSetting(key) == "false") {
        return false;
    } else {
        return false;
    }
}

// Gets a setting as type int
function GetIntSetting(key) {
    return parseInt(GetSetting(key));
}

// Check for HTML5 support for local storage?
function hasLocalStorageSupport() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}

