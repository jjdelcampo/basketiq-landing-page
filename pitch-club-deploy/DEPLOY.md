# Despliegue: Pitch BasketIQ para CB Villanueva de la Cañada

## Objetivo

Desplegar `index.html` como un sitio web independiente con protección por contraseña.
Se usará para presentar BasketIQ a la junta directiva del Club Baloncesto Villanueva de la Cañada (viernes 17 abril 2026).

---

## Credenciales de acceso

- **Usuario:** `juntad`
- **Contraseña:** `canada2026`

La autenticación es client-side (base64 + sessionStorage). No es criptográficamente segura, pero es adecuada para una presentación privada con URL no pública.

---

## Contenido

- `index.html` — Página única autocontenida (~1300 líneas):
  - **Login gate**: overlay con formulario usuario/contraseña
  - **Pitch deck**: 12 slides con scroll-snap vertical, navegación por puntos laterales
  - **Sin dependencias externas** excepto Google Fonts (Outfit)
  - **Sin assets**: todo inline (CSS, JS, HTML)

### Slides incluidos

1. Hero — Presentación BasketIQ
2. Quick Win #1 — Preparación de entrenamientos
3. Ejemplo 1 — Contexto de programación (mockup WhatsApp)
4. Ejemplo 2 — Preparación física adaptada por edad
5. Ejemplo 3 — Feedback y ajuste de programación
6. Ejemplo 4 — Crónicas postpartido automatizadas
7. Ejemplo 5 — Publicación multimedia automatizada
8. Resumen — Todos los casos de uso
9. Tecnología — Ontología, fuentes oficiales, IA conversacional
10. Ontología visual — Flujo de conocimiento y ciclo de mejora continua
11. Roadmap 2026 — 3 fases + propuesta de colaboración + Madrid Emprende
12. Cierre — Agradecimiento

---

## Instrucciones de despliegue

## Estado actual del despliegue

Desplegado correctamente en Vercel el 14 de abril de 2026.

- **Proyecto Vercel:** `jjdelcampos-projects/pitch-club-deploy`
- **URL de producción estable:** `https://pitch-club-deploy.vercel.app`
- **URL de la build desplegada:** `https://pitch-club-deploy-j9d747p8b-jjdelcampos-projects.vercel.app`
- **URL de inspección en Vercel:** `https://vercel.com/jjdelcampos-projects/pitch-club-deploy/673j5sdAYdnDy3nxtw7wsYdxrW85`

### Acceso actual

- **Usuario:** `juntad`
- **Contraseña:** `canada2026`

> **Nota**: Se añadió `<meta name="robots" content="noindex, nofollow">` al `index.html` para minimizar la indexación pública del enlace.

---

### Opción A: Vercel (preferida)

1. Ir a [vercel.com](https://vercel.com) → Log in con cuenta de GitHub (`jjdelcampo`)
2. "Add New Project" → Import desde GitHub → `jjdelcampo/basketiq-landing-page`
3. **IMPORTANTE**: Configurar "Root Directory" como `pitch-club-deploy`
4. Framework Preset: "Other"
5. Build Command: (dejar vacío)
6. Output Directory: `.`
7. Deploy

El sitio se desplegará en una URL de Vercel. En el despliegue actual, la URL estable es `https://pitch-club-deploy.vercel.app`.

> **Nota**: Si el repo ya está conectado a Vercel para la landing page principal, crear un nuevo proyecto apuntando al mismo repo pero con Root Directory diferente.

### Opción B: Netlify (alternativa)

1. Ir a [app.netlify.com](https://app.netlify.com)
2. "Add new site" → "Deploy manually"
3. **Drag & drop** la carpeta `pitch-club-deploy/` completa
4. Netlify asignará un URL aleatorio (se puede personalizar después)

### Opción C: Vercel CLI

```bash
cd pitch-club-deploy
npx vercel --prod
```

Seguir las instrucciones interactivas. Elegir "Other" como framework.

### Opción D: Netlify CLI

```bash
cd pitch-club-deploy
npx netlify-cli deploy --prod --dir .
```

---

## Verificación post-despliegue

1. Abrir la URL del sitio
2. Verificar que aparece el login gate (fondo oscuro, formulario centrado)
3. Introducir credenciales: `juntad` / `canada2026`
4. Verificar que aparece el pitch deck con 12 slides
5. Verificar navegación: scroll vertical con snap, puntos laterales, contador
6. Verificar que al refrescar la página NO vuelve a pedir credenciales (sessionStorage)
7. Verificar en una ventana de incógnito que SÍ pide credenciales

---

## Relación con el repo

Este proyecto (`pitch-club-deploy/`) es un **despliegue independiente** del repo principal `basketiq-landing-page`. El repo contiene:

```
basketiq-landing-page/
├── index.html              ← Landing page EN (desplegada en basketiq.io)
├── es.html                 ← Landing page ES
├── pitch-club-canada.html  ← Redirección ligera al pitch canónico
├── pitch-socio.html        ← Pitch para socios/partners
├── vercel.json             ← Config de la landing principal
├── assets/
├── basketiq_VECTOR_PRO_pack/
└── pitch-club-deploy/      ← ESTE PROYECTO (despliegue independiente)
    ├── index.html           ← Pitch protegido con login (12 slides)
    └── DEPLOY.md            ← Este archivo
```

El `index.html` de `pitch-club-deploy/` es la versión autocontenida, protegida y completa del pitch del club. El archivo `pitch-club-canada.html` se mantiene solo como redirección para evitar duplicidades.
