document.getElementById('y').textContent = new Date().getFullYear();
var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// typing roles
var roles = ['Frontend Developer','Java Developer','Problem Solver'];
var el = document.getElementById('typed');
if (reduce) { el.textContent = roles[0]; }
else {
  var r = 0, c = 0, del = false;
  (function tick(){
    var w = roles[r];
    el.textContent = w.slice(0, c);
    if (!del && c < w.length) { c++; setTimeout(tick, 90); }
    else if (!del) { del = true; setTimeout(tick, 1400); }
    else if (c > 0) { c--; setTimeout(tick, 45); }
    else { del = false; r = (r + 1) % roles.length; setTimeout(tick, 300); }
  })();
}

// scroll reveal
var items = document.querySelectorAll('.rv');
if ('IntersectionObserver' in window && !reduce) {
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){ if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); } });
  }, {threshold:.15});
  items.forEach(function(i){ io.observe(i); });
} else { items.forEach(function(i){ i.classList.add('on'); }); }

// scroll progress bar
var bar = document.getElementById('bar');
addEventListener('scroll', function(){
  var h = document.documentElement.scrollHeight - innerHeight;
  bar.style.width = (h > 0 ? scrollY / h * 100 : 0) + '%';
}, {passive:true});

// glow that follows the mouse on cards
document.querySelectorAll('.card').forEach(function(card){
  card.addEventListener('pointermove', function(e){
    var b = card.getBoundingClientRect();
    card.style.setProperty('--mx', (e.clientX - b.left) + 'px');
    card.style.setProperty('--my', (e.clientY - b.top) + 'px');
  });
});

// theme toggle
document.getElementById('theme').addEventListener('click', function(){
  var root = document.documentElement;
  var dark = root.getAttribute('data-theme') === 'dark' ||
    (!root.getAttribute('data-theme') && matchMedia('(prefers-color-scheme: dark)').matches);
  root.setAttribute('data-theme', dark ? 'light' : 'dark');
});
