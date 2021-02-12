
var container  = document.getElementsByClassName("container");
var cont_height = container.offsetHeight;
console.log(cont_height);

var tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#img1", 
      // markers: true,
      start:"center center",
      end:"1551",
      scrub: 1,    
      toggleActions: "restart pause reverse pause",
    },
  });


  tl.to(".animLine", {
    height: 1551, 
    duration: 1,
    ease: "easeOut"
  })

const boxes = gsap.utils.toArray('.point-extended');

boxes.forEach((box, i) => {
  const anim = gsap.fromTo(box, {autoAlpha: 0}, {duration: 1, autoAlpha: 1});
  ScrollTrigger.create({
    trigger: box,
    animation: anim,
    scrub: true,
    toggleActions: 'restart pause resume pause',
  });
});