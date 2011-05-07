/* ---
   Content script to change the "read later" button on Readability articles to
   save to Instapaper instead
   
   @author obeattie
   ---
*/

$(document).ready(function(){
    var originalButton = $('#read-later-button');
    var button = $('#read-later-button').clone(false).text('Save to Instapaper').replaceAll(originalButton);
    // Click handler
    button.click(function(){
        chrome.extension.sendRequest(
            {
                url: $('#article-url').attr('href'),
                title: $('#article-entry-title').text()
            },
            function(response){
                if (response.status === 403) {
                    alert('Couldn\'t save to Instapaper as your username or password is invalid');
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
