---
layout: layouts/essay.njk
title: Contact
description: Contact Michael T. Bradfield
permalink: /contact/

back_link: /
back_label: Home
---

*This site is a place for writing and reflection, not a public forum.
But communication is not meant to be one-sided.
If something here prompts a question, a response, or a note of connection, you are welcome to reach out.
Messages are received privately. I will read what is sent and respond as I am able.*

<form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" action="/contact/thanks/">
  <input type="hidden" name="form-name" value="contact" />
  <p hidden>
    <label>Don’t fill this out if you’re human: <input name="bot-field" /></label>
  </p>

  <p>
    <label>Your name<br>
      <input type="text" name="name" />
    </label>
  </p>

  <p>
    <label>Your email<br>
      <input type="email" name="email" required />
    </label>
  </p>

  <p>
    <label>Subject<br>
      <input type="text" name="subject" />
    </label>
  </p>

  <p>
    <textarea id="message" name="message" rows="8" required maxlength="2000"></textarea>
<small id="char-count">0 / 2000</small>

<script>
  const textarea = document.getElementById('message');
  const counter = document.getElementById('char-count');

  textarea.addEventListener('input', function () {
    counter.textContent = `${this.value.length} / 2000`;
  });
</script>
  </p>

  <p>
    <button type="submit">Send message</button>
  </p>
</form>