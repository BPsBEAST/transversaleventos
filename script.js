const menu=document.getElementById('menu'),nav=document.getElementById('navigation');menu.addEventListener('click',()=>{const opened=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(opened));menu.textContent=opened?'×':'☰'});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='☰'}));document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>b.classList.remove('active'));button.classList.add('active');document.querySelectorAll('.tile').forEach(tile=>{tile.hidden=button.dataset.filter!=='all'&&tile.dataset.category!==button.dataset.filter})}));const FORM_EMAIL='marketing.geracaotransversal@gmail.com'; // Contacto provisório: confirmar email oficial da Transversal Eventos
document.getElementById('quote').addEventListener('submit',async event=>{
 event.preventDefault();
 const form=event.currentTarget,button=form.querySelector('button[type=submit]'),status=document.getElementById('status');
 const fd=new FormData(form);
 const payload=Object.fromEntries(fd.entries());
 payload._subject='Novo pedido de orçamento — Transversal Eventos';
 payload._captcha='true';
 payload._template='table';
 button.disabled=true;button.textContent='A enviar...';status.textContent='A enviar o pedido...';
 try{
  const response=await fetch('https://formsubmit.co/ajax/'+encodeURIComponent(FORM_EMAIL),{
    method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(payload)
  });
  const result=await response.json();
  if(!response.ok||result.success===false||result.success==='false')throw new Error(result.message||'Não foi possível enviar.');
  status.textContent='Pedido submetido. Caso o endereço ainda não esteja confirmado no serviço de formulários, a entrega ficará pendente de ativação.';
  form.reset();
 }catch(err){
  status.textContent='Não foi possível confirmar o envio. Verifica a ligação e tenta novamente. Se continuar a falhar, contacta diretamente a equipa.';
 }finally{button.disabled=false;button.textContent='Enviar pedido de orçamento ↗'}
});