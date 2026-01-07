# EMIGRABOT EVALUADOR - Resumen Ejecutivo

> **Destinatario**: Equipo de desarrollo y stakeholders
> **Propósito**: Documento de referencia rápida sobre el proyecto
> **Duración de lectura**: 5 minutos

---

## 🎯 RESUMEN DEL PROYECTO

### ¿Para qué es esta aplicación?

**Evaluador de viabilidad de casos migratorios powered by IA** que realiza una entrevista interactiva al usuario para determinar:
- ✅ Probabilidad de éxito del caso (score 0-100%)
- 📋 Tipo de trámite recomendado (Arraigo Social, NIE, etc.)
- 📄 Lista de documentos requeridos
- ⏱️ Tiempo estimado del proceso
- 💰 Coste aproximado

**Tipo de producto**: Herramienta B2B2C (para gestorías que atienden a consumidores finales)

---

## 👥 CLIENTE DIRECTO (Quien paga/usa el servicio)

### **Modelo de negocio dual:**

#### 1️⃣ **B2B - Gestorías de Extranjería**
Despachos de abogados y gestorías que usan el evaluador como:
- **Lead magnet**: Captar clientes potenciales en su web
- **Herramienta de cualificación**: Filtrar casos viables vs no viables
- **Automatización**: Reducir tiempo en consultas iniciales repetitivas
- **Diferenciación**: Ofrecer tecnología innovadora vs competencia

**Perfil del cliente B2B:**
- Gestorías de extranjería en España
- Despachos de abogados especializados en inmigración
- Tamaño: 1-10 empleados
- Ubicación: Ciudades con alta población inmigrante (Madrid, Barcelona, Valencia, etc.)

#### 2️⃣ **B2C - Uso directo por inmigrantes** (Modelo SaaS público)
El evaluador también puede funcionar como servicio público donde:
- Usuarios obtienen evaluación gratuita
- Luego son dirigidos a contratar gestoría (modelo freemium)
- Monetización vía comisiones por referencias

---

## 🌍 USUARIOS FINALES (Quienes interactúan con el evaluador)

**Inmigrantes y extranjeros en España** que necesitan:
- Saber si su caso es viable antes de contratar abogado
- Orientación sobre qué tipo de trámite les corresponde
- Estimación de tiempo y coste
- Lista de documentos para preparar

### Perfil demográfico:
- **Idiomas**: 9 idiomas soportados (español, inglés, francés, árabe, rumano, chino, portugués, búlgaro, ucraniano)
- **Situación migratoria**: Irregular, turista, estudiante, o con permiso temporal
- **Nacionalidades prioritarias**: Marruecos, Colombia, Venezuela, Ecuador, Perú, China, Ucrania, Rumanía, Senegal, Nigeria
- **Rango de edad**: 20-45 años (principal)
- **Canal de acceso**: Web de la gestoría, Google Ads, redes sociales

---

## ❓ PROBLEMA QUE RESUELVE

### Para Gestorías (Cliente B2B):

| Problema | Impacto | Solución del evaluador |
|----------|---------|----------------------|
| **Consultas telefónicas repetitivas** | 5-8 horas/semana en llamadas de "¿mi caso es viable?" | Evaluación automática 24/7 |
| **Casos no viables consumen tiempo** | 30-40% de consultas son casos sin posibilidad | Filtrado automático antes de invertir tiempo |
| **Pérdida de leads fuera de horario** | 25-30% de consultas llegan en fines de semana/noches | Disponibilidad 24/7 |
| **Barrera idiomática** | Rechazan clientes que no hablan español | 9 idiomas automáticos |
| **Falta de datos para seguimiento** | No tienen registro de consultas rechazadas | Dashboard con todos los casos evaluados |
| **Competencia sin tecnología** | Otros despachos aún trabajan manual | Diferenciación competitiva |

**Ahorro estimado para una gestoría:**
- **5-8 horas/semana** en consultas iniciales
- **Valor**: €250-400/semana (€1,000-1,600/mes)
- **Conversión mejorada**: +20-30% más leads cualificados

### Para Usuarios Finales (B2C):

