document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded and parsed");

    const sidebarbutton = document.getElementById("menu");
    const sidebarbuttonsvg = document.getElementById("menu-svg");
    const footer = document.querySelector('footer');
    var menuopen = 0;

    function togglemenu() {

        if (menuopen === 0) {
            console.log("menu open");
            sidebarbuttonsvg.style.transform = 'rotate(0deg)';
            footer.style.left = '0px';
            menuopen = 1;
        } else if (menuopen === 1) {
            console.log("menu close");
            sidebarbuttonsvg.style.transform = 'rotate(180deg)';
            footer.style.left = '-250px';
            menuopen = 0;
        };
        

    };

    sidebarbutton.addEventListener("click", togglemenu);

    const shopbutton = document.getElementsByClassName("shopbutton")[0];
    const shopbuttonsvg = document.getElementsByClassName("shop-svg")[0];
    const shopsection = document.getElementsByClassName("shopsection")[0];
    var shopopen = 0;
    
    function toggleshop() {
        if (shopopen === 0) {
            console.log("shop open");
            shopbuttonsvg.style.transform = 'rotate(270deg)';
            shopsection.style.bottom = '0px';
            shopbutton.style.bottom = '11em';
            
            shopopen = 1;
        } else if (shopopen === 1) {
            console.log("shop close");
            shopbuttonsvg.style.transform = 'rotate(90deg)';
            shopsection.style.bottom = '-200px';
            shopbutton.style.bottom = '1em';

            shopopen = 0;
        }
    }
    
    shopbutton.addEventListener("click", toggleshop);




    const name = document.getElementById("name");
    const description = document.getElementById("description");
    const hobbys = document.getElementById("hobbys");
    const animals = document.getElementById("animals");



    async function fetchdata() {

        const response = await fetch("./info.json");
        const data = await response.json();
    
        name.innerHTML = data.name;
        description.innerHTML = data.description;
        hobbys.innerHTML = data.hobbys[0].hobby1;
        animals.innerHTML = data.favoritePets;

    }
    
    fetchdata();


  });

