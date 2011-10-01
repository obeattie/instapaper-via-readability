$(document).ready(function(){
    $('#throbber').hide();
    
    var username = localStorage['username'] || '',
        password = localStorage['password'] || '';
    
    $('#username').val(username);
    $('#password').val(password);
    
    $('form').submit(function(){
        $('#success, #error').hide();
        $('#throbber').show();
        localStorage['username'] = $('#username').val();
        localStorage['password'] = $('#password').val();
        // Validate the username and password
        $.ajax({
            url: 'https://www.instapaper.com/api/authenticate',
            data: {
                username: localStorage['username'],
                password: localStorage['password']
            },
            complete: function(){
                $('#throbber').hide();
            },
            error: function(response){
                var text;
                if (response.status === 403){
                    text = 'Your username and password are invalid'
                } else {
                    text = 'An error occured checking your username and password; please try again'
                }
                $('#error').text(text).show();
            },
            success: function(){
                $('#success').show().delay(2000).fadeOut(75);
                if (window.location.search === '?modal') {
                    // This is a popup options window that was opened from a save attempt; close the window,
                    // and call back to the background view
                    chrome.extension.sendRequest({ method: 'credentialsUpdated' }, function(){
                        window.setTimeout(function(){
                            chrome.windows.getCurrent(function(w){
                                chrome.windows.remove(w.id);
                            });
                        }, 2075);
                    });
                }
            }
        });
        return false;
    });
});
