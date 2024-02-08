# Weekly Nerd

This document will document all the speakers from the Weekly Nerd and a collection of all the things they've taught me.
<br>
The weekly nerds are inspiring people who really know what they're doing within their field. These people come here to teach us about the things they think are important for our future as web developers.

## Week 1

<details>
  <summary>Kilian Valkhof</summary>
  <h2>07/02/2024</h2>

  ### Stop using JS for that
  Kilian Valkhof is the creator of Polypane, a browser specifically made for developers. It contains multiple amazing features for the people that design the web. He was the first person to do the Weekly nerd for us. He started things off expaining a bit about himself and then he started showing us multiple things you can do with css these days. There were a lot of things i never knew or knew little about. This really fascinated me to the point where i sat throught the whole 2 hours of lecture without even thinking about it. I believe these types of lessons should be given more at this school.


<details>
    <summary>Some of the things he talked about was:</summary>

#### Intro

At the start he explained that you should only use the least powerful tool to get what you want. Meaning that if something can be done in css, dont use js for it.

#### Accesibility

For accesibility he talked about the :focus-visible sub-class. and using outline-color: transparent; instead of outline: none;

#### Input Switch

Kilian talked about the Switch attribute that only safari users can see. It works like a checkbox that you can make look like a switch
This is done in the browser so its faster and lighter.

``` html
<input type="checkbox" switch/>
```

#### Details / Summary

Details / Summary's are things i never knew existed and would have made my life a lot easier had i known about them before. It's basically an easy way to make a dropdown that you can style a bit.

``` html
<details>
    <summary>This is the title</summary>
    <p>This text is only seen when you have clicked the summary.</p>
</details>
```

#### Dialog

The Dialog element is a new way to make modal popup's. It works better than regular javascript modal's since the javascript in the background can keep running with the dialog element.

``` html
<dialog>
    <form>
        <h1>Titel of modal</h1>
        <button type="submit">Continue button</button>
    </form>
</dialog>
```

#### Container Queries

Container Queries is something i already knew before this lecture. you can use them to manipulate elements based on the width of another element.
<br>
In essence its just like a Media Query for elements instead of screen width

``` css

.post {
  container-type: inline-size;
}

/* Default heading styles for the card title */
.card h2 {
  font-size: 1em;
}

/* If the container is larger than 700px */
@container (min-width: 700px) {
  .card h2 {
    font-size: 2em;
  }
}

```

#### :has

:has is the most promising thing we talked about in my opinion, This pseudo element can be described as the If - else of css. You can use it to check another element for something.
<br>
In this code snippet below it is explained roughly, You can check if an elemant has a pseudoclass or a class or anything you can check in css. And do something to target element when it does.
<br>
You can also use it to check an element's children and do something when they do. So now you don't need javascript to check things like that anymore

``` css
.element:has(#element:checked) targetelement {
  margin-bottom: 0;
}

h1:has(+ p) {
  margin-bottom: 0;
}

```

#### Field sizing

Field sizing is quite simple. Its used to make the input and textfield elements scale according to the text that is input into it.

``` css
input {
  field-sizing: content;
}
```

#### Masonry Layout

Masonry layout is as of now a part of the grid type. You can make elements automatically fit into a masonry layout using this.

``` css
.container {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  grid-template-rows: masonry;
}
```


#### Selectlist

A selectlist is a new element that as of now only works in chrome experimental mode. In essence it's just a dropdown element.

``` html
<selectlist>
    <option>
    <option>
    <option>
</selectlist>
```


#### Scroll-driven-animations

The last thing we talked about was Scroll-driven-animations. These are animations that are connected to your scroll position, You can use them to for example make a carousel work easier with less javascript.


``` css
@keyframes spin {
  to {
    transform: rotateY(5turn);
  }
}

@media (prefers-reduced-motion: no-preference) {
  div {
    animation: spin 5s ease infinite;
  }
}

/* ------------------------------------------------------- */

@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: scroll()) {
    div {
      animation: spin linear both;
      animation-timeline: scroll();
    } 
  }
}
```

</details>
<br>
<details>
    <summary>Summary</summary>

#### Quick summary
A quick summary would be that technology is ever improving, So you shouldn't get stuck in old habits, when there are new ways of doing it better. Like kilian said: 
> Once you learn something, You won't learn it again. - Kilian Valkhof

#### My use of this lecture
There are already some things i have implemented from this lecture. Like the details and summary. But i plan on using a lot more i learned in this lecture. I believe keeping up to date with the latest in html css and javascript is important to all developers.

</details>

</details>

## Week 2

<details>
    <summary>Spreker 2</summary>
</details>