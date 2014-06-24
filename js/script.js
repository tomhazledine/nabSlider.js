// 01. Test Alert
//02. Slide Set-up

// 01. Test Alert
//$(document).ready(function(){alert("Main JS Working");});

//02. Slide Set-up
// Our variables:
// Modes
var modeFadeIn = true;
var modeSlideOver = false;
var masterAutoplay = true;
// Elements:
var moduleWrapper = $('.slideWrapperTotal');// The container for the slider and it's controls
var slideOuter = $('.sliderOuter');// The container for just the slider
var slideInner = $('.sliderInner');// The slider inner; used for positioning when using the "Slide Over" method.
var slide = $('.slide');// The individual slides
var selectors = $('.selector');// The individual controls
var nextButton = $('.nextPrev.next');// Press this button to move to the next slide.
var prevButton = $('.nextPrev.prev');// Press this button to move to the previous slide.
// Initial values:
var totalSlides = 0;
var targetSlide = 2;
var previousSlide = 4;
var autoPlay = true;
var windowFocus = true;

// If modeSlideOver = true, set slide widths appropriately 
function setSlideWidths(slideNum){
	slideInnerWidth = 100 * slideNum;
	slideWidth = 100 / slideNum;
	slideInner.css("width",slideInnerWidth + "%");
	slide.css("width",slideWidth + "%");
}
$(document).ready(function(){
	window.totalSlides = slide.length;// Count the slides
  if(modeSlideOver === true){
    window.moduleWrapper.removeClass('fadeIn');
    window.moduleWrapper.addClass('slideOver');
	  setSlideWidths(totalSlides);// use the number-of-slides to set up the widths of the sliderInner and slides
  }else if(modeFadeIn === true){
    window.moduleWrapper.removeClass('slideOver');
    window.moduleWrapper.addClass('fadeIn');
  }
});


// Change to the slide of a given number (i)
function selectSlide(i){
  var selectorNumber = i;// Store the target slide as a variable
  if(selectorNumber > window.totalSlides ){
    selectorNumber = 1;// Reset to 1 if the target slide # is higher than the total number of slides
  }else if(selectorNumber < 1 ){
  	selectorNumber = totalSlides;// Reset to # of last slide if the target slide # is lower than the total number of slides
  }
  window.currentSelector = ".selector.number" + selectorNumber;// Find the class for the target selector button
  window.currentSlidePanel = ".slide.number" + selectorNumber;// Find the class for the target slide
  window.slideInner.attr('class',
           function(i, c){
              return c.replace(/(^|\s)positionNumber\S+/g, '');
           });//.removeClass("positionNumber");// Strip all positioning classes
  window.slideInner.addClass("positionNumber" + selectorNumber);// Add the target position class
  window.selectors.removeClass("current");// Strip "current" class from all selector buttons 
  $(currentSelector).addClass("current");// Add "current" class to target selector button
  window.slide.removeClass("current");// Strip "current" class from all slides
  $(currentSlidePanel).addClass("current");// Add "current" class to target slide
  window.currentSlide = selectorNumber;// Set the "currentSlide"
  
  window.targetSlide = currentSlide;
  window.targetSlide++;// Advance the panel counter by 1
  //if(targetSlide > 3 ){
  //  window.targetSlide = 1;
  //}
}

// onClick mechanic
$(document).ready(function(){
  window.selectors.click(function(){// When a selector is clicked...
    var theSelector = $(this).data('selector');//...find it's number...
    selectSlide(theSelector);//...and run than number through the selectSlide function
  });
});

// AUTOPLAY:
// Stop the autoplay if the browser window is not selected
window.onfocus = function(){windowFocus = true;};
window.onblur = function(){windowFocus = false;};
// Pause autoplay when hovering over panel container
moduleWrapper.hover(
  function(){window.autoPlay = false;},// Roll on
  function(){window.autoPlay = true;}// Roll off
);
// The Clock
$(document).ready(function(){
  setInterval(triggerPanelChange, 4000);
});
function triggerPanelChange(){
  if(window.autoPlay === true && window.windowFocus === true && window.masterAutoplay === true){
    //console.log(window.targetSlide);
    selectSlide(window.targetSlide);// Move the slides
    //console.log(window.targetSlide);
  }
}

// "Next" Button
$(document).ready(function(){
  window.nextButton.click(function(){
    selectSlide(window.targetSlide);// Move the panels forwards
  });
});

// "Previous" Button
$(document).ready(function(){
  window.prevButton.click(function(){
    previousSlide = window.targetSlide - 2;
    selectSlide(previousSlide);
  });
});