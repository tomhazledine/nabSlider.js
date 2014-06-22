// 01. Test Alert
//02. Slide Set-up

// 01. Test Alert
//$(document).ready(function(){alert("Main JS Working");});

//02. Slide Set-up
// Our variables:
// Elements:
var moduleWrapper = $('.slideWrapperTotal');
var slideOuter = $('.sliderOuter');
var slideInner = $('.sliderInner');
var slide = $('.slide');
var selectors = $('.selector');
var nextButton = $('.nextPrev.next');
var prevButton = $('.nextPrev.prev');
// Initial values:
var totalSlides = 0;
var targetSlide = 2;
var autoPlay = true;
var windowFocus = true;
// Modes
var modeFadeIn = true;
var modeSlideOver = false;

// If modeSlideOver = true, set slide widths appropriately 
function setSlideWidths(slideNum){
	slideInnerWidth = 100 * slideNum;
	slideWidth = 100 / slideNum;
	slideInner.css("width",slideInnerWidth + "%");
	slide.css("width",slideWidth + "%");
}
$(document).ready(function(){
	window.totalSlides = slide.length;// Count the slides
  if(modeSlideOver == true){
	  setSlideWidths(totalSlides);// use the number-of-slides to set up the widths of the sliderInner and slides
  }});

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

var ctr = 0;
function triggerPanelChange(){
  //console.log(window.ctr);
  //window.ctr++;
  //console.log(window.targetSlide);
  //window.targetSlide++;

  if(autoPlay === true && window.windowFocus === true){
    console.log(window.targetSlide);
    selectSlide(window.targetSlide);// Move the panels
    //window.targetSlide++;
    console.log(window.targetSlide);
  }
}