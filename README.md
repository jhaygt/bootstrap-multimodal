# bootstrap-multimodal
A Bootstrap plugin that adds support for multiple stacked modals.

## Usage
Include `dist/bootstrap-multimodal.js` (or the minified version). 

### Disable for certain modals
If you need to override or prevent the behavior on certain modals, remove the listeners for the
`show.bs.modal.multimodal` and `hidden.bs.modal.multimodal` events or either return false or call `stopPropagation` on
the event.

```js
$('#my-modal').off('show.bs.modal.multimodal');
```
