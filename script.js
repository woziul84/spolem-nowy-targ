const toggle=document.querySelector('.menu-toggle');
const menu=document.querySelector('#menu');
if(toggle&&menu){
  toggle.addEventListener('click',()=>{const open=menu.classList.toggle('open');toggle.setAttribute('aria-expanded',open?'true':'false')});
  menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>menu.classList.remove('open')));
}

const slides=[...document.querySelectorAll('.hero-slide')];
const dots=[...document.querySelectorAll('.slider-dot')];
let currentSlide=0;
let sliderTimer=null;
function setSlide(index){
  if(!slides.length) return;
  currentSlide=(index+slides.length)%slides.length;
  slides.forEach((slide,i)=>slide.classList.toggle('is-active',i===currentSlide));
  dots.forEach((dot,i)=>dot.classList.toggle('is-active',i===currentSlide));
}
function startSlider(){
  if(slides.length<2) return;
  clearInterval(sliderTimer);
  sliderTimer=setInterval(()=>setSlide(currentSlide+1),5200);
}
dots.forEach(dot=>dot.addEventListener('click',()=>{setSlide(Number(dot.dataset.target));startSlider();}));
document.querySelector('.hero-arrow.next')?.addEventListener('click',()=>{setSlide(currentSlide+1);startSlider();});
document.querySelector('.hero-arrow.prev')?.addEventListener('click',()=>{setSlide(currentSlide-1);startSlider();});
startSlider();

const io=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}})},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
