/*
 * Bootstrap multi modal support
 * https://github.com/aleho/bootstrap-multimodal
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Originally based on https://github.com/jhaygt/bootstrap-multimodal by jhaygt.
 */
(function ($, window) {
    var BASE_ZINDEX       = 1040;
    var ZINDEX_MULTIPLIER = 20;
    var ZINDEX_MODAL      = 10;

    var modalsCount = 0;
    var $firstModal = null;


    /**
     * Makes sure the expected body adjustments are made after closing a modal.
     */
    function resetBodyAdjustments() {
        if (modalsCount > 0) {
            $(document.body).addClass('modal-open');
        }
    }

    /**
     * Hides any extra backdrops created by bootstrap and arranges the first one to always be below the top modal.
     */
    function adjustBackdrops() {
        var modalIndex = modalsCount - 1;

        $('.modal-backdrop').not(':first').addClass('hidden');
        $('.modal-backdrop:first').css('z-index', BASE_ZINDEX + (modalIndex * ZINDEX_MULTIPLIER));
    }

    /**
     * Moves a modal to the front.
     *
     * @param $modal
     */
    function adjustModal($modal) {
        if (!$firstModal || modalsCount == 1) {
            $firstModal = $modal;
        }

        var modal = $modal.data('bs.modal');

        // monkey patch hide for resetting of counts
        var orgHide = modal.hide;
        modal.hide = function (event) {
            l.l('monkey hide', modal.isShown, event.isDefaultPrevented())
            var didHide = (modal.isShown && !event.isDefaultPrevented());
            orgHide.apply(modal, arguments);

            if (didHide) {
                l.l('count', modalsCount)
                modalsCount--;
                adjustBackdrops();
                resetBodyAdjustments();
            }
        };


        if (modalsCount == 1) {
            return;
        }

        var modalIndex = modalsCount - 1;
        $modal.css('z-index', BASE_ZINDEX + (modalIndex * ZINDEX_MULTIPLIER) + ZINDEX_MODAL);


        var firstModal         = $firstModal.data('bs.modal');
        var bodyIsOverflowing  = firstModal.bodyIsOverflowing;
        var scrollbarWidth     = firstModal.scrollbarWidth;
        var modalIsOverflowing = $modal[0].scrollHeight > document.documentElement.clientHeight;


        // monkey patch adjustDialog for multiple modals
        modal.adjustDialog = function () {
            // make sure paddings are set correctly according to first modal's determination of paddings
            $modal.css({
                paddingLeft:  !bodyIsOverflowing && modalIsOverflowing ? scrollbarWidth : '',
                paddingRight: bodyIsOverflowing && !modalIsOverflowing ? scrollbarWidth : ''
            });
        };


        // monkey patch backdrop for positional adjustments
        var orgBackdrop = modal.backdrop;
        modal.backdrop = function () {
            l.l('monkey backdrop')
            orgBackdrop.apply(modal, arguments);
            adjustBackdrops();
        };
    }


    /**
     * Bootstrap triggers the show event at the beginning of the show function and before
     * the modal backdrop element has been created.
     *
     * The additional event listener allows bootstrap to complete show, after which the modal backdrop will have been
     * created and appended to the DOM.
     *
     * @param event
     */
    function onShow(event) {
        if (event.isDefaultPrevented()) {
            return;
        }

        modalsCount++;

        adjustModal($(event.target));
    }


    $(document).on('show.bs.modal.multimodal', function (event) {
        onShow(event);
    });
}(jQuery, window));
