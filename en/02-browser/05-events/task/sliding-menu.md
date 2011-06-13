
# Sliding menu 

Create a menu which opens/closes on click, like this:

[iframe height=100 src="tutorial/browser/events/sliding/index.html"]

The source and images to start from are at [play src="/assets/browser/events/sliding-src"].


=Hint 1

First, the HTML/CSS structure.

The menu should be a list. The title should be a separate clickable element:
[html]
<div class="menu">
  <span class="title">Sweeties (click me)!</span>
  <ul>
    <li>Cake</li>
    <li>Donut</li>
    <li>Honey</li>
  </ul>
</div>
[/html]

Note that there is a `SPAN`, not `DIV`. That's because `DIV` tries to expand to 100% width, so the click to the right from "Sweeties" will hit it:
[html autorun height=50]
<div style="border: solid red 1px">[Click]</div>
[/html]

A `SPAN` is `display: inline` element, so it occupies exactly the text space:
[html autorun height=50]
<span style="border: solid red 1px">[Click]</span>
[/html]

Open/close should add/remove `.menu-open` class which overrides arrow and `UL` display.



=Solution


The initial CSS:

[css]
  .menu ul {
    margin: 0;
    list-style: none;
    padding-left: 20px;
    
    display: none;
  }
  
  .menu .title {
    padding-left: 16px;
    font-size: 18px;
    cursor: pointer;
    
    background: url(arrow-right.png) left center no-repeat;       
  }
[/css]

Open menu overrides:

[css]
  .menu-open .title {
    background: url(arrow-down.png) left center no-repeat; 
  }
  
  .menu-open ul {
    display: block;
  }
[/css]

You can find the full solution at [play src="/assets/browser/events/sliding"].

