/**
 * Created by Vitaly Egorov <egorov@samsonos.com> on 15.01.14.
 */
/**
 * Superpuper black backgrounded popup
 */
var sjstinybox = {
    /**
     *
     * @param handler
     */
    tinyboxAjax : function(respContainerName){
        var responseHandler = undefined;
        var beforeHandler = undefined;
        var oneClickClose = true;

        // If options object is passed
        if(typeof respContainerName === 'object')
        {
            oneClickClose = respContainerName.oneClickClose;
            responseHandler = respContainerName.responseHandler;
            beforeHandler = respContainerName.beforeHandler;
            // Get html container name
            respContainerName = respContainerName.html;
        }

        // Iterate all DOM elements in current selection
        return this.each(function(elm)
        {
            // If no response container name is specified use 'html'
            respContainerName = respContainerName ? respContainerName : 'html';

            // Bind asynchronous request on element click
            elm.ajaxClick(function(response, clickable){

                // Call beforeHandler if passed and save return value, default - true
                var beforeStatus = beforeHandler != undefined ? beforeHandler(elm) : true;

                // If we recieved html container
                if (beforeStatus && response[respContainerName] != undefined) {
                    // Call responseHandler if passed and save return value, default - true
                    var responseStatus = responseHandler != undefined ? responseHandler(elm) : true;
                    // If response handler succeded - show tiny box
                    if (responseStatus) {
                        // Create SamsonJS object
                        var form = s(response[respContainerName]);
                        // Append response to body
                        s(document.body).append(form);
                        // Show tinybox
                        var tb = tinybox(form, oneClickClose);
                    }
                }
            });
        });
    }
};

// Add plugin to SamsonJS
SamsonJS.extend(sjstinybox);