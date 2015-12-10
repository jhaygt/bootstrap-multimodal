# bootstrap-multimodal
A Bootstrap plugin that adds support for multiple open modals.

[View demo](http://www.bootply.com/cObcYInvpq)

## Install with npm
`npm install bootstrap-multimodal`

## Install with bower
`bower install bootstrap-multimodal`

## Usage
Simply include `js/multimodal.js` (or the minified version). 

That's it! You don't have to make any calls to initiate the behavior.

### Override behavior
If you need to override or prevent the behavior on certain modals, add an event listener for the `show.bs.modal` and `hidden.bs.modal` events and either return false or call `stopPropagation` on the event.

```js
$('#my-modal').on('show.bs.modal', function(e) {
    e.stopPropagation();
});

$('#my-modal').on('hidden.bs.modal', function(e) {
    e.stopPropagation();
});
```
