# emigrAI BOT EVALUADOR

Bot evaluador inteligente de casos de inmigración en España, potenciado por Google Gemini AI.

## 🌟 Características

- ✅ **Evaluación Inteligente**: Análisis de viabilidad de casos de inmigración mediante IA
- 🌍 **Multiidioma**: Soporte para 9 idiomas (Español, English, Français, العربية, Română, 中文, Português, Български, Українська)
- 📊 **Score de Viabilidad**: Puntuación de 0-100 basada en el análisis del caso
- 💬 **Chat Conversacional**: Interfaz amigable con preguntas guiadas
- 📄 **Generación de PDF**: Exporta informes de evaluación en PDF
- 🎨 **Diseño Responsivo**: Optimizado para desktop y móvil
- 🌐 **Selector de Idiomas Mejorado**: Menú desplegable con códigos de país visibles

## 🚀 Despliegue

- **Producción**: [https://emigrabot-evaluador-musezqlxr.vercel.app](https://emigrabot-evaluador-musezqlxr.vercel.app)
- **GitHub**: [https://github.com/Juampaampudia/emigrabot-evaluador](https://github.com/Juampaampudia/emigrabot-evaluador)

## 💻 Ejecución Local

### Requisitos previos
- Node.js (v16 o superior)
- Una API key de Google Gemini

### Pasos

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/Juampaampudia/emigrabot-evaluador.git
   cd emigrabot-evaluador
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar la API key**

   Edita el archivo `.env.local` y agrega tu API key de Gemini:
   ```
   GEMINI_API_KEY=AIzaSy...
   ```

   Obtén tu API key en: [https://aistudio.google.com/apikey](https://aistudio.google.com/apikey)

4. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```

   La aplicación se abrirá en `http://localhost:3000`

5. **Compilar para producción**
   ```bash
   npm run build
   npm run preview
   ```

## 🛠️ Tecnologías

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 3
- **IA**: Google Gemini 2.5 Flash API
- **Iconos**: Lucide React
- **PDF**: jsPDF
- **Deployment**: Vercel

## 📋 Versiones y Cambios Recientes

### Versión Actual (Enero 2026)

#### Última actualización - 13/01/2026
- ✅ **Mejoras en navegación y UI**:
  - Eliminado botón "Evaluador IA" de la navbar (decorativo, sin función)
  - Eliminado botón de menú hamburguesa en móvil
  - Selector de idiomas unificado para móvil y desktop con menú desplegable
  - Reemplazadas banderas emoji por círculos con códigos de país (mejor compatibilidad entre navegadores)
  - Título de pestaña actualizado a "emigrAI BOT EVALUADOR"
  - Eliminado texto "(Gemini 2.5)" del indicador de estado en línea
  - Soporte ampliado a 9 idiomas: ES, EN, FR, AR, RO, ZH, PT, BG, UK

#### Versión anterior
- ✅ **Nuevo diseño UI mejorado**:
  - Gradiente de fondo azul-dorado con efectos visuales
  - Hero section con títulos grandes y llamativos
  - Chat container con efecto glassmorphism/backdrop-blur
  - Input con borde naranja destacado
  - Animaciones suaves y transiciones fluidas
- ✅ API de Gemini configurada y funcionando
- ✅ Despliegue en Vercel con variables de entorno
- ⚠️ **Navegación simplificada para usuarios finales**:
  - Botón "Gestión" oculto (funcionalidad reservada para agencias)
  - Botón "Área Profesional" oculto (se implementará en futuras fases)
  - Interfaz optimizada para inmigrantes que buscan evaluación de casos

### Funcionalidades Activas
- ✅ **Bot Evaluador**: Chat conversacional con IA
- ✅ **Resultados de Evaluación**: Análisis completo con score de viabilidad
- ✅ **Exportación a PDF**: Genera informes descargables
- ✅ **Selector de idiomas**: 9 idiomas disponibles con menú desplegable
  - 🇪🇸 Español (ES)
  - 🇬🇧 English (EN)
  - 🇫🇷 Français (FR)
  - 🇸🇦 العربية (AR)
  - 🇷🇴 Română (RO)
  - 🇨🇳 中文 (ZH)
  - 🇵🇹 Português (PT)
  - 🇧🇬 Български (BG)
  - 🇺🇦 Українська (UK)

### Funcionalidades Desactivadas (Próximas Fases)
- 🔒 **Gestión de Casos**: Dashboard para agencias (oculto)
- 🔒 **Área Profesional**: Login y funciones avanzadas (oculto)

## 📁 Estructura del Proyecto

```
emigraBOT_EVALUADOR/
├── App.tsx                          # Componente principal
├── components/
│   ├── features/
│   │   ├── EvaluatorChat.tsx       # Chat del evaluador
│   │   ├── EvaluationResult.tsx    # Vista de resultados
│   │   ├── VoiceAssistant.tsx      # Asistente de voz (beta)
│   │   └── ProLoginModal.tsx       # Modal login profesional
│   ├── dashboard/
│   │   └── CaseList.tsx            # Lista de casos (agencias)
│   └── ui/
│       ├── Button.tsx              # Componente botón
│       └── Card.tsx                # Componente tarjeta
├── lib/
│   ├── LanguageContext.tsx         # Contexto multiidioma (9 idiomas)
│   ├── audioUtils.ts               # Utilidades de audio
│   └── utils.ts                    # Utilidades generales
├── types.ts                         # Tipos TypeScript
├── .env.local                       # Variables de entorno (no subir a Git)
└── README.md                        # Este archivo
```

## 🔑 Variables de Entorno

Para desplegar en Vercel u otra plataforma, configura:

- `GEMINI_API_KEY`: Tu API key de Google Gemini

## 📄 Documentación Adicional

Para más detalles técnicos y arquitectura, consulta [RESUMEN_EJECUTIVO.md](./RESUMEN_EJECUTIVO.md)

## 🤝 Contribuciones

Este proyecto está en desarrollo activo. Para reportar bugs o sugerencias, abre un issue en GitHub.

## 📝 Licencia

Todos los derechos reservados © 2026 emigrAI

---

**Desarrollado con ❤️ usando Claude Code**
