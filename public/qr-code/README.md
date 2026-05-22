# 📱 Código QR

Coloca aquí la imagen del código QR que los usuarios deben escanear para acceder a la página.

## Formato esperado:

```
qr-code.png    → Código QR de acceso a la página
```

⚠️ **Importante**: 
- El archivo DEBE llamarse exactamente `qr-code.png` y puedes sobrescribirlo con la imagen que te pasaron.
- Como alternativa el sitio también buscará `site-qr.png` si el navegador no puede cargar `qr-code.png`.
- La imagen debe ser PNG (recomendado), y se mostrará en la sección "QR" como una imagen grande y legible.

Para sobrescribir el QR desde PowerShell (ejemplo):

```
Copy-Item -Path "C:\ruta\a\tu\imagen.png" -Destination "public\qr-code\qr-code.png" -Force
```

Después de reemplazar la imagen, recarga la página en el navegador para ver el cambio.

## Cómo crear el código QR:

1. Usa una herramienta online como:
   - https://www.qr-code-generator.com/
   - https://qr.io/
   - https://www.the-qr-code-generator.com/

2. Ingresa la URL de tu página (ejemplo: `https://tu-dominio.netlify.app`)

3. Descarga la imagen como PNG

4. Colócala en esta carpeta con el nombre `qr-code.png`
