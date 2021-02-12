let heading = document.getElementById("heading");
        const initialPos = heading.offsetTop;

        var path = document.querySelector('.path');
        var pathLength = path.getTotalLength();

        // Make very long dashes (the length of the path itself)
        path.style.strokeDasharray = pathLength + ' ' + pathLength;

        // Offset the dashes so the it appears hidden entirely
        path.style.strokeDashoffset = pathLength;


        window.addEventListener('scroll', (e)=>{
            var value = window.scrollY;
            // console.log(value);
            heading.style.top = (initialPos + value * 1) + 'px';

            // What % down is it? 
            var scrollPercentage = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
            
            // Length to offset the dashes
            var drawLength = pathLength * scrollPercentage * 0.7;
            
            // Draw in reverse
            path.style.strokeDashoffset = pathLength - drawLength;

            // When complete, remove the dash array, otherwise shape isn't quite sharp
            if (scrollPercentage >= 0.99) {
                path.style.strokeDasharray = "none";
            } else {
                path.style.strokeDasharray = pathLength + ' ' + pathLength;
            }
        });


        ///////////////////////////////////////////////////////
        const boxes = gsap.utils.toArray('.place');

        boxes.forEach((box, i) => {
        const anim = gsap.from(box, {x:i%2==0? 200:-200, opacity: 0, duration: 1});
                 ScrollTrigger.create({
                trigger: box,
                animation: anim,
                toggleActions: 'restart none reverse none',
            });
        }); 