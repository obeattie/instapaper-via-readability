/* ---
   Background script which is allowed to make the cross-origin request to the
   Instapaper API
   
   @author obeattie
   ---
*/

var reactor = {
    _waitingForCredentials: [],
    
    openOptions: function(){
        chrome.windows.create({
            url: 'options.html?modal',
            focused: true,
            type: 'popup',
            width: 600,
            height: 300,
            left: ((screen.width / 2) - 300),
            top: 200
        });
    },
    credentialsUpdated: function(options, sender, sendResponse){
        $.each(reactor._waitingForCredentials, function(i, tabId){
            chrome.tabs.sendRequest(tabId, { method: 'save' });
        });
        reactor._waitingForCredentials = [];
        sendResponse();
    },
    save: function(options, sender, sendResponse){
        // Set the username and password
        request = options.request;
        request.username = localStorage['username'];
        request.password = localStorage['password'];
        
        // Open the options dialogue if they haven't set their username/pass
        if ((!request.username) || (!request.password)) {
            reactor._waitingForCredentials.push(sender.tab.id);
            return reactor.openOptions();
        } else {
            $.ajax({
                url: 'https://www.instapaper.com/api/add',
                dataType: 'json',
                type: 'GET',
                data: request,
                complete: sendResponse
            });
        }
    }
}

chrome.extension.onRequest.addListener(function(options, sender, sendResponse){
    console.log('Received ' + options.method, options);
    return reactor[options.method](options, sender, sendResponse);
});
