/* ---
   Background script which is allowed to make the cross-origin request to the
   Instapaper API
   
   @author obeattie
   ---
*/

chrome.extension.onRequest.addListener(
    function(options, sender, sendResponse){
        if (options.method === 'openOptions') {
            chrome.tabs.create({
                url: 'options.html'
            });
        } else if (options.method === 'save') {
            request = options.request;
            // Set the username and password
            request.username = localStorage['username'];
            request.password = localStorage['password'];
            
            $.ajax({
                url: 'https://www.instapaper.com/api/add',
                dataType: 'json',
                type: 'GET',
                data: request,
                complete: sendResponse
            });
        }
    }
);
