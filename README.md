## Git workflow

* `main` — production. Напряму не працюємо.
* `dev` — development. Напряму не пушимо, зміни через PR.
* `feature/*` — робочі гілки розробників.

Naming:

* `feature/header`
* `feature/contact-form`
* `feature/mobile-menu`
* `fix/mobile-layout`
* `fix/form-validation`

Workflow:
`feature/*` → PR → `dev` → PR → `main`

Перед початком роботи створюйте нову гілку від актуального `dev`.

Використовуйте  `git pull origin dev` для перевірки актуального `dev`.
