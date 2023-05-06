const gallery = document.getElementById('container')

const handleOnDown = e => {
  gallery.dataset.mouseDownAt = e.clientX;
}

const handleOnUp = e => {
  gallery.dataset.prevPercentage = gallery.dataset.percentage;
  gallery.dataset.mouseDownAt = "0";
}

const handleOnMove = e => {
  if(gallery.dataset.mouseDownAt === "0") return;
  
  const mouseMove = parseFloat(gallery.dataset.mouseDownAt) - e.clientX, maxMouseMove = Math.min(window.innerWidth / 2, 340)
  const percentage = (mouseMove / maxMouseMove) * -100, nextPercentage = Math.max(Math.min(parseFloat(gallery.dataset.prevPercentage) + percentage, 0), -100)
  
  gallery.dataset.percentage = nextPercentage;
  gallery.animate({
      transform: `translate(${nextPercentage}%, -50%)`
    },
    {
      duration: 1000, fill: 'forwards'
    }
  );
  
  for(let image of gallery.getElementsByClassName('image')) {
    image.animate ({
      objectPosition: `${nextPercentage + 100}% 50%`
    },
    {
      duration: 1000, fill: 'forwards'
    }
    )
  }
}

window.onmousedown = handleOnDown;
window.onmouseup = handleOnUp;
window.onmousemove = handleOnMove;

window.ontouchstart = e => {
  handleOnDown(e.touches[0])
}

window.ontouchstart = e => {
  handleOnUp(e.touches[0])
}

window.ontouchstart = e => {
  handleOnMove(e.touches[0])
}