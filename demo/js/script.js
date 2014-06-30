// 01. Test Alert
// 02. Slider Plugin
// 03. Instantiating the plugin

// 01. Test Alert
//$(document).ready(function(){alert("Main JS Working");});

// 02. Slider Plugin
(function($){
  $.fn.tfhSlider = function(mode,autoplay){

    // Our variables:
    // Modes
    var transitionMode = mode;// 'fadeIn'/'slideOver'
    var modeFadeIn = true;
    var modeSlideOver = false;
    var masterAutoplay = autoplay;// true/false
    // Elements:
    var moduleWrapper = this;// The container for the slider and it's controls
    var slideOuter = this.find('.sliderOuter');// The container for just the slider
    var slideInner = this.find('.sliderInner');// The slider inner; used for positioning when using the "Slide Over" method.
    var slide = this.find('.slide');// The individual slides
    var selectors = this.find('.selector');// The individual controls
    var nextButton = this.find('.nextPrev.next');// Press this button to move to the next slide.
    var prevButton = this.find('.nextPrev.prev');// Press this button to move to the previous slide.
    // Initial values:
    var totalSlides = 0;
    var targetSlide = 2;
    var previousSlide;
    var autoPlay = true;
    var windowFocus = true;

    // Initial set-up.
    function setSlideWidths(slideNum){
      slideInnerWidth = 100 * slideNum;
      slideWidth = 100 / slideNum;
      slideInner.css("width",slideInnerWidth + "%");
      slide.css("width",slideWidth + "%");
    }
    totalSlides = slide.length;// Count the slides
    if(transitionMode === 'slideOver'){
      console.log('Mode = Slide!')
      moduleWrapper.removeClass('fadeIn');
      moduleWrapper.addClass('slideOver');
      setSlideWidths(totalSlides);// use the number-of-slides to set up the widths of the sliderInner and slides
    }else if(transitionMode === 'fadeIn'){
      console.log('Mode = Fade!')
      moduleWrapper.removeClass('slideOver');
      moduleWrapper.addClass('fadeIn');
    }

    // Change to the slide of a given number (i)
    function selectSlide(i){
      var selectorNumber = i;// Store the target slide as a variable
      if(selectorNumber > totalSlides ){
        selectorNumber = 1;// Reset to 1 if the target slide # is higher than the total number of slides
      }else if(selectorNumber < 1 ){
        selectorNumber = totalSlides;// Reset to # of last slide if the target slide # is lower than the total number of slides
      }
      currentSelector = ".selector.number" + selectorNumber;// Find the class for the target selector button
      currentSlidePanel = ".slide.number" + selectorNumber;// Find the class for the target slide
      slideInner.attr('class',
               function(i, c){
                  return c.replace(/(^|\s)positionNumber\S+/g, '');
               });//.removeClass("positionNumber");// Strip all positioning classes
      slideInner.addClass("positionNumber" + selectorNumber);// Add the target position class
      selectors.removeClass("current");// Strip "current" class from all selector buttons 
      moduleWrapper.find(currentSelector).addClass("current");// Add "current" class to target selector button
      slide.removeClass("current");// Strip "current" class from all slides
      moduleWrapper.find(currentSlidePanel).addClass("current");// Add "current" class to target slide
      currentSlide = selectorNumber;// Set the "currentSlide"
      
      targetSlide = currentSlide;
      targetSlide++;// Advance the panel counter by 1
    }

    // onClick mechanic
    selectors.click(function(){// When a selector is clicked...
      var theSelector = $(this).data('selector');//...find it's number...
      //console.log(theSelector);
      selectSlide(theSelector);//...and run than number through the selectSlide function
    });
    // "Next" Button
    nextButton.click(function(){
      selectSlide(targetSlide);// Move the panels forwards
    });
    // "Previous" Button
    prevButton.click(function(){
      previousSlide = targetSlide - 2;
      selectSlide(previousSlide);
    });


    // AUTOPLAY:
    // Stop the autoplay if the browser window is not selected
    window.onfocus = function(){windowFocus = true;};
    window.onblur = function(){windowFocus = false;};
    // Pause autoplay when hovering over panel container
    moduleWrapper.hover(
      function(){autoPlay = false;},// Roll on
      function(){autoPlay = true;}// Roll off
    );
    // The Clock
    function triggerPanelChange(){
      if(autoPlay === true && windowFocus === true && masterAutoplay === true){
        selectSlide(targetSlide);// Move the slides
      }
    }
    setInterval(triggerPanelChange, 4000);

    return this;// Makes the plugin chainable
  };
}(jQuery));

