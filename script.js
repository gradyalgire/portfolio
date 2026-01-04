// source: Lun Dev Code
let cards = document.querySelectorAll('.projects .card-slider .project-card');
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

    // Loop through all cards and set their styles based on the active card
    for (let i = 0; i < cards.length; i++) {

        // Active card
        if (i === active) {
            cards[i].style.transform = 'none'; // Reset transform for active card
            cards[i].style.zIndex = 1; // Bring active card to front
            cards[i].style.filter = 'none'; // Reset filter for active card
            cards[i].style.opacity = 1; // Set opacity to 1 for active card
            cards[i].style.pointerEvents = 'auto'; // Enable pointer events for active card

            card_info[i].style.transform = 'none';
            card_info[i].style.zIndex = 1;
            card_info[i].style.filter = 'none';
            card_info[i].style.opacity = 1;

        // One to the right
        } else if (i === active + 1) {
            
            cards[i].style.transform = 'translateX(120px) scale(0.7)';
            cards[i].style.zIndex = 0;
            cards[i].style.opacity = 1;
            cards[i].style.pointerEvents = 'none';

            card_info[i].style.transform = 'translateX(120px) scale(0.8)';
            card_info[i].style.zIndex = 0;
            card_info[i].style.opacity = 0;

        // One to the left
        } else if (i === active - 1) {
            
            cards[i].style.transform = 'translateX(-120px) scale(0.7)';
            cards[i].style.zIndex = 0;
            cards[i].style.opacity = 1;
            cards[i].style.pointerEvents = 'none';

            card_info[i].style.transform = 'translateX(-120px) scale(0.8)';
            card_info[i].style.zIndex = 0;
            card_info[i].style.opacity = 0;

        // Hide all others
        } else {
            cards[i].style.opacity = 0;
            cards[i].style.pointerEvents = 'none';

            card_info[i].style.opacity = 0;
        }
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