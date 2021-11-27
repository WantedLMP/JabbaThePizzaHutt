class MobileNavBar{
    constructor(mobileMenu, navList, navLinks){
        this.mobileMenu = document.querySelector(mobileMenu);
        this.navList = document.querySelector(navList);
        this.navLinks = document.querySelectorAll(navLinks);
        this.activeClass = "active";

        this.handleClick = this.handleClick.bind(this);
    }

    addClickEvent(){
        this.mobileMenu.addEventListener("click", this.handleClick);
    }

    animateLinks(){
        this.navLinks.forEach((link, index) => {
            console.log(index / 7 + .3);
            link.style.animation
                ? (link.style.animation = "")
                : (link.style.animation = `navLinkFade 0.5s ease forwands 0.3s`);
        });
    }

    handleClick(){
        this.navList.classList.toggle(this.activeClass);
        this.animateLinks();
    }

    init(){
        if (this.mobileMenu){
            this.addClickEvent();
        }
        return this;
    }
}

const mobileNavbar = new MobileNavBar(
    ".mobile-menu",
    ".nav-list",
    ".nav-list li",
);

mobileNavbar.init();