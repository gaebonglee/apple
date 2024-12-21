const io = new IntersectionObserver(function (entires) {
  entires.forEach(function (entry) {
    if(!entry.isIntersecting) {
        return
    }
    console.log(entry.isIntersecting, entry.target);
  });
});

const h1Els = document.querySelectorAll("h1");
h1Els.forEach(function (el) {
  io.observe(el);
});