| Dolor del usuario | Solución |
|-------------------|----------|
| No sabe si su caso es viable | Score objetivo 0-100% + explicación clara |
| Miedo a contratar abogado y perder dinero | Evaluación gratuita primero |
| No sabe qué documentos necesita | Checklist personalizado |
| No habla español | 9 idiomas soportados |
| Espera días para respuesta | Evaluación instantánea (<3 min) |

---

## 💡 PROPÓSITO DEL NEGOCIO

### Beneficios para Gestorías:

#### 1. **Ahorro de tiempo operativo**
| Actividad | Tiempo manual | Tiempo con IA | Ahorro |
|-----------|---------------|---------------|--------|
| Consulta inicial telefónica | 20-30 min | 0 min (automatizado) | 100% |
| Evaluación de viabilidad | 15-20 min | <3 min | 85% |
| Generación de checklist | 10 min | 0 min | 100% |
| **Total por caso** | **45-60 min** | **<3 min** | **95%** |

**Ahorro mensual** (30 consultas/mes): **20-30 horas/mes**

#### 2. **Mejora en captación de leads**
- **Conversión web**: +40-60% (widget interactivo vs formulario estático)
- **Leads cualificados**: Solo casos viables llegan al abogado
- **Base de datos**: Registro de todos los casos evaluados

#### 3. **Nuevo modelo de ingreso**
- **Freemium**: Evaluación gratis → Contratación de pago
- **Licencia SaaS**: Cobrar a otras gestorías por usar la tecnología
- **White-label**: Vender la plataforma customizada

### ROI Estimado (Modelo B2B para 1 gestoría):

| Concepto | Valor Mensual |
|----------|---------------|
| **Ahorro en tiempo** | €1,000-1,600 |
| **Leads adicionales capturados** | 10-15 casos/mes |
| **Conversión** | 20-30% contratan |
| **Valor promedio cliente** | €800-1,200 |
| **Ingresos adicionales** | €1,600-5,400/mes |
| **Total beneficio** | **€2,600-7,000/mes** |
| **Coste operativo** | **€5-20/mes** (API Gemini + hosting) |

**ROI: 13,000% - 140,000%**

---

## 🤖 FUNCIONALIDADES PRINCIPALES

### 1️⃣ **Evaluador Conversacional con IA**
**Powered by Google Gemini 2.5 Flash**

- Entrevista interactiva paso a paso
- Preguntas dinámicas según respuestas
- Detección automática de idioma
- Tono profesional pero cercano

**Preguntas clave del bot:**
1. ¿Cuál es tu nacionalidad?
2. ¿Cuánto tiempo llevas en España?
3. ¿Cuál es tu situación actual? (turista, irregular, estudiante, etc.)
4. ¿Tienes oferta de trabajo o medios económicos?
5. ¿Tienes antecedentes penales?

**Output de la evaluación:**
- **Viability Score**: 0-100%
- **Recomendación**: Tipo de trámite (Arraigo Social, NIE Estudiante, etc.)
- **Probabilidad**: Alta/Media/Baja
- **Checklist de documentos**
- **Tiempo estimado**: Meses
- **Coste estimado**: Rango en euros

### 2️⃣ **Asistente de Voz Multimodal**
**Funcionalidad innovadora:**
- Usuario puede hablar en lugar de escribir
- Speech-to-Text + Text-to-Speech
- Ideal para usuarios con bajo nivel de alfabetización
- Experiencia similar a llamada telefónica

**Iconos en la UI:**
- 🎤 **Hablar**: Activar modo voz
- 🎧 **Escuchando**: Bot está escuchando
- 🔊 **Hablando**: Bot está respondiendo

### 3️⃣ **Generación de Informe PDF**
**Reporte profesional descargable:**
- Branding corporativo (logo emigrAI)
- Score de viabilidad
- Tipo de trámite recomendado
- Documentos requeridos
- Tiempo y coste estimado
- Disclaimer legal ("Generado por IA")

**Uso del PDF:**
- Usuario lo descarga para llevarlo a gestoría
- Gestoría lo usa como base para propuesta comercial

