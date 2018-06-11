
/**
 * jQuery Paste Helper Class
 * 
 * @author  Oliver Nassar <onassar@gmail.com>
 * @see     https://caniuse.com/#feat=clipboard
 * @see     https://ourcodeworld.com/articles/read/491/how-to-retrieve-images-from-the-clipboard-with-javascript-in-the-browser
 * @see     https://www.sitepoint.com/jquery-custom-events/
 * @note    Doesn't currently work with Safari. I believe this is related to
 *          limitations with accessing clipboardData
 * @example
 *          $('html').on({
 *              'custom/paste': function(event, blobs) {
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
            if (item.kind === undefined) {
                continue;
            }
            if (item.kind.toLowerCase() !== 'file') {
                continue;
            }
            if (item.getAsFile === undefined) {
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
     * Listen for paste on html document
     * 
     */
    $('html').on({
        'paste': function(event) {
            if (__validPaste(event) === true) {
                var blobs = __getBlobs(event);
                if (blobs.length > 0) {
                    $(this).triggerHandler('custom/image/paste', [blobs]);
                }
            }
        }
    });
})(jQuery);
