
/**
 * jQuery Paste Images
 * 
 * Helper class for listening for the paste event on the document, extracting
 * out any possible blobs that were pasted in, and then triggering a custom
 * event handler with those blobs.
 * 
 * @author  Oliver Nassar <oliver@getstencil.com>
 * @see     https://caniuse.com/#feat=clipboard
 * @see     https://ourcodeworld.com/articles/read/491/how-to-retrieve-images-from-the-clipboard-with-javascript-in-the-browser
 * @see     https://www.sitepoint.com/jquery-custom-events/
 * @note    Doesn't currently work with Safari. I believe this is related to
 *          limitations with accessing clipboardData
 * @example
 *          $(document).on({
 *              'custom/paste/images': function(event, blobs) {
 *              }
 *          });
 */
(function($) {

    /**
     * __getBlobs
     * 
     * @access  private
     * @param   jQuery event
     * @return  Array
     */
    var __getBlobs = function(event) {
        var items = event.originalEvent.clipboardData.items,
            index,
            items,
            blobs = [],
            blob;
        for (index in items) {
            item = items[index];
            if (item.kind === undefined || item.kind === null) {
                continue;
            }
            if (item.kind.toLowerCase() !== 'file') {
                continue;
            }
            if (item.getAsFile === undefined || item.getAsFile === null) {
                continue;
            }
            blob = item.getAsFile();
            if (blob === undefined || blob === null) {
                continue;
            }
            blobs.push(blob);
        }
        return blobs;
    };

    /**
     * __validBrowser
     * 
     * @access  private
     * @param   jQuery event
     * @return  Boolean
     */
    var __validBrowser = function(event) {
        var originalEvent = event.originalEvent;
        if (originalEvent === undefined || originalEvent === null) {
            return false;
        }
        var clipboardData = originalEvent.clipboardData;
        if (clipboardData === undefined || clipboardData === null) {
            return false;
        }
        var items = clipboardData.items;
        if (items === undefined || items === null) {
            return false;
        }
        return true;
    };

    /**
     * __validPaste
     * 
     * @access  private
     * @param   jQuery event
     * @return  Boolean
     */
    var __validPaste = function(event) {
        if (event.target === undefined) {
            return true;
        }
        var $target = $(event.target);
        if ($target.is('input[type="text"]') === true) {
            return false;
        }
        if ($target.is('input[type="password"]') === true) {
            return false;
        }
        if ($target.is('textarea') === true) {
            return false;
        }
        return true;
    };

    /**
     * Listen for paste on the document
     * 
     */
    $(document).on({
        'paste': function(event) {
            if (__validBrowser(event) === true) {
                if (__validPaste(event) === true) {
                    var blobs = __getBlobs(event);
                    if (blobs.length > 0) {
                        var eventType = 'custom/paste/images';
                        $(document).triggerHandler(eventType, [blobs]);
                    }
                }
            }
        }
    });
})(jQuery);
