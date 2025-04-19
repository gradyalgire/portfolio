// source: Lun Dev Code
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
// Lun Dev Code end

// smooth scroll for anchor links
document.querySelectorAll('a.smooth-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        const target = document.querySelector(href);
        
        if (target) {
            // ff it's the about section and we're already at the top, do nothing
            if (href === '#about-me' && window.scrollY < 100) {
                return;
            }
            
            const top = target.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// emailJS form handling
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    emailjs.sendForm('service_uzsy39v', 'template_lldpzx4', this, 'pUM5PSrSTk5bhgLHF')
        .then(function () {
            alert('Message sent successfully.');
        }, function (error) {
            alert('Failed to send message. Please try again later.');
            console.error(error);
        });
});