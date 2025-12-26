// static/main.js
document.addEventListener("DOMContentLoaded", () => {
  // анимируем появление карточек с небольшой задержкой
  document.querySelectorAll('.post-card').forEach((el, idx) => {
    setTimeout(()=> el.classList.add('show'), 40 * idx);
  });

  // обработка клика по кнопке лайка (AJAX)
  document.querySelectorAll('.like-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const id = btn.dataset.postId;
      if (!id) return;
      try {
        const res = await fetch(`/api/like/${id}`, {
          method: 'POST',
          headers: { 'Accept':'application/json', 'Content-Type':'application/json' },
          credentials: 'same-origin'
        });
        if (!res.ok) throw new Error('Network error');

        const data = await res.json();

        const countEl = btn.querySelector('.like-count');
        countEl.textContent = data.likes;

        if (data.liked) {
          btn.classList.add('liked');
          countEl.classList.remove('pop');
          // reflow for retrigger
          void countEl.offsetWidth;
          countEl.classList.add('pop');
        } else {
          btn.classList.remove('liked');
        }
      } catch (err) {
        console.error('Like failed', err);
      }
    });
  });

  // плавный фокус для textarea
  const ta = document.querySelector('.compose-card textarea');
  if (ta) {
    ta.addEventListener('focus', () => ta.style.borderColor = 'rgba(37,99,235,0.6)');
    ta.addEventListener('blur', () => ta.style.borderColor = 'rgba(15,23,42,0.06)');
  }
});
