const stickman = document.getElementById("stickman");

let pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
let target = { x: pos.x, y: pos.y };

document.addEventListener("mousemove", (e) => {
  target.x = e.clientX;
  target.y = e.clientY;
});

function animate() {
  // 부드러운 이동을 위한 이징(lerp)
  pos.x += (target.x - pos.x) * 0.1;
  pos.y += (target.y - pos.y) * 0.1;

  stickman.style.left = pos.x + "px";
  stickman.style.top = pos.y + "px";

  requestAnimationFrame(animate);
}

animate();
