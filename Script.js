(function(){
  var slides=Array.prototype.slice.call(document.querySelectorAll('.slide'));
  var count=document.getElementById('count');
  var i=0;
  function show(n){
    i=Math.max(0,Math.min(slides.length-1,n));
    slides.forEach(function(s,k){
      s.classList.toggle('active',k===i);
      s.querySelectorAll('video').forEach(function(v){
        if(k===i&&v.hasAttribute('data-auto')){var p=v.play();if(p&&p.catch)p.catch(function(){})}
        else{v.pause()}
      });
    });
    count.textContent=(i+1)+' / '+slides.length;
    try{history.replaceState(null,'','#'+(i+1))}catch(e){}
  }
  document.getElementById('next').addEventListener('click',function(){show(i+1)});
  document.getElementById('prev').addEventListener('click',function(){show(i-1)});
  document.addEventListener('keydown',function(e){
    if(e.key==='ArrowRight'||e.key==='PageDown'||e.key===' '){e.preventDefault();show(i+1)}
    else if(e.key==='ArrowLeft'||e.key==='PageUp'){show(i-1)}
    else if(e.key==='Home'){show(0)}
    else if(e.key==='End'){show(slides.length-1)}
    else if(e.key==='f'&&document.documentElement.requestFullscreen){document.documentElement.requestFullscreen()}
  });
  var x0=null;
  document.addEventListener('touchstart',function(e){x0=e.touches[0].clientX});
  document.addEventListener('touchend',function(e){
    if(x0===null)return;var d=e.changedTouches[0].clientX-x0;
    if(Math.abs(d)>50)show(i+(d<0?1:-1));x0=null;
  });
  show((parseInt(location.hash.slice(1),10)||1)-1);
})();