$(function () {

  var $comparison = $('.js-comparision');

  var setSizes = function () {
    var $container = $comparison.children('.img-comparision__container');
    var $img2 = $container.children('img');
    var $resizeContainer = $container.children('.img-comparision__resize-image');
    var $img1 = $resizeContainer.find('img');

    var bottom_space = 0;

    var ratio = 0.66666;
    var width = $(window).width();//1280
    var height = $(window).height() - bottom_space;

    if ((height / width) > ratio) {
      height = width * ratio;
    } else {
      width = height * (1 / ratio);
    }

    $img2.width(width + 'px').height(height + 'px');
    $img1.width(width + 'px').height(height + 'px');
    $container.width(width + 'px').height(height + 'px');
    $comparison.width(width + 'px').height(height + 'px');
  };

  //setSizes();

  //$(window).resize(setSizes);

  $comparison.on('mousedown.comparision vmousedown.comparision init.comparision', function (e) {
    if (isLinkClick) {
      isLinkClick = false;
      return;
    }
    //e.preventDefault();
    var $body = $('body');
    var $comparision = $(this);
    var $wrapper = $comparision.parent('.img-comparision-wrapper');
    var $prev = $wrapper.find('.previous');
    var $next = $wrapper.find('.next');
    var $separator = $comparision.find('.img-comparision__handle');
    var $resizeImg = $comparision.find('.img-comparision__resize-image');

    var dragWidth = $separator.outerWidth();
    var halfDragWidth = dragWidth / 2;
    var containerOffset = $comparision.offset().left;
    var containerWidth = $comparision.outerWidth();
    var minLeft = containerOffset;
    var maxLeft = containerOffset + containerWidth;

    var moveSeparator = function (leftValue, force = false) {
      var widthValue = (leftValue - containerOffset) * 100 / containerWidth + '%';
      var widthValueDragElem = (leftValue - containerOffset - halfDragWidth) * 100 / containerWidth + '%';

      if (!!force || $comparision.hasClass('js-active')) {
        $separator.css('left', widthValueDragElem);
        $resizeImg.css('width', widthValue);
      }
    };

    $prev.add($next).addClass('clickable');

    $prev.on('click', function(){
      moveSeparator(minLeft, true);
    });

    $next.on('click', function(){
      moveSeparator(maxLeft, true);
    });

    $comparision.addClass('js-active');

    moveSeparator(e.pageX);

    $body
      .on('mousemove.comparision vmousemove.comparision', function (e) {
        var leftValue = e.pageX;

        //constrain the draggable element to move inside its container
        if (leftValue < minLeft) {
          leftValue = minLeft;
        } else if (leftValue > maxLeft) {
          leftValue = maxLeft;
        }

        moveSeparator(leftValue);

        $body.on('mouseup.comparision vmouseup.comparision', function (e) {
          $body.off('mousemove.comparision vmousemove.comparision mouseup.comparision vmouseup.comparision');
        });
      });

    $body.on('mouseup.comparision vmouseup.comparision', function (e) {
      $comparision.removeClass('js-active');
    })
  }).trigger('init.comparision').removeClass('js-active');

  $('body').on('mouseleave.comparision', function (e) {
    $(this).off('mousemove.comparision vmousemove.comparision mouseup.comparision vmouseup.comparision');
    $comparison.removeClass('js-active');
  })

  var isLinkClick = false;
});
