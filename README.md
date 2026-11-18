# DOV Pastelería — Sitio demo

Sitio web estático (HTML, CSS y JavaScript, sin dependencias) creado como propuesta visual para **DOV Pastelería & Panadería**, Mar del Plata.

## Cómo verlo

Abrí `index.html` directamente en el navegador, o levantá un servidor local:

```bash
npx serve .
```

También podés arrastrar la carpeta completa a [Netlify Drop](https://app.netlify.com/drop) para publicarlo en segundos.

## Estructura

```
index.html                 Contenido y estructura de la página
assets/css/style.css       Diseño, tipografías y responsive
assets/js/main.js          Menú móvil, filtros, ficha de producto, videos y formulario
assets/fonts/              Fraunces + Source Sans 3 (WOFF2 locales)
assets/video/              hero.mp4, chocolate.mp4
assets/img/                Logo, fotos de productos, café y sucursal
```

## Secciones

- Hero con video a pantalla completa
- Accesos rápidos
- Nuestra esencia
- La vitrina (8 productos con filtros y ficha ampliada)
- Video destacado “El chocolate también es un ritual”
- DOV Café frente al mar
- Seis sucursales con enlaces a Google Maps
- Opiniones reales de Google
- Últimas publicaciones de Instagram
- Pedido por WhatsApp
- Footer con datos de contacto

## Datos utilizados

- **Sucursales:** Alberti y La Rioja · Av. Mario Bravo 802 · Av. Mario Bravo 2011 · Puán y Acevedo · Av. de los Trabajadores 2725 (DOV Café) · Edison 1463.
- **Horario general:** todos los días, 7:00 a 20:30 (Mario Bravo 802 figura 7:30–21:30).
- **WhatsApp:** 223 538 8289 → `https://wa.me/5492235388289`.
- **Instagram:** [@dov_pasteleria](https://www.instagram.com/dov_pasteleria/) · **Facebook:** [Dov.pasteleria](https://www.facebook.com/Dov.pasteleria/).
- **Google:** 4,3 estrellas con 728 opiniones; los testimonios citados son reseñas públicas.
- **“Top 5 medialunas de Mar del Plata”:** según comunicación de la propia marca (2024).
- No se publicaron precios ni año de fundación porque no se encontró información oficial verificable.

## Personalización rápida

- **Número de WhatsApp:** buscar `5492235388289` en `index.html` y `assets/js/main.js`.
- **Productos y fichas:** el grid está en `index.html`; los textos e imágenes del modal están en el objeto `products` de `assets/js/main.js`.
- **Colores y tipografías:** variables CSS al inicio de `assets/css/style.css`.
- **Videos e imágenes:** reemplazar los archivos de `assets/video/` y `assets/img/` manteniendo los nombres.

## Deploy en Cloudflare Pages

El sitio es 100% estático, no necesita build ni dependencias.

1. En Cloudflare Pages: **Create a project → Connect to Git** y elegir el repo `FedericoFantacone/dov.pasteleria`.
2. Framework preset: **None** (o "Static HTML").
3. Build command: vacío.
4. Build output directory: `/` (raíz del proyecto).
5. Deploy.

El archivo `_headers` ya trae cache largo para assets y headers de seguridad. El archivo `robots.txt` deja el sitio indexable por Google.

## Nota sobre las imágenes

Las fotos y videos son material público de los canales de DOV (Instagram, Facebook y fichas de Restaurant Guru), usados solo como referencia para esta demo. Para la versión final conviene reemplazarlos por los originales en alta resolución del cliente.

---

Demo no oficial, sin fines comerciales. Hecha para presentar una propuesta de sitio a DOV Pastelería.
