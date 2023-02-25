/* Nav selection */

const highlightAnchorNav = (anchor) => {
  const initialSelectedNav = document.querySelector(`nav a[href='#${anchor}']`);

  if (initialSelectedNav) {
    initialSelectedNav.classList.add('selected');
  }
}

// Page load
const initAnchor = window.location.hash.substr(1);
highlightAnchorNav(initAnchor);

// Get all nav links and add underline on click
const navLinks = [...document.querySelectorAll('nav a')];
const clearNavSelection = () => {
  navLinks.forEach(navLink => navLink.classList.remove('selected'));
}

const sections = [...document.querySelectorAll('section')];

/* Section fade in */
const sectionObserver = new IntersectionObserver((events) => {
  events.forEach(event => {
    console.log(event);
    if (event.isIntersecting) {
      event.target.style.opacity = 1;
    } else {
      event.target.style.opacity = 0;
    }
  })
}, {
  threshold: [.4]
});

sections.forEach(section => sectionObserver.observe(section))

/* Dot animation */
const initScrollPosition = window.scrollY;
const dot = document.getElementById("dot-animated");
const dotTopPosition = dot.getBoundingClientRect().top + initScrollPosition + 400;

// init dot state if load on an anchor
window.addEventListener('DOMContentLoaded', () => {
  if (initScrollPosition > 0) {
    dot.style.animationName = 'unset';
    dot.style.transformOrigin = 'top'

    if (initScrollPosition > dotTopPosition) {
      dot.style.transform = `scale(${dotTopPosition / 5})`;
      dot.style.borderRadius = `calc(50% - ${dotTopPosition / 30}%)`
    } else {
      dot.style.transform = `scale(${initScrollPosition / 5})`;
      dot.style.borderRadius = `calc(50% - ${initScrollPosition / 30}%)`
    }
  }
});

// hand dot grow and shrink on scroll
document.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;

  if (scrollPosition === 0) {
    dot.style.animationName = 'breath';
    dot.style.transformOrigin = 'unset'
  }

  if (scrollPosition > 0 && scrollPosition < dotTopPosition && scrollPosition / 5 > 1) {
    dot.style.animationName = 'unset';
    dot.style.transformOrigin = 'top'
    dot.style.transform = `scale(${scrollPosition / 5})`;
    dot.style.borderRadius = `calc(50% - ${scrollPosition / 30}%)`
  }

  // Nav section logic
  sections.forEach(section => {
    if ((window.innerHeight + initScrollPosition) - (section.getBoundingClientRect().top + initScrollPosition) > 0) {
      clearNavSelection();
      highlightAnchorNav(section.id);
    }
  })

  if ((window.innerHeight + initScrollPosition) - sections[0].getBoundingClientRect().top + initScrollPosition < 0) {
    clearNavSelection();
  }
});
