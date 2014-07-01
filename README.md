# NAB Slider.js

## “Not another bloody slider...”

### A lightweight slider with controls and optional autoplay.

All the heavy lifting is done using some simple CSS/SASS, so **NAB Slider.js** is fully responisive and customizable right out of the box. All the jQuery does is add and remove the classes that trigger the CSS magic.

* Version 1.0
* Copyright 2014, [Tom Hazledine](http://thomashazledine.com)

---

## Dependancies

* jQuery
* nothing else.

---

## Usage

### Installation

Make sure you include jQuery, the **nabSlider** plugin, and your own scripts file (in that order):

    <script src='js/jquery-1.9.1.min.js'></script>
    <script src='js/jquery.nabSlider.min.js'></script>
    <script src="js/script.js"></script>

### The Basic Set-up

Any slider on the page needs a wrapper element with a unique class/id.

Within that wrapper there need to be two things:
the slider itself, which sits within two divs – a `sliderOuter` and `sliderInner` – and the controls for operating the slider, which can go anywhere you like providing it's within the overall wrapper. I put my buttons inside a `selectors` element.

    <section class="uniqueSliderName">

      <div class="sliderOuter">
        <div class="sliderInner">
          // The slide content goes here
        </div>
      </div>
  
      <div class="selectors">
        // The slider selector-buttons go here
      </div>

    </div>

### The Slides

The slides themselves, which are the things we want to switch between, can be anything you like. I use an `article` element because, hey, semantics! But you can use any `html` element you like.

This important thing is that whatever kind of element you choose, you give it the following classes: `slide` (so the plugin knows it's a slide) and `numberX` (eg `number1` for the first slide, `number2` for the second, you get the idea...).

It must also have `data-selector` attribute that is the same as the slide number. For example, `data-selector="2"` for the slide with the class `number2`.

So in a slider that switches between three slides, you might see this:

    <article class="slide number1" data-selector="1">
      // Slide content goes here
    </article>

    <article class="slide number2" data-selector="2">
      // Slide content goes here
    </article>

    <article class="slide number3" data-selector="3">
      // Slide content goes here
    </article>

### The Buttons

For the slider to be useful, we need some way to control it. nabSlider has three methods for controlling the slider that can be used all together or in isolation:

* direct slide buttons: clicking one of these takes you straight to the relevant slide.
* next and previous buttons: move you to the next or previous slide.
* autoplay: automatically rotates to the next slide after a given time period (4 seconds, by default)

These methods can be used independently or in any combination. We'll come to the autoplay feature later, but the buttons are quite straightforward. I like to use `button` elements, but you can use any kind of element you like, provided you can give it the relevant classes.

### Direct Slide Buttons

These buttons navigate directly to the corresponding slide. This is done by applying matching `numberX` classes and `data-selector="X"` attributes.

The controls for a three-slide slider would look something like this:

    <button class="selector number1" data-selector="1">
      // Button content, if you want any, goes here
    </button>
    <button class="selector number2" data-selector="2">
      // Button content, if you want any, goes here
    </button>
    <button class="selector number3" data-selector="3">
      // Button content, if you want any, goes here
    </button>


--- 

## License

Released under the [DBAD license](http://www.dbad-license.org)