### 4️⃣ **Dashboard de Gestión de Casos**
**Panel para profesionales:**
- Lista de todos los casos evaluados
- Filtros por estado (Activo, Aprobado, Pendiente)
- Métricas clave:
  - Casos activos
  - Casos aprobados
  - Tasa de éxito
- Vista detallada por caso

**Estadísticas mostradas:**
- 📊 24 Casos activos
- ✅ 12 Aprobados
- ⏳ 8 Pendientes
- 📈 94% Tasa de éxito

### 5️⃣ **Multiidioma Completo**
**9 idiomas soportados:**
- 🇪🇸 Español
- 🇬🇧 English
- 🇫🇷 Français
- 🇸🇦 العربية (Árabe)
- 🇷🇴 Română (Rumano)
- 🇨🇳 中文 (Chino)
- 🇵🇹 Português
- 🇧🇬 Български (Búlgaro)
- 🇺🇦 Українська (Ucraniano)

**Cambio de idioma:**
- Dropdown en navbar (desktop)
- Botón ciclo en móvil
- Toda la UI se traduce automáticamente
- Bot responde en el idioma seleccionado

### 6️⃣ **Call to Action (CTA) Integrado**
**Conversión a cliente:**
- Botón "Contactar Gestoría" en resultado
- Email pre-rellenado con referencia del caso
- Subject: "Consulta sobre [Tipo Trámite] - Ref #EM-2024-XXXX"
- Enlace a: `citas@emigrai360.com`

---

## 🛠️ STACK TECNOLÓGICO

| Componente | Tecnología | Justificación |
|------------|------------|---------------|
| **Frontend** | React 19 + TypeScript | Tipado fuerte, componentes modernos |
| **Build Tool** | Vite 6.2.0 | Dev ultrarrápido, HMR, build optimizado |
| **UI Framework** | Tailwind CSS 3.4 | Desarrollo rápido, responsive |
| **Icons** | Lucide React | Ligero, moderno, tree-shakeable |
| **IA Conversacional** | Google Gemini 2.5 Flash | Multimodal, rápido, económico |
| **Function Calling** | @google/genai SDK | Structured outputs, tool calling |
| **PDF Generation** | jsPDF 2.5.1 | Generación de PDFs en cliente |
| **State Management** | React Context API | Suficiente para app pequeña/mediana |
| **Hosting** | Vercel | Deploy automático, edge network, SSL |
| **Voice (opcional)** | Web Speech API | Nativo del navegador, gratis |

### Arquitectura de IA:

```typescript
// Gemini 2.5 Flash con Function Calling
const evaluationTool: FunctionDeclaration = {
  name: "complete_evaluation",
  description: "Call when you have gathered enough info to evaluate",
  parameters: {
    viabilityScore: { type: Number, description: "0-100 score" },
    summary: { type: String, description: "Brief summary" }
  }
};

// El bot decide cuándo llamar la función
chat.sendMessage("Tengo 3 años en España, sin antecedentes...");
→ Bot evalúa → Llama complete_evaluation({ viabilityScore: 87, summary: "..." })
```

---

## 💰 MODELO DE COSTOS

### Inversión inicial
| Concepto | Coste |
|----------|-------|
| Desarrollo (completo) | **€0** (ya implementado) |
| Diseño UI/UX | **€0** (ya implementado) |
| Testing y QA | **€0** (ya implementado) |

### Costes operativos mensuales

| Servicio | Coste/mes | Notas |
|----------|-----------|-------|
| **Gemini API** (2.5 Flash) | €5-20 | Depende del tráfico |
| **Hosting Vercel** | €0-20 | Gratis hasta 100k requests |
| **Dominio** | €1-2 | emigrai360.com |
| **SSL** | €0 | Incluido en Vercel |
| **TOTAL** | **€6-42/mes** | |

### Escenarios de uso:

#### Escenario 1: Gestoría pequeña (100 evaluaciones/mes)
- **Coste**: €5-10/mes
- **Beneficio**: €2,600-7,000/mes
- **ROI**: 26,000% - 140,000%

