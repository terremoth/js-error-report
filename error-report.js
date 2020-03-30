function reportError(message, file, line, column, err) {

    var ignorePatterns = [/NS_ERROR_FAILURE/, /NS_ERROR_FILE_CORRUPTED/, /NS_ERROR_NOT_INITIALIZED/, /NS_ERROR_STORAGE_BUSY/, /^Script error.?$/, /^Unspecified error.?$/, /Failed to fetch/, /javaEnabled()/, /Blocked a frame with origin "https:\/\/www\.kickstarter\.com"/, /Permission denied to access property "dispatchEvent"/, /Cannot read property 'checkDomStatus' of undefined/, /_avast_submit/, /vid_mate_check is not defined/, /Can't find variable: pktAnnotationHighlighter/, /csRestoreTitle is not defined/, /Failed to read the 'cssRules' property from 'CSSStyleSheet'/, /window.mraid/, /MoatMAK/, /BetterJsPop/, /Network error: JSON|Network error: Unexpected|UnhandledPromiseRejectionWarning: Error/, /a\[b\].target.className.indexOf is not a function/, /can't redefine non-configurable property "userAgent"/, /SymBrowser/, /GM_log is not defined/, /Can't find variable: article/, /xdArbiterSyn/, /Can't find variable: YAHOO/, /Can't find variable: REpub/, /Can't find variable: getShouldDelayWebView/, /Can't find variable: IS_FAVABLE/, /Cannot redefine property: googletag/, /Netv&aelig;rksforbindelsen gik tabt/, /HTMLBodyElement.window.touchMoveFunc/, /fixedTimeID is not defined/, /Can't find variable: loadHomepageTiles/, /papago.naver.net/, /Can't find variable: kw__injected/, /Can't find variable: fas_longPress/, /theurl is not defined/, /MetaMask/, /tgetT is not defined/, /window\.setDgResult is not a function/, /feeddler-article/, /ReferenceError: selectword is not defined/, /web3 is not defined/, /window.AJS is undefined/, /GSApp/, /cordova is not defined/, /javacalljs is not defined/, /setConnectedRobot/, /listenToMutationsFromJS/, /ABse is not defined/, /TextViewAPI/, /navigator.sendBeacon/, /ResizeObserver loop limit exceeded/, /naverapp/, /__show__deepen is not defined/, /__firefox__/, /Can't find variable: fieldset/, /GM_getValue/, /__hawk_browser__ is not defined/, /QuotaExceededError: DOM Exception/, /Error: Permission denied to access property "parentNode"/];
    var reportError = true;

    ignorePatterns.map(function (value) {
        if (message.match(value)) {
            reportError = false;
        }
    });

    if (reportError) {
        var data = {
            message: message,
            file: file,
            url: document.location.href,
            referrer: document.referrer,
            line: line,
            column: column,
            err: err,
            cookies: document.cookie,
            userAgent: navigator.userAgent
        };
        var ajaxParams = new URLSearchParams(data);
        
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
              console.log('Error reported');
            }
          };
          
        xhttp.open("POST", "/reportJsError", true);
        xhttp.send(ajaxParams.toString());       
    }
}

window.onerror = reportError;
