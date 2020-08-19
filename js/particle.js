// Thanks to: https://css-tricks.com/playing-with-particles-using-the-web-animations-api/
function pop (w,z,v) {
      for (let i = 0; i < 50; i++) {
        createParticle(w,z,v);
      };
};
  
function createParticle (x, y,v) {
  const particle = document.createElement('particle');
  document.body.appendChild(particle);
  // Calculate a random size from 5px to 25px
  const size = Math.floor(Math.random() * 20 + 5);
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  // Generate a random color in a blue/purple palette
  particle.style.background = `hsl(${Math.random() * 30 + 0}, 100%, ${v}%)`;
  
  // Generate a random x & y destination within a distance of 75px from the mouse
  const destinationX = x + (Math.random() - 0.5) * 2 * 75;
  const destinationY = y + (Math.random() - 0.5) * 2 * 75;

  // Store the animation in a variable as we will need it later
  const animation = particle.animate([{
      // Set the origin position of the particle
      // We offset the particle with half its size to center it around the mouse
      transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
      opacity: 1
    },
    {
      // We define the final coordinates as the second keyframe
      transform: `translate(${destinationX}px, ${destinationY}px)`,
      opacity: 0
    }
  ], {
    // Set a random duration from 500 to 1500ms
    duration: Math.random() * 1000 + 500,
    easing: 'cubic-bezier(0, .9, .57, 1)',
    // Delay every particle with a random value of 200ms
    delay: Math.random() * 200
  });
  // When the animation is complete, remove the element from the DOM
  animation.onfinish = () => {
    particle.remove();
  };
}