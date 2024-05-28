// confetti.js

function triggerConfetti() {
  const duration = 1000; // Duration of confetti effect in milliseconds
  const confettiConfig = {
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  };

  // Trigger confetti effect
  confetti(confettiConfig);
  setTimeout(() => confetti.reset(), duration); // Reset confetti after duration
}
