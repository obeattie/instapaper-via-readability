/* ---
   Content script to change the "read later" button on Readability articles to
   save to Instapaper instead
   
   @author obeattie
   ---
*/

$(document).ready(function(){
    // Hide the sign up form
    $('#legacy-bkmk').remove();
    // Create a new button replacing the old one
    var originalButton = $('#read-later-button');
    var button = $('#read-later-button').clone(false).text('Save to Instapaper').replaceAll(originalButton);
    // Click handler
    button.click(function(){
        chrome.extension.sendRequest({
            method: 'save',
            request: {
                url: $('#article-url').attr('href'),
                title: $('#article-entry-title').text()
            }},
            function(response){
                if (response.status === 403) {
                    alert('Couldn\'t save to Instapaper: your username or password is invalid');
                    chrome.extension.sendRequest({
                        method: 'openOptions'
                    });
                } else if (response.status !== 201) {
                    alert('An error occured while saving to Instapaper');
                } else {
                    button.text('Saved!').unbind('click').css({
                        opacity: .75,
                        cursor: 'default'
                    });
                }
            }
        );
        return false;
    });
});
