# 📄 Guiones - Carpeta de Temas

Coloca aquí los guiones en PDF para cada integrante.

## Formato esperado:

```
Guion.tema1.pdf    → Guión de Rafael García
Guion.tema2.pdf    → Guión de Lorena Gomez
Guion.tema3.pdf    → Guión de Nicolás García
Guion.tema4.pdf    → Guión de Facundo Domínguez
Guion.tema5.pdf    → Guión de Valentin Fernández
Guion.tema6.pdf    → Guión de Santiago Carrillo
```

⚠️ **Importante**: Los nombres deben ser exactamente como se muestran arriba (respetando mayúsculas y puntos).

Si quieres cambiar los nombres o rutas, edita el archivo `src/App.jsx` en la sección `const rutas`:

```javascript
const rutas = {
  guion: (id) => `/archivos/temas/Guion.tema${id}.pdf`,
  // ...
}
```