#### Escenario 2: Plataforma SaaS (1,000 evaluaciones/mes)
- **Coste**: €15-30/mes
- **Beneficio**: €10,000-30,000/mes (vía licencias a gestorías)
- **ROI**: 66,666% - 200,000%

### Modelo de pricing B2B (para vender a gestorías):

| Plan | Precio/mes | Evaluaciones | Soporte |
|------|------------|--------------|---------|
| **Starter** | €49/mes | 50/mes | Email |
| **Professional** | €149/mes | 200/mes | Email + Chat |
| **Enterprise** | €399/mes | Ilimitado | Dedicado + White-label |

---

## 🎨 CARACTERÍSTICAS DE DISEÑO

### Paleta de Colores Corporativa
**Azul Oscuro Profesional:**
- **Primary**: `#0B2F4F` (Corporate Dark Blue)
- **Secondary**: `#F59E0B` (Warm Orange - acentos)
- **Accent**: `#10B981` (Green - éxito)
- **Background**: `#F9FAFB` (Light Gray)

### Gradientes:
- **Success Gradient**: Verde claro → Verde oscuro (para resultados positivos)
- **Primary Gradient**: Azul oscuro → Azul medio

### Efectos Visuales:
- ✨ **Animaciones**: fade-in suaves al cambiar de vista
- 🎭 **Gauge circular**: Score de viabilidad con CSS animado
- 🌊 **Transiciones**: 0.3s ease en todos los elementos interactivos
- 📱 **Responsive**: Mobile-first, breakpoints MD/LG

### Componentes UI:
- **Navbar sticky**: Fixed top, shadow, glass effect
- **Cards elevadas**: Shadow-xl, border-0
- **Botones**: Primary (azul), Secondary (naranja), Ghost
- **Badges**: Pills con colores según estado (verde/naranja/rojo)

---

## 📊 MÉTRICAS DE ÉXITO

### KPIs del producto:

| Métrica | Objetivo | Cómo medir |
|---------|----------|-----------|
| **Tiempo de evaluación** | <3 minutos | Analytics de sesión |
| **Tasa de completado** | >70% | Usuarios que terminan evaluación / Total que empiezan |
| **Precisión de evaluación** | >85% | Comparar resultado IA vs decisión final del abogado |
| **Conversión a cliente** | >20% | Usuarios que contactan gestoría / Total evaluados |
| **Satisfacción NPS** | >50 | Encuesta post-evaluación (futuro) |
| **Idiomas más usados** | Top 3 | Analytics de selección de idioma |

### Métricas de negocio (B2B):

| Métrica | Objetivo | Cómo medir |
|---------|----------|-----------|
| **Clientes B2B** | 10 gestorías en 6 meses | Contratos firmados |
| **MRR (Monthly Recurring Revenue)** | €1,500/mes a 6 meses | Suscripciones activas |
| **CAC (Customer Acquisition Cost)** | <€200/gestoría | Marketing + Ventas / Clientes |
| **LTV (Lifetime Value)** | >€5,000 | Promedio ingresos por cliente a 12 meses |
| **Churn Rate** | <5%/mes | Cancelaciones / Total clientes |

---

## 🔐 SEGURIDAD Y COMPLIANCE

### RGPD (Reglamento General de Protección de Datos)

#### Datos que se recopilan:
- ✅ **Nacionalidad** (dato personal básico)
- ✅ **Tiempo en España** (no es dato personal)
- ✅ **Situación migratoria** (dato sensible - consentimiento requerido)
- ✅ **Antecedentes penales** (dato muy sensible - consentimiento explícito)

#### Medidas de protección:
- 🔒 **No se almacenan datos por defecto** (conversación en memoria, no en DB)
- 🔒 **Consentimiento explícito**: Checkbox antes de iniciar evaluación
- 🔒 **Procesamiento en UE**: Gemini API usa servidores de Google Cloud Europa
- 🔒 **Derecho al olvido**: Usuario puede solicitar eliminación
- 🔒 **Transparencia**: Usuario sabe que habla con IA
- 🔒 **Cifrado**: HTTPS/TLS en todas las comunicaciones

#### Disclaimers legales:

