// Source: Lun Dev Code
let cards = document.querySelectorAll('.projects .project-slider .project-card');
let card_info = document.querySelectorAll('.projects .project-info');

let active = 0;
function loadShow(){
    cards[active].style.transform = `none`;
    cards[active].style.zIndex = 1;
    cards[active].style.filter = 'none';
    cards[active].style.opacity = 1;

    card_info[active].style.transform = `none`;
    card_info[active].style.zIndex = 1;
    card_info[active].style.filter = 'none';
    card_info[active].style.opacity = 1;
    // show after
    let stt = 0;
    for(var i = active + 1; i < cards.length; i ++){
        stt++;
        cards[i].style.transform = `translateX(${120*stt}px) scale(${1 - 0.2*stt}) perspective(16px)`;
        cards[i].style.zIndex = -stt;
        cards[i].style.filter = 'blur(5px)';
        cards[i].style.opacity = 0;

        card_info[i].style.transform = `translateX(${120*stt}px) scale(${1 - 0.2*stt}) perspective(16px)`;
        card_info[i].style.zIndex = -stt;  
        card_info[i].style.filter = 'blur(5px)';
        card_info[i].style.opacity = 0;
    }
     stt = 0;
    for(var i = (active - 1); i >= 0; i --){
        stt++;
        cards[i].style.transform = `translateX(${-120*stt}px) scale(${1 - 0.2*stt}) perspective(16px)`;
        cards[i].style.zIndex = -stt;
        cards[i].style.filter = 'blur(5px)';
        cards[i].style.opacity = 0;

        card_info[i].style.transform = `translateX(${-120*stt}px) scale(${1 - 0.2*stt}) perspective(16px)`;
        card_info[i].style.zIndex = -stt;
        card_info[i].style.filter = 'blur(5px)';
        card_info[i].style.opacity = 0;
    }
}
loadShow();
let next = document.getElementById('next');
let prev = document.getElementById('prev');
next.onclick = function(){
   active = active + 1 < cards.length ?  active + 1 : active;
   loadShow();
}
prev.onclick = function(){
    active = active - 1 >= 0 ? active -1 : active;
    loadShow();
}
// Lun Dev Code End

// Smooth Scroll for Anchor Links
document.querySelectorAll('a.smooth-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const top = target.getBoundingClientRect().top + window.pageYOffset - 80; // offset for sticky header
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});