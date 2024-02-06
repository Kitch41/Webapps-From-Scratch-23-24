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



  });