// 03. Instantiating the plugin
$('.slideWrapperTotal').tfhSlider('fadeIn',true);
$('.secondSlideWrapperTotal').tfhSlider('slideOver',true);

//*/
/*!
* NAB Slider 1.0
* 
* “Not another bloody slider...”
*
* Copyright 2014, Tom Hazledine
* Released under the DBAD license - http://www.dbad-license.org/
*/

(function($){
  $.fn.tfhSlider = function(mode,autoplay){

    // Our variables:
    // Options
    var transitionMode = mode;// 'fadeIn'/'slideOver'
    var modeFadeIn = true;
    var modeSlideOver = false;
    var masterAutoplay = autoplay;// true/false
    // Elements:
    var moduleWrapper = this;// The container for the slider and it's controls
    var slideOuter = this.find('.sliderOuter');// The container for just the slider
    var slideInner = this.find('.sliderInner');// The slider inner; used for positioning when using the "Slide Over" method.
    var slide = this.find('.slide');// The individual slides
    var selectors = this.find('.selector');// The individual controls
    var nextButton = this.find('.nextPrev.next');// Press this button to move to the next slide.
    var prevButton = this.find('.nextPrev.prev');// Press this button to move to the previous slide.
    // Initial values:
    var totalSlides = 0;
    var targetSlide = 2;
    var previousSlide;
    var autoPlay = true;
    var windowFocus = true;

    // Initial set-up.
    function setSlideWidths(slideNum){
      slideInnerWidth = 100 * slideNum;
      slideWidth = 100 / slideNum;
      slideInner.css("width",slideInnerWidth + "%");
      slide.css("width",slideWidth + "%");
    }
    totalSlides = slide.length;// Count the slides
    if(transitionMode === 'slideOver'){
      console.log('Mode = Slide!')
      moduleWrapper.removeClass('fadeIn');
      moduleWrapper.addClass('slideOver');
      setSlideWidths(totalSlides);// use the number-of-slides to set up the widths of the sliderInner and slides
    }else if(transitionMode === 'fadeIn'){
      console.log('Mode = Fade!')
      moduleWrapper.removeClass('slideOver');
      moduleWrapper.addClass('fadeIn');
    }

    // Change to the slide of a given number (i)
    function selectSlide(i){
      var selectorNumber = i;// Store the target slide as a variable
      if(selectorNumber > totalSlides ){
        selectorNumber = 1;// Reset to 1 if the target slide # is higher than the total number of slides
      }else if(selectorNumber < 1 ){
        selectorNumber = totalSlides;// Reset to # of last slide if the target slide # is lower than the total number of slides
      }
      currentSelector = ".selector.number" + selectorNumber;// Find the class for the target selector button
      currentSlidePanel = ".slide.number" + selectorNumber;// Find the class for the target slide
      slideInner.attr('class',
               function(i, c){
                  return c.replace(/(^|\s)positionNumber\S+/g, '');
               });//.removeClass("positionNumber");// Strip all positioning classes
      slideInner.addClass("positionNumber" + selectorNumber);// Add the target position class
      selectors.removeClass("current");// Strip "current" class from all selector buttons 
      moduleWrapper.find(currentSelector).addClass("current");// Add "current" class to target selector button
      slide.removeClass("current");// Strip "current" class from all slides
      moduleWrapper.find(currentSlidePanel).addClass("current");// Add "current" class to target slide
      currentSlide = selectorNumber;// Set the "currentSlide"
      
      targetSlide = currentSlide;
      targetSlide++;// Advance the panel counter by 1
    }

    // onClick mechanic
    selectors.click(function(){// When a selector is clicked...
      var theSelector = $(this).data('selector');//...find it's number...
      //console.log(theSelector);
      selectSlide(theSelector);//...and run than number through the selectSlide function
    });
    // "Next" Button
    nextButton.click(function(){
      selectSlide(targetSlide);// Move the panels forwards
    });
    // "Previous" Button
    prevButton.click(function(){
      previousSlide = targetSlide - 2;
      selectSlide(previousSlide);
    });


    // AUTOPLAY:
    // Stop the autoplay if the browser window is not selected
    window.onfocus = function(){windowFocus = true;};
    window.onblur = function(){windowFocus = false;};
    // Pause autoplay when hovering over panel container
    moduleWrapper.hover(
      function(){autoPlay = false;},// Roll on
      function(){autoPlay = true;}// Roll off
    );
    // The Clock
    function triggerPanelChange(){
      if(autoPlay === true && windowFocus === true && masterAutoplay === true){
        selectSlide(targetSlide);// Move the slides
      }
    }
    setInterval(triggerPanelChange, 4000);

    return this;// Makes the plugin chainable
  };
}(jQuery));