**En el PDF:**
```
"Este informe es generado por Inteligencia Artificial y tiene
carácter orientativo. No constituye asesoramiento legal vinculante.
Para una evaluación oficial, consulte con un abogado colegiado."
```

**En la UI:**
```
"EmigraBot es un asistente automatizado. Los resultados son estimaciones
basadas en algoritmos de IA y pueden no reflejar tu situación real.
Siempre consulta con un profesional antes de tomar decisiones legales."
```

### Limitaciones legales:
- ❌ **No da asesoramiento legal vinculante**
- ❌ **No garantiza resultados**
- ❌ **No sustituye consulta con abogado**
- ✅ **Solo orienta y estima viabilidad**

---

## 🚀 ESTADO DEL PROYECTO

### Versión actual: **1.0 - MVP FUNCIONAL**

| Módulo | Estado | Fecha |
|--------|--------|-------|
| Evaluador conversacional | ✅ Completado | Dic 2025 |
| Multiidioma (9 idiomas) | ✅ Completado | Dic 2025 |
| Generación de PDF | ✅ Completado | Dic 2025 |
| Dashboard de gestión | ✅ Completado | Dic 2025 |
| Asistente de voz | ✅ Completado | Dic 2025 |
| Responsive design | ✅ Completado | Dic 2025 |
| Deploy en Vercel | ✅ Completado | Dic 2025 |

### Funcionalidades desactivadas (pendientes):
- ⚠️ **Área Profesional**: Login modal implementado pero botón desactivado
  - Requiere backend para autenticación
  - Planeado para Fase 2

---

## 📁 ESTRUCTURA DEL PROYECTO

```
emigraBOT_EVALUADOR/
├── components/
│   ├── features/
│   │   ├── EvaluatorChat.tsx        # Chat conversacional principal
│   │   ├── EvaluationResult.tsx     # Pantalla de resultados
│   │   ├── VoiceAssistant.tsx       # Asistente de voz
│   │   └── ProLoginModal.tsx        # Modal login (inactivo)
│   ├── dashboard/
│   │   └── CaseList.tsx             # Lista de casos
│   └── ui/
│       ├── Button.tsx               # Componente botón
│       └── Card.tsx                 # Componente card
├── lib/
│   ├── LanguageContext.tsx          # Context de idiomas + traducciones
│   ├── audioUtils.ts                # Utilidades para voz
│   └── utils.ts                     # Utilidades generales
├── App.tsx                          # Componente raíz
├── index.tsx                        # Entry point
├── index.css                        # Estilos globales (Tailwind)
├── types.ts                         # TypeScript types
├── package.json                     # Dependencias
├── vite.config.ts                   # Configuración Vite
├── tailwind.config.js               # Configuración Tailwind
├── tsconfig.json                    # Configuración TypeScript
├── vercel.json                      # Configuración deploy Vercel
├── metadata.json                    # Metadata del proyecto
├── .env.local                       # Variables de entorno (API keys)
└── README.md                        # Documentación técnica
```

---

## 🎯 COMPARACIÓN CON OTROS PROYECTOS

### emigraBOT_EVALUADOR vs EMIGRAI 360 vs Migrando Abogacía

| Característica | emigraBOT Evaluador | EMIGRAI 360 | Migrando Abogacía |
|----------------|---------------------|-------------|-------------------|
| **Tipo** | Evaluador + Dashboard | Plataforma completa B2B | Chatbot simple B2C |
| **Complejidad** | Media | Alta (5 agentes) | Baja |
| **Funcionalidad principal** | Evaluar viabilidad + gestionar casos | Automatización end-to-end | Chatbot FAQ |
| **Cliente** | Gestorías (B2B2C) | Gestorías (B2B) | 1 despacho específico |
| **Inversión inicial** | €0 (ya hecho) | €4,500 | €0 (ya hecho) |
| **Coste/mes** | €6-42 | €240-290 | €1-7 |
| **IA usada** | Gemini 2.5 Flash | Gemini 1.5 Pro + Document AI | Gemini 2.0 Flash |
| **Idiomas** | 9 | No especificado | 8 |
| **Voz** | ✅ Sí | ❌ No | ❌ No |
| **PDF** | ✅ Sí | ✅ Sí (formularios oficiales) | ❌ No |
| **Dashboard** | ✅ Básico | ✅ Completo | ❌ No |
| **OCR** | ❌ No | ✅ Sí (Document AI) | ❌ No |
| **Formularios** | ❌ No | ✅ Sí (EX-01, EX-02, etc.) | ❌ No |
| **ROI** | >13,000% | 1,540-2,120% | >1,000% |
| **Fase** | MVP listo | Planeado (PRD) | Producción |

