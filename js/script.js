const $=(s)=>document.querySelector(s);const $$=(s)=>[...document.querySelectorAll(s)];
$('#year').textContent=new Date().getFullYear();
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});
$$('.reveal').forEach(el=>observer.observe(el));
$$('.filter').forEach(btn=>btn.addEventListener('click',()=>{ $$('.filter').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const f=btn.dataset.filter;$$('.work-card').forEach(card=>card.classList.toggle('hide',f!=='all'&&card.dataset.category!==f));}));
const modal=$('#modal'),modalImg=$('#modal-image'),modalTitle=$('#modal-title'),modalType=$('#modal-type');
$$('.work-card').forEach(card=>card.addEventListener('click',()=>{modalImg.src=card.dataset.image;modalImg.alt=card.dataset.title;modalTitle.textContent=card.dataset.title;modalType.textContent=card.dataset.type;modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'}));
function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow=''}
$('.modal-close').addEventListener('click',closeModal);modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
$('.menu-btn').addEventListener('click',()=>$('.nav-links').classList.toggle('open'));$$('.nav-links a').forEach(a=>a.addEventListener('click',()=>$('.nav-links').classList.remove('open')));

// Video showcase: autoplay muted previews when they enter the viewport.
const videos = $$('.video-frame video');
const videoObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const video = entry.target;
    if (entry.isIntersecting) {
      video.play().catch(() => {});
    } else if (!video.paused) {
      video.pause();
    }
  });
}, { threshold: 0.35 });
videos.forEach(video => {
  videoObserver.observe(video);
  video.addEventListener('loadeddata', () => {
    const empty = video.parentElement.querySelector('.video-empty');
    if (empty) empty.style.display = 'none';
  });
  video.addEventListener('error', () => {
    video.dataset.missing = 'true';
  });
});
