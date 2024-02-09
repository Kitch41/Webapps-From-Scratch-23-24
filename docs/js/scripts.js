//-----------------Load dom first-------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded and parsed");


    const offsetX = 30;
    const offsetY = 30;

    //Main-----------------Toggle Sidebarmenu-------------------------------------------------------------------------------

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

    // //Main-----------------Remove All button-----------------------------------------------------------------------------
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


    //Main-----------------Toggle Shopmenu-------------------------------------------------------------------------------

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

    //Main-----------------Fetch JSON Api Data-------------------------------------------------------------------------------


    const name = document.getElementById("name");
    const description = document.getElementById("description");
    const hobbys = document.getElementById("hobbys");
    const favoriteanimals = document.getElementById("favoriteanimals");
    const profileimage = document.getElementById("profileimage");



    async function fetchdata() {

        const response = await fetch("https://kitch41.github.io/Webapps-From-Scratch-23-24/docs/json/info.json");
        const data = await response.json();
    
        name.innerHTML = data.name;
        description.innerHTML = data.description;
        hobbys.innerHTML = data.hobbys[0].hobby1;
        favoriteanimals.innerHTML = data.favoritePets;
        profileimage.src = data.avatar;

    }
    
    fetchdata();


 //Main-----------------Animal API Data-------------------------------------------------------------------------------



    const buttonContainer = document.getElementById("buttonContainer");
    const main = document.querySelector("main");



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

    // Get a reference to the body element
    const bodyElement = document.body;

    // Get the bounding client rect of the body element
    const bodyRect = bodyElement.getBoundingClientRect();

    // Get the distance from the top of the viewport to the top of the body element
    const distanceToTop = bodyRect.top;

    
    let maxX, maxY;

    // Function to get max y
    function getMaxY() {
        return Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) - distanceToTop;
    }
    
    // Function to update maxY
    function updateMaxY() {
        maxY = getMaxY(); // Update the global variable
        console.log("Updated maxY:", maxY);
    }
    
    // Initial call to set maxY
    updateMaxY();
    
    // Listen for the window resize event for maxY
    window.addEventListener("resize", updateMaxY);
    
    // Function to get maxX
    function getMaxX() {
        return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    }
    
    // Function to update maxX
    function updateMaxX() {
        maxX = getMaxX(); // Update the global variable
        console.log("Updated maxX:", maxX);
    }
    
    // Initial call to set maxX
    updateMaxX();
    
    // Listen for the window resize event for maxX
    window.addEventListener("resize", updateMaxX);
    
    // Log the initial values
    console.log("Viewheight=" + maxY + " " + "Viewwidth=" + maxX);
    
    
//Main-----------------Add cats-------------------------------------------------------------------------------

    catsGaloreButton = document.getElementsByClassName("cats-galore")[0];

    catsGaloreButton.addEventListener("click", catsGalore)

    function catsGalore () {
        
        for (let i = 0; i < 100; i++) {
            addAnimal('&#128008');
        }
    }


  //Main---------------------------Add animal----------------------------------------------------------------------




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


    //Main---------------------------Random Int----------------------------------------------------------------------


    function getRandomInt(min, max) {

        // find diff
        let difference = max - min;
    
        // generate random number 
        let rand = Math.random();
    
        // multiply with difference 
        rand = Math.floor( rand * difference);
    
        // add with min value 
        rand = rand + min;
    
        return rand;
    }


    //Main------------------------Movement of animals----------------------------------------------------------------



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





});