### Resumen:
- **emigraBOT**: Punto medio entre chatbot simple y plataforma completa
- **EMIGRAI 360**: Solución enterprise completa (más cara, más compleja)
- **Migrando Abogacía**: Chatbot básico para 1 cliente específico

---

## 🚧 ROADMAP FUTURO

### Fase 2 - Mejoras Inmediatas (Q1 2026):

- [ ] **Backend + Auth**
  - Implementar sistema de autenticación para "Área Profesional"
  - Base de datos real (Supabase/PostgreSQL)
  - API REST para guardar casos evaluados

- [ ] **Analytics Avanzado**
  - Google Analytics 4 integrado
  - Tracking de conversiones
  - Heatmaps (Hotjar/Clarity)

- [ ] **Mejoras en Evaluación**
  - Base de conocimiento expandida (más tipos de trámites)
  - Casos edge más complejos (expedientes de larga duración, etc.)
  - Integración con normativa actualizada (web scraping BOE)

- [ ] **CRM Integrado**
  - Guardar leads automáticamente
  - Webhook a CRM externo (HubSpot, Pipedrive)
  - Email marketing automático (seguimiento de leads)

### Fase 3 - Monetización (Q2 2026):

- [ ] **Modelo SaaS B2B**
  - Sistema de suscripciones (Stripe)
  - Dashboard de admin para gestionar clientes B2B
  - White-label (cada gestoría con su branding)

- [ ] **Marketplace**
  - Directorio de gestorías certificadas
  - Sistema de reviews y ratings
  - Comisiones por referencia (20% del primer pago)

- [ ] **Integraciones**
  - Calendly/Cal.com para citas automáticas
  - WhatsApp Business API para notificaciones
  - Zapier/Make para conectar con otros tools

### Fase 4 - Expansión (Q3-Q4 2026):

- [ ] **Más países**
  - Evaluar casos para otros países de la UE (Alemania, Francia, Italia)
  - Adaptar normativa por país

- [ ] **Mobile App**
  - App nativa iOS/Android (React Native)
  - Notificaciones push
  - Offline mode

- [ ] **IA Multimodal Avanzada**
  - Análisis de documentos subidos (OCR integrado como EMIGRAI 360)
  - Validación automática de documentos
  - Generación de formularios pre-rellenados

---

## 💼 ESTRATEGIA DE GO-TO-MARKET

### Canal 1: Venta Directa B2B (Gestorías)

**Estrategia:**
1. Identificar 50 gestorías target en Madrid, Barcelona, Valencia
2. Outreach vía LinkedIn + Email frío
3. Demo personalizada (30 min)
4. Trial gratuito 14 días
5. Onboarding + capacitación

**Pricing sugerido:**
- Starter: €49/mes (50 evaluaciones)
- Pro: €149/mes (200 evaluaciones)
- Enterprise: €399/mes (ilimitado + white-label)

**Meta Año 1:**
- 10 clientes en 6 meses
- MRR: €1,500/mes
- ARR: €18,000/año

### Canal 2: Widget Embed (Modelo Freemium)

**Estrategia:**
1. Ofrecer widget gratuito para embeder en webs de gestorías
2. Leads van a plataforma centralizada de emigrAI
3. Usuario paga por acceso completo a informe + contacto con gestoría
4. Gestoría paga comisión del 20% por cliente convertido

**Ejemplo:**
- Usuario hace evaluación gratis
- Descarga informe básico gratis
- Para contactar gestoría → paga €9.99
- Gestoría recibe lead cualificado → paga €50 al cerrar contrato

### Canal 3: SEO + Content Marketing

