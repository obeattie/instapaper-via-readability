$(document).ready(function(){
    var username = localStorage['username'] || '',
        password = localStorage['password'] || '';
    
    $('#username').val(username);
    $('#password').val(password);
    
    $('form').submit(function(){
        $('#success, #error, #throbber').hide();
        localStorage['username'] = $('#username').val();
        localStorage['password'] = $('#password').val();
        $('#error, #throbber').hide();
        $('#success').show().delay(2000).fadeOut(75);
        return false;
    });
});
