# 🔒 Guía de Seguridad - API Routes

## ⚠️ Problema que resolvimos

**ANTES:** Las URLs del backend estaban expuestas en el código JavaScript del cliente usando `NEXT_PUBLIC_*`, lo que permitía a cualquiera ver los endpoints en el código compilado.

**AHORA:** Usamos API Routes de Next.js como proxy, manteniendo las URLs del backend seguras en el servidor.

---

## 🚀 Configuración Local

### 1. Crear archivo de variables de entorno

```bash
# En la raíz del proyecto, copia el archivo de ejemplo
cp .env.example .env.local
```

### 2. Editar `.env.local` con tus valores reales

```env
# Backend URL (mantén esto privado - sin NEXT_PUBLIC_)
API_URL=https://apback.onrender.com

# MercadoPago (puede ser público)
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=APP_USR-tu-key-aqui

# Otros servicios
MERCADOPAGO_CREATE_PREFERENCE_URL=https://mercadopagointegracionap.onrender.com/create_preference
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=tu-pixel-id
```

### 3. Reiniciar el servidor de desarrollo

```bash
npm run dev
```

---

## 📁 Estructura de las API Routes

```
src/app/api/
├── accesorios/
│   ├── route.js          → GET /api/accesorios (lista todos)
│   └── [id]/
│       └── route.js      → GET /api/accesorios/:id (uno específico)
```

### Cómo funcionan:

1. **Cliente** hace fetch a `/api/accesorios`
2. **API Route** (servidor) recibe la petición
3. **API Route** llama a `apback.onrender.com/accesorios` (oculto)
4. **API Route** devuelve los datos al cliente

---

## ✅ Ventajas de este enfoque

- ✅ URLs del backend **NO se exponen** en el código del cliente
- ✅ Control total sobre las peticiones (validación, caché, logs)
- ✅ Posibilidad de agregar autenticación o rate limiting
- ✅ Mejor performance con caché de Next.js
- ✅ Código más mantenible y seguro

---

## 🔄 Migración de otros endpoints

Para migrar otros endpoints (aros, anillos, etc.), sigue este patrón:

### 1. Crear API Route

```javascript
// src/app/api/aros/route.js
import { NextResponse } from 'next/server';

export async function GET() {
    const backendUrl = process.env.API_URL;
    const res = await fetch(`${backendUrl}/aros`);
    const data = await res.json();
    return NextResponse.json(data);
}
```

### 2. Actualizar el archivo de API del cliente

```javascript
// En lugar de:
const res = await fetch(apiAros); // ❌ Llamada directa al backend

// Hacer:
const res = await fetch('/api/aros'); // ✅ Llamada a nuestra API Route
```

---

## 🛡️ Reglas de Seguridad

### Variables con `NEXT_PUBLIC_*`
- ✅ Solo para datos que PUEDEN ser públicos
- ✅ Ejemplo: IDs de tracking, URLs públicas
- ❌ NUNCA para: URLs de backend, API secrets, tokens

### Variables sin `NEXT_PUBLIC_*`
- ✅ Solo accesibles en el servidor
- ✅ Usar en API Routes
- ✅ Para: URLs de backend, credenciales, secrets

---

## 📝 Checklist de Seguridad

- [x] `.env` eliminado del repositorio
- [x] `.env.local` agregado a `.gitignore`
- [x] `.env.example` creado como plantilla
- [x] API Routes creadas para accesorios
- [x] Variables sin `NEXT_PUBLIC_` para backend
- [ ] Migrar resto de endpoints (aros, anillos, etc.)
- [ ] Configurar `.env.local` en producción (Vercel/Railway)

---

## 🚨 Importante

**NUNCA subas archivos `.env` o `.env.local` a GitHub!**

Si accidentalmente subes credenciales:
1. Rota las credenciales inmediatamente
2. Elimina el archivo del historial de Git con `git filter-branch` o BFG Repo-Cleaner
