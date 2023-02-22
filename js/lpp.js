$(document).ready(function() {
  console.log('page ready');

  isVisible = false;
  con = document.getElementById('dash');
  runTime = 0;
  runWords = 0;
  moveTime = 0;
  headerImg = document.getElementById('header-bg-img-full');


  if ($('.header').hasClass('header-big')) {
    if (window.matchMedia('(max-width: 768px)').matches) {
      console.log('mobile');
      letsBlink = setInterval(blinker, 400);
      setTimeout(function() {
        clearInterval(letsBlink);
        consoleText(['Legal research that tackles the world’s most pressing problems'], 'text', ['white'], 87, 70)
      }, 1400);
    } else {
      if ($(window).height() < 800) {
        document.getElementById('header-stage').style.height = $(window).height() - 40 + 'px';
        document.getElementById('header-bg').style.height = $(window).height() - 40 + 'px';
      }
      console.log('desktop');
      letsBlink = setInterval(blinker, 400);
      setTimeout(function() {
        clearInterval(letsBlink);
        consoleText(['Legal research that tackles the world’s most pressing problems'], 'text', ['white'], 97, 40)
      }, 1400);
    }

  };

  // Select all links with hashes -- SMOOTH SCROLL ON PAGE ANCHOR
  $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          // If scroll to with top margin wanted
          // targetMargin = (target.offset().top - 40);

          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000, function() {
            // Callback after animation
            // Must change focus!
            var $target = $(target);
            $target.focus();
            window.location.hash = target.attr('id');
            // if ($target.is(":focus")) { // Checking if the target was focused
            //   return false;
            // } else {
            //   $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            //   $target.focus(); // Set focus again
            // };
          });
        }
      }
    });

  $('.link-back').click(function(e) {
    // prevent default behavior
    e.preventDefault();
    // Go back 1 page
    window.history.back();
    // can also use
    // window.history.go(-1);
  });


  $('.header-burger').click(function() {
    console.log('asd');
    $('#mobile-navigation').toggleClass('hidden');

    // add listener to disable scroll
    window.addEventListener('scroll', noScroll);
  });

  $('.navigation-burger').click(function() {
    console.log('dsa');
    $('#mobile-navigation').toggleClass('hidden');
    // Remove listener to re-enable scroll
    window.removeEventListener('scroll', noScroll);
  });

  function noScroll() {
    window.scrollTo(0, 0);
  }

  function consoleText(words, id, colors, runWords, moveTime) {
    if (colors === undefined) colors = ['#fff'];
    var letterCount = 1;
    var x = 1;
    var waiting = false;
    var target = document.getElementById(id)
    target.setAttribute('style', 'color:' + colors[0]);

    oneTime();

    function oneTime() {
      letsMove = setInterval(textRoll, moveTime);
      letsBlink = setInterval(blinker, 400);

      function textRoll() {
        if (runTime >= runWords) {
          clearInterval(letsMove);
        } else {
          runTime++;
          if (letterCount === 14 && waiting === false) {
            waiting = true;
            target.innerHTML = words[0].substring(0, letterCount)
            window.setTimeout(function() {
              var usedColor = colors.shift();
              colors.push(usedColor);
              var usedWord = words.shift();
              words.push(usedWord);
              x = 1;
              target.setAttribute('style', 'color:' + colors[0]);
              letterCount += x;
              waiting = false;
            }, 1400)
          } else if (letterCount === words[0].length + 1 && waiting === false) {
            waiting = true;
            // window.setTimeout(function() {
            //   x = -1;
            //   letterCount += x;
            //   waiting = false;
            // }, 800)
          } else if (waiting === false) {
            target.innerHTML = words[0].substring(0, letterCount);
            letterCount += x;
          }
        }
      }
    }

  }

  function blinker() {

    if (isVisible === true) {
      con.className = 'underscore underscore-hidden'
      isVisible = false;
    } else {
      con.className = 'underscore'
      isVisible = true;
    }
  }

  $(window).on('load', function() {
    console.log('page loaded');

    $('header-reveal').imagesLoaded()
      .done(function(instance) {
        console.log(headerImg.currentSrc + ' image successfully loaded');
        $('#header-reveal').removeClass('replace');
      });


    if (window.location.hash) {
      elemInPage = $('#' + window.location.hash.replace('#', ''));

      $('html, body').animate({
        scrollTop: elemInPage.offset().top
      }, 1000, function() {
        // Callback after animation
        // Must change focus!
        var elemInPage = $(elemInPage);
        elemInPage.focus();
        // if (elemInPage.is(":focus")) { // Checking if the target was focused
        //   return false;
        // } else {
        //   elemInPage.attr('tabindex','-1'); // Adding tabindex for elements not focusable
        //   elemInPage.focus(); // Set focus again
        // };
      });
    }
  });

});
