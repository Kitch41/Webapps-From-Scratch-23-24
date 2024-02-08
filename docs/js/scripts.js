//-----------------Load dom first-------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded and parsed");

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
    const returnButton = document.querySelector(".returnbutton")
    


    removeAllButton.addEventListener("click", () => {
        dialog.showModal();
        dialog.style.display = "flex"
    });

    
    returnButton.addEventListener("click", () => {
        dialog.close();
        dialog.style.display = "none"
       
    });

    closeButton.addEventListener("click", () => {
        const allanimals = document.querySelectorAll(".animal");

        dialog.close();
        dialog.style.display = "none";
    
       
        allanimals.forEach(animal => {
            animal.remove();
            
        });
    
        console.log("killed all animals");
    });

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

        const response = await fetch("./info.json");
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

    let maxX = getMaxX();
    let maxY = getMaxY();

    
    // get max y
    function getMaxY() {
        return Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) - distanceToTop;
    }
    
    function updateMaxY() {
        const maxY = getMaxY();
    }
    
    updateMaxY();
    
    // Listen for the window resize event
    window.addEventListener("resize", updateMaxY);

    //end get maxy

    //get maxX
    function getMaxX() {
        return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    }
    
    function updateMaxX() {
        const maxX = getMaxX();
    }
    
    updateMaxX();
    
    // Listen for the window resize event
    window.addEventListener("resize", updateMaxX);

    console.log("Viewheight=" + maxY + " " + "Viewwidth=" + maxX )
    
    //Main-----------------Add Animals-------------------------------------------------------------------------------

    function addAnimal(code) {
        console.log("Create Animal");
      
        //create p element
        const newP = document.createElement("p");

        // Generate random number
        randomNumberX = getRandomInt(1, 1000000);
        randomNumberY = getRandomInt(1, 1000000);
        randomNumberId = getRandomInt(1, 1000000);



        newP.setAttribute("data-x", randomNumberX);
        newP.setAttribute("data-y", randomNumberY);
        newP.setAttribute("id", randomNumberId);

       

        newP.classList.add("animal")
    
        // give the p element the animalcode
        newP.innerHTML = `${code}`;
      
        // add the animals to the page
        main.insertBefore(newP, null);

        const animal = document.getElementById(randomNumberId)


        animal.style.top = 0 + distanceToTop + "px" ;
        animal.style.left = "0";
    }

  });

  function getRandomInt(min, max) {
    // The formula generates a random whole number between min (inclusive) and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
}