# Web App From Scratch @cmda-minor-web 2023 - 2024

In this document i will document the state of my code and the things i walked into when creating my webapp. I will be using screenshots to document the things my code does and wants to do.

## Code report


### Spawn Animals

<details>
<summary>addAnimal</summary>
<br>
<p>the addAnimal Function is the function that adds the animals into the screen and initialises the move function for each animal. It uses data-ids and a random number generator to get random x and y values and an custom id.
<br>
At the bottom there's a little easter egg that makes the fish die after 5 seconds since they can't live on land.</p>

``` javascript
 function addAnimal(code) {
        console.log("Create Animal");
    
        // create p element
        const newP = document.createElement("p");
    
        // Generate random number
        const randomNumberX = getRandomInt(offsetX, maxX - offsetX);
        const randomNumberY = getRandomInt(offsetY, maxY - offsetY);
        const randomNumberId = getRandomInt(1, 1000000000);
    
        newP.setAttribute("current-x", randomNumberX);
        newP.setAttribute("current-y", randomNumberY);
        newP.setAttribute("id", randomNumberId);
        newP.setAttribute("code", code);
    
        newP.classList.add("animal");
    
        // give the p element the animal code
        newP.innerHTML = `${code}`;
    
        // add the animals to the page
        main.insertBefore(newP, null);
    
        const animal = document.getElementById(randomNumberId);

        const animalX = animal.getAttribute("current-x");
        const animalY = animal.getAttribute("current-y");
    
        // Correct usage of transform property
        animal.style.transform = `translate(${animalX}px, ${animalY}px)`;

        if (code = "&#128031;" ) {
            killFish(code);
        }
    
        setTimeout(function () {
            move(randomNumberId);
        }, 100 );
    }

```

</details>


### Moving Animals

<details>
    <summary>Move Function</summary>

<p> 
The move Function is an intricate function that uses a lot of calculating to make sure the animals stay in bounds. 
<br>
The commented code at the top explains the code in the terms. This is how i invisioned it working and tried to work it out.
<br>
This function uses the data-ids i generated in the addAnimal function to find out where it is at and where it can go.
</p>

    ``` javascript
         function move(id) {
        //x
        //get current-x via dataid
       // randomnumber between (-current-x + offsetX) , (maxX - current-x) = new-x
       //move animal to that x-y
       //set new-x to current-x

        //y
        //get current-y via dataid
        // randomnumber between (-current-y + offsetY) , (maxY - current-y) = new-y
        //move animal to that x-y
        //set new-y to current-y

       //rerun movement after movement is complete. (timer?)


        const animalid = document.getElementById(id);

        if (animalid) {

            const currentX = animalid.getAttribute("current-x");
            const currentY = animalid.getAttribute("current-y");
            const timer = getRandomInt(10000, 20000);

            animalid.style.transition = `${timer}ms`;
    
            const minnrx = currentX-currentX;
            const maxnrx = maxX - currentX - offsetX;
            const minnry = currentY-currentY;
            const maxnry = maxY - currentY - offsetY ;
    
            const newX = getRandomInt(minnrx, maxnrx);
            const newY = getRandomInt(minnry, maxnry);
    
            animalid.style.transform = `translate(${newX}px, ${newY}px)`;
    
            animalid.setAttribute("current-x", newX);
            animalid.setAttribute("current-y", newY);
    
            setTimeout(function () {
                move(id);
            }, timer + 1000 );
        } else {
            console.log("Element not found or null. Cancelled.");
        }
    }
    ```

</details>

### Create Buttons

<details>
    <summary>CreateButtons Function</summary>
<br>
<p> </p>

``` javascript
     function createButton(animal, animalcode) {

            // create button
            const newButton = document.createElement("li");
            

            // create li
            const newList = document.createElement("a");

           

            // Give Href
            newList.setAttribute("href", "#");

            // put li in a
            newButton.appendChild(newList);
        
            // use innerHTML to interpret HTML entities as emojis
            newList.innerHTML = `${animalcode} ${animal} `;
        
            // add a data-id attribute to the button
            newList.setAttribute("data-id", animalcode);
        
            // change name to lowercase for the button id
            var animallowercase = animal.toLowerCase();
            var animalButton = animallowercase + "button"

            // set id of button
            newList.setAttribute('id', animalButton);

            // Add event listener
            newList.addEventListener("click", function () {
                addAnimal(animalcode);
            });
        
            // add button to buttoncontainer
            buttonContainer.insertBefore(newButton, null);
        }

            // create button for each animal in the animalCodes array
            Object.entries(animalCodes).forEach(([animal, animalCode]) => {
                createButton(animal, animalCode);
            });
```

</details>


### API 

<details>
    <summary>animalapi Function</summary>
<br>
<p> The animalapi Function fetches the data from the emoji api. It does a lot more but i will explain that in the next few function explanations so i can go a bit more in depth.  </p>

 ``` javascript

    async function animalapi() {

        const response = await fetch("https://emojihub.yurace.pro/api/all/category/animals-and-nature");
        const data = await response.json();
    
        // console log data from api
        // console.log (data);


        const animalNumbers = [4, 9, 67, 38, 1 ];
        const animalCodes = {};
        
        // maak animalCodes object met keys en value. Waar key de namen zijn en values de html codes
        animalNumbers.forEach((number) => {
            const animalName = data[number].name;
            const htmlCode = data[number].htmlCode;
            
            animalCodes[animalName] = htmlCode;
        });
        
        // Console animalcodes object
        // console.log(animalCodes);

        //Sub-----------------Create Buttons for each animal-------------------------------------------------------------------------------

        function createButton(animal, animalcode) {

            // create button
            const newButton = document.createElement("li");
            

            // create li
            const newList = document.createElement("a");

           

            // Give Href
            newList.setAttribute("href", "#");

            // put li in a
            newButton.appendChild(newList);
        
            // use innerHTML to interpret HTML entities as emojis
            newList.innerHTML = `${animalcode} ${animal} `;
        
            // add a data-id attribute to the button
            newList.setAttribute("data-id", animalcode);
        
            // change name to lowercase for the button id
            var animallowercase = animal.toLowerCase();
            var animalButton = animallowercase + "button"

            // set id of button
            newList.setAttribute('id', animalButton);

            // Add event listener
            newList.addEventListener("click", function () {
                addAnimal(animalcode);
            });
        
            // add button to buttoncontainer
            buttonContainer.insertBefore(newButton, null);
        }

            // create button for each animal in the animalCodes array
            Object.entries(animalCodes).forEach(([animal, animalCode]) => {
                createButton(animal, animalCode);
            });
    }

    // run animalapi function
    animalapi();
    
 ```
</details>

### Dynamic Emoji Adding

<details>
    <summary></summary>
</details>

### Remove All Animals

<details>
    <summary></summary>
</details>