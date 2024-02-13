# Web App From Scratch @cmda-minor-web 2023 - 2024

In this document i will document the state of my code and the things i walked into when creating my webapp. I will be using screenshots to document the things my code does and wants to do.

## Code report


### Menu's

<details>
<summary>Toggle Sidebar</summary>
<br>
<p>The sidebarmenu is the menu with my personal info on it. This is fetched from my json file. I used javascript to make the menu move in and out of the screen.</p>

``` javascript

  const sidebarbutton = document.getElementById("menu");
    const sidebarbuttonsvg = document.getElementById("menu-svg");
    const footer = document.querySelector('footer');
    var menuopen = 0;

    function togglemenu() {

        if (menuopen === 0) {
         
            sidebarbuttonsvg.style.transform = 'rotate(0deg)';
            footer.style.left = '0px';
            menuopen = 1;

            if (shopopen === 1) {
                toggleshop();
            }


        } else if (menuopen === 1) {
            
            sidebarbuttonsvg.style.transform = 'rotate(180deg)';
            footer.style.left = '-300px';
            menuopen = 0;
        };
        

    };

    sidebarbutton.addEventListener("click", togglemenu);

```

</details>
<br>

<details>
<summary>Toggle Shop</summary>
<br>
<p>The shopmenu is the bottom menu that lets you buy animals. I wanted it to close on opening the personal info menu so the page doesn't get too full. Thats why this code is a little more complicated.</p>

``` javascript

const shopbutton = document.getElementsByClassName("shopbutton")[0];
    const shopbuttonsvg = document.getElementsByClassName("shop-svg")[0];
    const shopsection = document.getElementsByClassName("shopsection")[0];
    var shopopen = 0;
    
    function toggleshop() {
        if (shopopen === 0) {
            
            shopbuttonsvg.style.transform = 'rotate(270deg)';
            shopsection.style.bottom = '0px';
            shopbutton.style.bottom = '11em';
            removeAllButton.style.bottom = '11em';
            
            shopopen = 1;
        } else if (shopopen === 1) {
            
            shopbuttonsvg.style.transform = 'rotate(90deg)';
            shopsection.style.bottom = '-200px';
            shopbutton.style.bottom = '1em';
            removeAllButton.style.bottom = '1em';

            shopopen = 0;
        }
    }
    
    shopbutton.addEventListener("click", toggleshop);

```

</details>

<br>

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

<br>

<details>
<summary>CatsGalore</summary>
<br>
<p>The Catsgalore function is mostly a testing function to map the spawns and see if the spawning is random and inside the bounding box. It runs the addanimal Function 100 times. So in normal words: "It spawns 100 cats!"</p>

``` javascript

    catsGaloreButton = document.getElementsByClassName("cats-galore")[0];

    catsGaloreButton.addEventListener("click", catsGalore)

    function catsGalore () {
        
        for (let i = 0; i < 100; i++) {
            addAnimal('&#128008');
        }
    }

```

</details>

<br>

### Moving Animals

<details>
    <summary>Move Function</summary>
<br>
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

<br>

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
<br>
<details>
    <summary>Fetch local api Function</summary>
<br>
<p>This fetch function fetches the data in our personal json file and displays it on my side screen menu  </p>

 ``` javascript

    const name = document.getElementById("name");
    const description = document.getElementById("description");
    const hobbys = document.getElementById("hobbys");
    const favoriteanimals = document.getElementById("favoriteanimals");
    const profileimage = document.getElementById("profileimage");



    async function fetchdata() {
        
        const response = await fetch("https://kitch41.github.io/Webapps-From-Scratch-23-24/info.json");
        const data = await response.json();
    
        name.innerHTML = data.firstName + " " + data.lastName;
        description.innerHTML = data.bio;
        hobbys.innerHTML = data.hobbies;
        favoriteanimals.innerHTML = data.favouriteAnimal;
        profileimage.src = data.avatar_url;

    }
    
    fetchdata();

 ```
</details>

<br>

### Create Buttons

<details>
    <summary>CreateButtons Function</summary>
<br>
<p> The createButton Function will use the data from the animal api to dynamically create buttons in the shop for each emoji selected. This will be further explained in the dynamic emoji code explaination.
<br>
This code creates some dom elements with the html code of the animal and their name inside.</p>

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

<br>

### Dynamic Emoji Adding

<details>
    <summary>Dynamic Emoji</summary>
<br>
<p>In this snippet i make an array with the numbers of the emoji's. Every emoji has a number in their api. When i enter this number the emoji gets added to the shop and all other places where it is needed. It also makes an array with the animalname and code so i can always pull the htmlcode of any animal emoji.</p>

``` javascript

  const animalNumbers = [4, 9, 67, 38, 1 ];
        const animalCodes = {};
        
        // maak animalCodes object met keys en value. Waar key de namen zijn en values de html codes
        animalNumbers.forEach((number) => {
            const animalName = data[number].name;
            const htmlCode = data[number].htmlCode;
            
            animalCodes[animalName] = htmlCode;
        });

```

</details>
<br>

### Remove Animals

<details>
    <summary>Remove all animals</summary>
<br>
<p></p>

``` javascript

    const dialog = document.querySelector("dialog");
    const removeAllButton = document.querySelector(".removeallbutton");
    const closeButton = document.querySelector(".dialogbutton");
    const returnButton = document.querySelector(".returnbutton");
    


    removeAllButton.addEventListener("click", () => {
        dialog.showModal();
        dialog.style.display = "flex"
    });

    
    returnButton.addEventListener("click", () => {
        dialog.close();
        dialog.style.display = "none";
    });

    closeButton.addEventListener("click", () => {
        const allanimals = document.querySelectorAll(".animal");

        dialog.close();
        dialog.style.display = "none";
    
       
        allanimals.forEach(animal => {

            animal.innerHTML = "&#128165;";
            animal.style.transform += "scale(50)";


            setTimeout(function () {
                animal.remove();
            }, 1000 );
            
        });
    
        console.log("killed all animals");
    });
    
```


</details>
<br>
<details>
    <summary>Kill fish</summary>
<br>
<p>The killFish function makes the fish you place onto the page die after 5 seconds</p>

``` javascript

     function killFish(code) {
        const animals = document.querySelectorAll(`.animal[code="${code}"]`);
    
        animals.forEach(animal => {
            setTimeout(function () {
                animal.innerHTML = "&#128128;"
                animal.style.transform += "scale(50)";
            }, 5000);
    
            setTimeout(function () {
                animal.remove();
            }, 5500);
        });
    }
    
```


</details>