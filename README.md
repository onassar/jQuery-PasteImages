# jQuery Image PasteEvent
jQuery image paste helper class to normalize how to listen for image pasting.  
Pretty straightforward: just include the JS file, and then listen for the `custom/image/paste` event.

### Example
``` javascript
$('html').on({
    'custom/image/paste': function(event, blobs) {
        console.log(blobs);
    }
});
```

### Notes
- Currently will only fire the `custom/image/paste` if there is at least one image detected as available
- Does not currently work in Safari; will update it when I figure it out, or else when Safari updates to make it possible
