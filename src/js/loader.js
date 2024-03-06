


const loader = document.querySelector(".loader");

window.addEventListener("load", () => {
    loader.classList.add('loader-hidden');

    loader.addEventListener("transitionend", () => {
        document.body.removeChild("loader");
    })
})


