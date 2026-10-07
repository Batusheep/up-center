// UP Center — концепт главной: шапка, меню, фильтр вузов, форма.

// Шапка уменьшается при прокрутке
const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Мобильное меню
const burger = document.querySelector('.burger');
const mobileMenu = document.getElementById('mobileMenu');
burger.addEventListener('click', () => {
  const open = burger.getAttribute('aria-expanded') !== 'true';
  burger.setAttribute('aria-expanded', String(open));
  mobileMenu.classList.toggle('is-open', open);
});
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  burger.setAttribute('aria-expanded', 'false');
  mobileMenu.classList.remove('is-open');
}));

// Переключатель языка
const langBtn = document.querySelector('.lang__btn');
const langMenu = document.querySelector('.dropdown--lang');
langBtn.addEventListener('click', e => {
  e.stopPropagation();
  const open = !langMenu.classList.contains('is-open');
  langMenu.classList.toggle('is-open', open);
  langBtn.setAttribute('aria-expanded', String(open));
});
document.addEventListener('click', () => {
  langMenu.classList.remove('is-open');
  langBtn.setAttribute('aria-expanded', 'false');
});

// Фильтр вузов: направление + город
let tag = 'all';
let city = 'all';
const unis = document.querySelectorAll('.uni');
const empty = document.querySelector('.unis__empty');
const applyFilter = () => {
  let shown = 0;
  unis.forEach(u => {
    const ok = (tag === 'all' || u.dataset.tags.split(' ').includes(tag)) &&
               (city === 'all' || u.dataset.city === city);
    u.classList.toggle('is-hidden', !ok);
    if (ok) shown++;
  });
  empty.hidden = shown > 0;
};
document.querySelectorAll('.chip[data-filter]').forEach(btn => btn.addEventListener('click', () => {
  document.querySelectorAll('.chip[data-filter]').forEach(b => b.classList.remove('is-active'));
  btn.classList.add('is-active');
  tag = btn.dataset.filter;
  applyFilter();
}));
document.querySelectorAll('.chip[data-city]').forEach(btn => btn.addEventListener('click', () => {
  document.querySelectorAll('.chip[data-city]').forEach(b => b.classList.remove('is-active'));
  btn.classList.add('is-active');
  city = btn.dataset.city;
  applyFilter();
}));

// Форма: проверка обязательных полей и экран «Спасибо» (без отправки на сервер)
const form = document.getElementById('leadForm');
form.addEventListener('submit', e => {
  e.preventDefault();
  let valid = true;
  ['name', 'phone'].forEach(n => {
    const input = form.elements[n];
    const field = input.closest('.field');
    const bad = !input.value.trim();
    field.classList.toggle('has-error', bad);
    if (bad) valid = false;
  });
  const consentErr = form.querySelector('.field__error--consent');
  const noConsent = !form.elements.consent.checked;
  consentErr.classList.toggle('is-visible', noConsent);
  if (noConsent) valid = false;
  if (!valid) return;
  form.querySelector('.form__fields').hidden = true;
  form.querySelector('.form__success').hidden = false;
});
form.querySelectorAll('input').forEach(i => i.addEventListener('input', () => i.closest('.field')?.classList.remove('has-error')));
