    const toggle = document.getElementById('menuToggle');
    const nav = document.getElementById('navLinks');

    toggle.onclick = () => {
      nav.classList.toggle('active');
      toggle.classList.toggle('active');
    };
    function menu(){
  document.getElementById("nav").classList.toggle("active");
}

function mode(){
  document.body.classList.toggle("light");
}