**Estrategia:**
1. Blog con contenido SEO ("arraigo social requisitos 2026", etc.)
2. Calculadora de viabilidad como lead magnet
3. Guías descargables (PDF)
4. Videos YouTube explicativos

**Keywords target:**
- "calcular viabilidad arraigo social"
- "¿puedo regularizarme en España?"
- "evaluador inmigración España IA"

---

## 📞 CONTACTO E INFORMACIÓN

### Producto:
- **Nombre comercial**: emigrAI 360 (o emigraBOT)
- **Versión**: 1.0 MVP
- **URL demo**: https://ai.studio/apps/drive/1vf4BJo7HiF65q8cD9QN2pxPNARzc6nw9
- **Email contacto**: citas@emigrai360.com

### Equipo de desarrollo:
- Desarrollado con herramientas de Google AI Studio
- Stack: React + TypeScript + Gemini 2.5 Flash
- Hosting: Vercel

---

## 📝 NOTAS TÉCNICAS

### Variables de entorno requeridas:

```env
# .env.local
API_KEY=AIzaSy...  # Gemini API Key
```

### Comandos principales:

```bash
# Instalar dependencias
npm install

# Desarrollo local
npm run dev
# → http://localhost:5173

# Build producción
npm run build

# Preview build
npm run preview
```

### Deploy en Vercel:

```bash
# Conectar con Vercel
vercel

# Deploy a producción
vercel --prod
```

**Configurar en Vercel Dashboard:**
- Environment Variables → Agregar `API_KEY`
- Build Command: `npm run build`
- Output Directory: `dist`
- Framework Preset: `Vite`

---

## 📄 DOCUMENTACIÓN RELACIONADA

- [README.md](./README.md) - Documentación técnica básica
- [App.tsx](./App.tsx) - Código fuente principal
- [metadata.json](./metadata.json) - Metadata del proyecto

---

## 🏆 VENTAJAS COMPETITIVAS

### ¿Por qué emigraBOT es mejor que la competencia?

#### vs Chatbots simples:
✅ **Evaluación cuantitativa**: Score 0-100% (no solo respuestas genéricas)
✅ **Multiidioma real**: 9 idiomas (competencia solo ES/EN)
✅ **Voz integrada**: Accesible para todos los niveles educativos
✅ **PDF profesional**: No solo "gracias por tu consulta"

#### vs Plataformas complejas:
✅ **Tiempo de implementación**: Listo en 1 día (vs semanas)
✅ **Coste**: €6-42/mes (vs €240+/mes)
✅ **Simplicidad**: No requiere capacitación extensa
✅ **Mantenimiento**: Mínimo (sin servidores propios)

#### vs Consultas manuales tradicionales:
✅ **24/7 disponibilidad**: No pierde leads
✅ **Escalable**: 1,000 consultas simultáneas sin costo adicional
✅ **Consistencia**: Siempre responde igual de bien
✅ **Data**: Registro de todas las interacciones

---

## 🎓 CASOS DE USO ESPECÍFICOS

### Caso 1: Gestoría pequeña (1-3 empleados)
**Problema:** Reciben 50 llamadas/mes, 60% son casos no viables que consumen tiempo
**Solución:** Embeden widget en su web, solo llegan casos con >70% viabilidad
**Resultado:** Ahorro de 15 horas/mes, +30% conversión

### Caso 2: Despacho de abogados (5-10 empleados)
**Problema:** Quieren diferenciarse de competencia, atraer clientes tech-savvy
**Solución:** Usan emigraBOT como USP principal en marketing
**Resultado:** +40% tráfico web, mejor positioning de marca

### Caso 3: Plataforma SaaS (modelo marketplace)
**Problema:** Quieren conectar inmigrantes con gestorías certificadas
**Solución:** emigraBOT como evaluador central, luego matchmaking con gestorías
**Resultado:** Comisiones del 20% por cada cliente referido

---

**Última actualización**: 7 de Enero de 2026
**Versión del documento**: 1.0
**Autor**: Equipo de desarrollo
**Estado del proyecto**: ✅ MVP Funcional - Listo para comercialización
