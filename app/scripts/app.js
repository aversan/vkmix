import $ from 'jquery';
import svg4everybody from 'svg4everybody';
import swiper from '../blocks/swiper/swiper.js';

require('../blocks/img-comparision/img-comparision.js');
require('../blocks/uk-core/uk-core.js');
require('../blocks/uk-parallax/uk-parallax.js');

function initShares() {
    var buttons = $('.jsShareButton');
    buttons.each(function(i, button) {
        button = $(button);
        button.click(function() {
            var link = encodeURI(location.href);
            if(button.data('service') == 'email') {
                window.location.href = "mailto:?"
                    + 'subject=' + escape('New Google Play')
                    + '&body=' + 'Hi, check out this project - http://googleplay.flatata.com. I hope it will help you with your projects.';
            }   else {
                var tLink = encodeURI(link),
                    title = '',
                    description = '',
                    image = '',
                    meta = $('meta');
                if (button.hasClass('screenShare')) {
                    var screen = button.closest('.screen');
                    title = screen.find('.title').find('> span').html();
                    description = meta.filter('[property="og:description"]').data('origin');
                    //description = 'Additional screen of ' + title;
                    image = location.origin + screen.find('.' + (['spectre', 'got', 'netflix', 'myBooks'].indexOf(screen.data('screen')) >= 0 ? 'imageRegular' : 'imageCover')).find('.image[data-type]').attr('src');
                }   else {
                    title = meta.filter('[property="og:title"]').data('origin');
                    description = meta.filter('[property="og:description"]').data('origin');
                    image = meta.filter('[property="og:image"]').data('origin');
                }
                switch(button.data('service')) {
                    case 'facebook':
                        tLink = "http://www.facebook.com/sharer.php?s=100&u=" + tLink + '&title=' + title + '&description=' + description;
                        break;
                    case 'twitter':
                        tLink = "http://www.twitter.com/share?url=" + tLink;// + '&text=' + description;
                        break;
                    case 'pinterest':
                        tLink = "http://pinterest.com/pin/create/button/?url=" + tLink + '&media=' + image + '&description=' + description;
                        break;
                    case 'google':
                        tLink = "https://plus.google.com/share?url=" + tLink;
                        break;
                    default:
                        return false;
                        break;
                }
                var page = window.open(tLink,"displayWindow","width=520,height=300,left=350,top=170,status=no,toolbar=no,menubar=no");
                var interval = window.setInterval(function() {
                    try {
                        if (page == null || page['closed']) {
                            window.clearInterval(interval);
                            if (!button.hasClass('screenShare'))
                                addLike(button.data('service'));
                            else
                                addLike(button.data('service'), button.closest('[data-content]').data('content'), button.closest('.screen').data('screen'));
                        }
                    }
                    catch (e) {
                    }
                }, 1000);
            }
            return false;
        });
    })
}

$(() => {
	svg4everybody();
	initShares();

    var swiperSectionInfo = swiper('.section--info .swiper-container--section', {
        prevButton: '.section--info .swiper-button-prev',
        nextButton: '.section--info .swiper-button-next',
        slidesPerView: 'auto',
        spaceBetween: 30,
        centeredSlides: true,
        slideToClickedSlide: true
    });
});
