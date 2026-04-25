# BasketIQ — Track R: Domain Model Lab
## Estrategia de modelos especializados para baloncesto formativo

**Fecha:** Abril 2026  
**Estado:** Documento de análisis / base para épicas futuras  
**Horizonte:** I+D 2026–2027, no prioritario para el MVP inmediato  
**Objetivo principal:** crear una línea estratégica para modelos especializados en texto dentro del dominio BasketIQ, orientada a reducción de coste, escalabilidad, soberanía técnica y diferenciación para ayudas europeas.

---

## 1. Resumen ejecutivo

La idea de crear modelos especializados en el contexto del baloncesto formativo tiene sentido como **rama de I+D progresiva**, siempre que no se plantee como entrenar un modelo fundacional desde cero.

La vía correcta para BasketIQ sería:

> partir de modelos open-weight existentes, crear datasets propios del dominio, evaluar tareas concretas, ajustar modelos mediante adapters/fine-tuning ligero y desplegar modelos locales para tareas asíncronas o de coste repetitivo.

El objetivo no sería reemplazar desde el primer día a GPT, Claude, Gemini u otros modelos comerciales, sino construir una **capacidad propia progresiva** que permita:

1. **Reducir costes operativos** en tareas repetitivas y batch.
2. **Aumentar privacidad y control** sobre determinados datos del club.
3. **Construir propiedad intelectual real** alrededor de datasets, adapters, benchmarks y modelos especializados.
4. **Reforzar la narrativa europea** de innovación tecnológica propia, especialmente para EIC, NEOTEC, Cheque Innovación, colaboraciones universitarias y futuras convocatorias de I+D.
5. **Evitar dependencia completa de APIs americanas** en la visión a medio plazo, aunque se usen durante la fase inicial por calidad y velocidad.

La tesis principal es:

> BasketIQ no debe competir por tener “el mejor modelo generalista”, sino por tener el mejor sistema especializado de conocimiento, agentes, datasets y modelos auxiliares para baloncesto formativo.

---

## 2. Por qué esta línea tiene sentido para BasketIQ

### 2.1 Reducción futura de coste

Muchas tareas de BasketIQ pueden generar un consumo alto de tokens si se ejecutan siempre con modelos comerciales:

- generación de crónicas;
- resumen de sesiones;
- extracción de entidades desde texto libre;
- limpieza de transcripciones;
- clasificación de feedback;
- generación de borradores;
- análisis nocturno de sesiones;
- revisión de relaciones candidatas del grafo;
- creación de resúmenes por rol;
- preprocesamiento de datos para el agente;
- generación de preguntas para validación experta.

Estas tareas no siempre requieren el modelo más potente del mercado. Muchas son tareas repetibles, de dominio, con outputs relativamente estructurados. Por eso pueden migrar progresivamente a modelos locales o autoalojados.

### 2.2 Escalabilidad

Si BasketIQ crece a varios clubes, el volumen de tareas asíncronas puede crecer mucho:

- cada entrenamiento produce señales;
- cada partido produce crónicas y análisis;
- cada entrenador genera feedback;
- cada jugador podría producir respuestas o evidencias;
- cada coordinador necesita resúmenes;
- cada director técnico necesita reporting.

En ese escenario, usar siempre modelos comerciales de alta gama puede convertirse en una carga económica importante.

Un modelo local especializado no tiene coste por token al proveedor del modelo. Tiene coste de infraestructura, mantenimiento y electricidad/cloud, pero puede ser más eficiente para tareas repetitivas.

### 2.3 Propiedad intelectual

El modelo en sí puede no ser la mayor barrera. La barrera real es el conjunto:

- corpus de conversaciones reales del dominio;
- sesiones de entrenamiento estructuradas;
- feedback experto;
- dataset de ejercicios y progresiones;
- crónicas corregidas;
- reglas de validación;
- evaluaciones semánticas;
- benchmarks BasketIQ;
- adapters especializados;
- integración con grafo y agentes.

Este conjunto sí puede ser difícil de copiar.

### 2.4 Diferenciación frente a “otro chatbot”

Una narrativa débil sería:

> usamos ChatGPT para responder preguntas de entrenadores.

Una narrativa mucho más fuerte sería:

> BasketIQ construye un sistema de inteligencia deportiva especializado que combina grafo de conocimiento, agentes operativos, datos reales del club y modelos propios ajustados al dominio del baloncesto formativo.

### 2.5 Encaje con estrategia europea

En la fase inicial es lógico utilizar modelos comerciales existentes, muchos de ellos americanos, porque ofrecen velocidad, calidad y bajo coste de arranque.

Pero para una estrategia europea a futuro, especialmente ante convocatorias competitivas, es más interesante mostrar una evolución hacia:

- soberanía técnica progresiva;
- control de datos;
- auditabilidad;
- reducción de dependencia externa;
- cumplimiento regulatorio;
- especialización de dominio;
- capacidad de ejecutar modelos en infraestructura controlada.

Esto encaja especialmente bien con el contexto del AI Act, la preocupación europea por gobernanza, trazabilidad y cumplimiento, y el interés de las ayudas europeas por innovación defendible y no meramente integradora.

---

## 3. Qué NO estamos proponiendo

### 3.1 No entrenar un modelo fundacional desde cero

Entrenar desde cero un modelo grande sería inviable para BasketIQ en esta fase:

- coste de datos muy alto;
- coste de GPU muy alto;
- necesidad de equipo especializado;
- evaluación compleja;
- pocas ventajas frente a usar modelos open-weight existentes.

No es el camino.

### 3.2 No sustituir inmediatamente APIs comerciales

Durante 2026, para el MVP y las primeras validaciones, lo razonable será seguir usando modelos comerciales para:

- razonamiento complejo;
- generación sensible de calidad;
- interacciones visibles con usuarios;
- tareas donde todavía no existe dataset propio suficiente.

La rama de modelos debe crecer como laboratorio, no como bloqueo del producto.

### 3.3 No crear un “chatbot local” genérico

El objetivo no es instalar un modelo local que responda de forma genérica sobre baloncesto.

El objetivo es crear **modelos especializados en tareas concretas**:

- extracción;
- clasificación;
- validación;
- generación de crónicas;
- transformación de texto en estructura;
- análisis batch;
- soporte a agentes.

### 3.4 No confundir modelo con fuente de verdad

La fuente de verdad de BasketIQ debe seguir siendo:

- el grafo de conocimiento;
- la documentación validada;
- las reglas del dominio;
- las fuentes citables;
- el feedback experto;
- el historial operativo.

El modelo puede ayudar a interpretar, redactar, clasificar o proponer, pero no debe convertirse en una fuente opaca de verdad.

---

## 4. Definición del Track R

## Track R — BasketIQ Domain Model Lab

### Objetivo

Crear una línea de I+D para desarrollar capacidades propias de modelos especializados en texto para baloncesto formativo.

### Objetivos principales

1. Reducir costes de inferencia en tareas repetitivas.
2. Ejecutar tareas asíncronas en local o infraestructura propia.
3. Crear datasets y benchmarks propios.
4. Desarrollar adapters/modelos especializados por tarea.
5. Aportar IP y defensibilidad tecnológica.
6. Reforzar la narrativa de innovación europea.
7. Alimentar y mejorar el grafo de conocimiento y los agentes BasketIQ.

### No objetivos 2026

- No reemplazar al stack comercial del MVP.
- No entrenar un modelo fundacional.
- No exponer un modelo local a usuarios finales sin evaluación fuerte.
- No convertir esta línea en dependencia crítica del piloto con el club.

### Resultado deseado a medio plazo

Una familia de capacidades internas como:

- `BasketIQ-U18-Extractor-v1`
- `BasketIQ-Feedback-Classifier-v1`
- `BasketIQ-Chronicle-Generator-v1`
- `BasketIQ-Knowledge-Curator-v1`
- `BasketIQ-Session-Summarizer-v1`

No necesariamente como modelos completos independientes, sino posiblemente como adapters LoRA/QLoRA sobre modelos base open-weight.

---

## 5. Open-weight: modelo de consumo y colaboración

### 5.1 Qué significa open-weight

Un modelo open-weight es un modelo cuyos pesos están disponibles para descargar y ejecutar en infraestructura propia, bajo una licencia concreta.

No significa necesariamente open source en sentido estricto. Puede haber restricciones.

### 5.2 Diferencia con API comercial

| Elemento | API comercial | Modelo open-weight |
|---|---|---|
| Infraestructura | La pone el proveedor | La pones tú o tu cloud |
| Coste | Por tokens/API | Hardware, cloud, electricidad y mantenimiento |
| Control | Bajo/medio | Alto |
| Privacidad | Depende del proveedor y contrato | Mayor control si se despliega bien |
| Calidad inicial | Muy alta | Variable según modelo/tamaño |
| Mantenimiento | Bajo | Medio/alto |
| Fine-tuning | Limitado o gestionado | Controlable por ti |
| Licencia | Términos del proveedor | Licencia específica del modelo |

### 5.3 Coste real

La descarga puede ser gratuita, pero no existe coste cero.

Costes reales:

- GPU o CPU local;
- servidor/cloud;
- electricidad;
- almacenamiento;
- mantenimiento;
- monitorización;
- ingeniería MLOps;
- evaluación;
- seguridad;
- cumplimiento legal.

### 5.4 Uso comercial

Cada modelo tiene su licencia. Hay que revisar:

- si permite uso comercial;
- si permite fine-tuning;
- si permite redistribuir adapters;
- si permite servirlo a terceros;
- si exige atribución;
- si tiene restricciones por tamaño de empresa o volumen de usuarios;
- si restringe determinados usos.

### 5.5 Estrategia correcta para BasketIQ

No elegir un único modelo para siempre.

Crear un banco de pruebas con varios modelos base y evaluar:

- calidad en español;
- calidad en lenguaje deportivo;
- adherencia a JSON;
- coste de inferencia;
- latencia local;
- facilidad de fine-tuning;
- licencia;
- facilidad de despliegue.

---

## 6. Diferencia entre modelo, adapter, agente y grafo

### 6.1 Modelo

Capacidad de IA que transforma una entrada en una salida.

Ejemplos:

- extraer entidades;
- resumir;
- redactar;
- clasificar;
- sugerir;
- responder.

### 6.2 Adapter LoRA/QLoRA

Capa pequeña entrenada sobre un modelo base. Permite especializar un modelo sin reentrenarlo entero.

Ejemplo:

- modelo base: Llama, Gemma, Mistral o Qwen;
- adapter BasketIQ: aprende a convertir notas de entrenador en estructura JSON.

Ventaja:

- más barato que fine-tuning completo;
- más pequeño;
- más fácil de versionar;
- se puede probar por tarea.

### 6.3 Agente

Sistema que usa modelos y herramientas para cumplir un objetivo.

Ejemplo:

- consultar grafo;
- leer histórico;
- generar propuesta;
- pedir validación;
- enviar WhatsApp;
- registrar feedback;
- actualizar estado.

### 6.4 Grafo de conocimiento

Fuente estructurada y gobernada de conocimiento BasketIQ:

- ejercicios;
- objetivos;
- progresiones;
- errores;
- relaciones;
- fuentes;
- confianza;
- validaciones.

### 6.5 Relación ideal

```text
Usuario / evento operativo
  ↓
Agente BasketIQ
  ↓
Consulta herramientas:
  - grafo de conocimiento
  - datos operativos
  - documentos/RAG
  - modelos especializados
  ↓
Modelo especializado produce:
  - extracción
  - clasificación
  - resumen
  - borrador
  - propuesta
  ↓
Agente valida / pide validación / ejecuta / guarda
```

La tesis clave:

> El modelo es capacidad. El agente es producto. El grafo es la fuente de verdad. El dataset es la ventaja defensible.

---

## 7. Oportunidades de modelos especializados BasketIQ

## 7.1 Modelo 1 — BasketIQ Extractor

### Objetivo

Convertir texto libre de entrenadores, entrevistas, notas post-sesión o análisis de partido en estructura JSON.

### Entradas

- nota de entrenamiento;
- dictado por WhatsApp;
- transcripción de entrevista;
- comentario experto;
- crónica;
- observación de partido.

### Salidas

```json
{
  "categoria": "U18",
  "tipo_evento": "entrenamiento",
  "objetivos": [],
  "contenidos": [],
  "ejercicios": [],
  "errores_detectados": [],
  "correcciones": [],
  "relaciones_candidatas": [],
  "confianza": 0.0
}
```

### Valor

- alimenta el grafo;
- reduce coste de extracción con APIs comerciales;
- crea estructura para aprendizaje;
- permite análisis batch nocturno;
- es evaluable.

### Prioridad recomendada

Muy alta dentro del Track R.

### Por qué debe ser el primer modelo

Es más fácil evaluar si una extracción es correcta que evaluar si una recomendación deportiva es buena. Además, mejora la base estructural de BasketIQ.

---

## 7.2 Modelo 2 — BasketIQ Feedback Classifier

### Objetivo

Clasificar feedback experto o feedback operativo.

### Clases iniciales

- confirmación;
- corrección;
- ampliación;
- contradicción;
- cambio estructural;
- ruido/no accionable;
- requiere revisión humana.

### Entrada

> “Este ejercicio sí funciona para U18, pero solo si antes han trabajado bien spacing y extra pass.”

### Salida

```json
{
  "tipo_feedback": "ampliacion",
  "relaciones": [
    {
      "tipo": "REQUIERE_PRECONDICION",
      "origen": "ejercicio_actual",
      "destino": "spacing_extra_pass"
    }
  ],
  "requiere_revision": true,
  "confianza": 0.78
}
```

### Valor

- ayuda a gobernar la evolución del conocimiento;
- reduce carga del director técnico;
- evita que el grafo crezca sin control;
- permite workflows de validación.

### Prioridad recomendada

Alta después del extractor.

---

## 7.3 Modelo 3 — BasketIQ Chronicle Generator

### Objetivo

Generar crónicas, resúmenes y comunicaciones deportivas con estilo consistente.

### Entradas

- resultado;
- rival;
- notas del entrenador;
- hechos destacados;
- tono deseado;
- público objetivo.

### Salidas

- crónica interna;
- crónica pública;
- resumen para familias;
- publicación web;
- post RRSS;
- titular;
- cierre editorial.

### Valor

- reduce coste en una tarea frecuente;
- aporta valor inmediato al club;
- permite estandarizar tono;
- puede entrenarse con ejemplos corregidos.

### Riesgo

Debe controlarse para evitar:

- exageraciones;
- errores de nombres;
- tono inadecuado;
- comunicación sensible.

### Prioridad recomendada

Media-alta. Ideal para tareas batch o borradores, no publicación automática sin validación.

---

## 7.4 Modelo 4 — BasketIQ Session Summarizer

### Objetivo

Resumir sesiones registradas y producir memoria operativa por equipo.

### Salidas posibles

- resumen corto;
- objetivos trabajados;
- puntos pendientes;
- señales de continuidad;
- sugerencias para próxima sesión;
- resumen para coordinador;
- resumen para director técnico.

### Valor

- reduce ruido;
- ayuda a coordinación;
- genera datos para dashboards;
- alimenta histórico.

### Prioridad recomendada

Media.

---

## 7.5 Modelo 5 — BasketIQ Knowledge Curator

### Objetivo

Ayudar a mantener, depurar y enriquecer el grafo de conocimiento.

### Funciones

- detectar duplicados;
- sugerir relaciones;
- detectar contradicciones;
- proponer preguntas para experto;
- identificar huecos del conocimiento;
- agrupar conceptos parecidos;
- revisar consistencia de etiquetas.

### Valor

Este modelo sería clave para escalar el conocimiento sin que todo dependa de curación manual.

### Prioridad recomendada

Media, pero estratégica para 2027.

---

## 7.6 Modelo 6 — BasketIQ Coach Assistant Local

### Objetivo

Responder consultas de entrenadores en tareas acotadas, apoyado siempre en grafo/RAG.

### Uso esperado

- no como fuente autónoma;
- sí como redactor/razonador sobre contexto recuperado;
- con citas o referencias internas;
- con límites claros.

### Ejemplos

- “Dame tres tareas para reforzar rebote defensivo U18.”
- “Resume qué llevamos trabajando estas dos semanas.”
- “Prepara una propuesta de sesión basada en estos objetivos.”

### Valor

Puede reducir coste futuro si la calidad es suficiente.

### Prioridad recomendada

No debe ser el primer fine-tune. Conviene abordarlo después de extractor y clasificador.

---

## 8. Dataset strategy: el verdadero activo

### 8.1 Principio fundamental

> Antes de entrenar modelos, hay que diseñar el dataset.

El error sería empezar ajustando modelos sin tener datos limpios, evaluación clara y outputs esperados.

### 8.2 Tipos de datasets BasketIQ

#### Dataset A — Conversaciones entrenador-asistente

Campos:

- input del entrenador;
- intención;
- contexto;
- respuesta generada;
- respuesta corregida;
- utilidad percibida;
- rol;
- equipo/categoría anonimizada.

#### Dataset B — Sesiones de entrenamiento

Campos:

- texto libre;
- sesión estructurada;
- objetivos;
- ejercicios;
- fase;
- feedback;
- tags;
- errores;
- próximos pasos.

#### Dataset C — Feedback experto

Campos:

- afirmación del sistema;
- feedback experto;
- tipo de cambio;
- decisión final;
- justificación;
- estado de consolidación.

#### Dataset D — Crónicas y comunicación

Campos:

- notas iniciales;
- crónica generada;
- crónica editada;
- versión interna;
- versión pública;
- tono;
- canal.

#### Dataset E — Benchmark BasketIQ

Campos:

- pregunta benchmark;
- contexto disponible;
- respuesta esperada;
- criterios de evaluación;
- respuesta aceptable;
- respuesta incorrecta;
- casos trampa.

#### Dataset F — Relación entrenamiento-partido

Campos:

- foco entrenado;
- señal de partido;
- observación del entrenador;
- hipótesis de transferencia;
- validación posterior.

### 8.3 Formato recomendado inicial

JSONL versionado.

Ejemplo:

```json
{
  "id": "biq-u18-extract-0001",
  "task": "session_extraction",
  "language": "es",
  "role": "coach",
  "age_group": "U18",
  "input": "Hoy trabajamos salida tras rebote, 2c1 y tiros libres al final.",
  "expected_output": {
    "objetivos": ["transicion_ofensiva", "finalizacion_superioridad", "tiro_libre"],
    "contenidos": ["salida_tras_rebote", "2c1", "tiros_libres"],
    "fase_sesion": ["principal", "cierre"],
    "relaciones_candidatas": []
  },
  "source": "synthetic_or_real_anonymized",
  "review_status": "pending",
  "created_at": "2026-04-25"
}
```

### 8.4 Reglas de datos

- No usar datos personales de menores en datasets de entrenamiento.
- Anonimizar jugadores, equipos y familias.
- Separar datos operativos sensibles de datos de entrenamiento.
- Guardar consentimiento y base legal cuando aplique.
- Mantener lineage de origen.
- Distinguir entre dato real, sintético y editado.
- Versionar datasets.
- Documentar decisiones de limpieza.

---

## 9. Evaluación: cómo saber si merece la pena

### 9.1 Métricas generales

- coste por 1.000 tareas;
- latencia;
- tasa de errores;
- adherencia al formato JSON;
- utilidad percibida;
- tasa de edición humana;
- reducción de coste frente a API comercial;
- estabilidad entre versiones;
- facilidad de despliegue.

### 9.2 Métricas para extractor

- precisión de entidades;
- recall de entidades;
- exactitud de relaciones;
- tasa de JSON válido;
- tasa de campos inventados;
- necesidad de revisión humana.

### 9.3 Métricas para crónicas

- tiempo ahorrado;
- porcentaje de texto reutilizado;
- edición media requerida;
- tono adecuado;
- errores factuales;
- aprobación por social manager/coordinación.

### 9.4 Métricas para feedback classifier

- accuracy por clase;
- confusión confirmación/ampliación;
- detección de contradicciones;
- tasa de “requiere revisión humana”;
- impacto en gobernanza del conocimiento.

### 9.5 Métrica económica clave

Calcular:

```text
Coste API comercial por tarea
vs
Coste local amortizado por tarea
```

Incluyendo:

- hardware/cloud;
- electricidad;
- mantenimiento;
- coste técnico;
- calidad/errores;
- revisión humana.

Un modelo local solo tiene sentido si mantiene calidad suficiente y reduce coste total, no solo coste por token.

---

## 10. Arquitectura técnica inicial

### 10.1 Stack de laboratorio

#### Inferencia local simple

- Ollama
- modelos GGUF cuantizados
- Modelfiles
- adapters cuando proceda

#### Inferencia local avanzada

- llama.cpp
- servidores locales
- evaluación batch

#### Serving escalable

- vLLM
- OpenAI-compatible endpoints
- despliegue en cloud si hay volumen

#### Fine-tuning

- Hugging Face Transformers
- PEFT
- LoRA/QLoRA
- datasets JSONL
- Weights & Biases / MLflow opcional
- scripts reproducibles

### 10.2 Arquitectura conceptual

```text
Operational Data
  - sesiones
  - crónicas
  - feedback
  - partidos
  - asistencia
  ↓
Data Cleaning & Anonymization
  ↓
BasketIQ Dataset Registry
  ↓
Evaluation Harness
  ↓
Model Lab
  - baseline API
  - baseline open-weight
  - fine-tuned adapter
  ↓
Model Registry
  ↓
Internal Batch Jobs
  ↓
Knowledge Graph / Product Agents
```

### 10.3 Principio de despliegue

Primero modelos internos, no visibles.

Orden recomendado:

1. batch interno;
2. revisión humana;
3. asistente interno para equipo BasketIQ;
4. asistente para staff del club;
5. interacción final, si supera evaluación.

---

## 11. Modelos base candidatos

Esta lista debe revisarse periódicamente porque el ecosistema cambia rápido.

### 11.1 Familias candidatas

#### Llama

Ventajas:

- ecosistema amplio;
- buen soporte en herramientas;
- muchas variantes cuantizadas;
- útil para benchmarks generales.

Riesgos:

- revisar licencia concreta;
- calidad en español y dominio deportivo debe medirse.

#### Gemma

Ventajas:

- tamaños pequeños/medianos interesantes;
- buena integración con herramientas de Google;
- potencial encaje con estrategia Google Cloud.

Riesgos:

- revisar licencia y límites de uso;
- medir rendimiento específico en español.

#### Mistral

Ventajas:

- actor europeo relevante;
- narrativa europea más fuerte;
- buen posicionamiento para estrategia de soberanía tecnológica.

Riesgos:

- revisar modelos concretos, licencias y costes;
- evaluar calidad por tarea.

#### Qwen

Ventajas:

- modelos potentes y variados;
- buen rendimiento en muchas tareas;
- ecosistema activo.

Riesgos:

- narrativa europea más débil;
- revisar licencia y sensibilidad de uso.

### 11.2 Criterios de elección

No elegir por popularidad. Elegir por:

- calidad en tareas BasketIQ;
- coste local;
- licencia;
- facilidad de fine-tuning;
- soporte tooling;
- estabilidad;
- rendimiento en español;
- capacidad de seguir instrucciones estructuradas;
- alucinación controlada;
- despliegue en hardware disponible.

---

## 12. Roadmap propuesto

## Fase 0 — Instrumentación de datos

**Horizonte:** inmediato / cuando empiece el uso real  
**Objetivo:** guardar datos útiles desde el primer día.

### Tareas

- Definir esquema JSONL.
- Registrar prompts, outputs y correcciones.
- Guardar feedback humano.
- Separar datos sensibles.
- Anonimizar entidades personales.
- Crear dataset registry.
- Crear primera batería de 50 casos benchmark.

### Entregable

`BasketIQ Dataset Schema v0.1`

---

## Fase 1 — Benchmark local sin fine-tuning

**Horizonte:** I+D inicial  
**Objetivo:** comparar modelos base contra APIs comerciales.

### Tareas benchmark

1. Extraer entidades de sesión.
2. Generar crónica.
3. Clasificar feedback experto.
4. Proponer relaciones candidatas del grafo.
5. Responder consulta con contexto RAG.

### Entregables

- tabla comparativa de modelos;
- métricas de coste;
- métricas de calidad;
- decisión de primer modelo base.

---

## Fase 2 — Primer adapter LoRA/QLoRA

**Horizonte:** cuando haya dataset suficiente  
**Objetivo:** crear el primer modelo especializado estrecho.

### Modelo recomendado

`BasketIQ-U18-Extractor-v0.1`

### Dataset mínimo

- 100-300 ejemplos curados para primera prueba;
- idealmente 500-1.000 para una versión más seria;
- mezcla de real anonimizado + sintético revisado.

### Output

JSON estructurado de entidades y relaciones candidatas.

### Entregables

- adapter entrenado;
- evaluación contra benchmark;
- comparación contra modelo base y API;
- decisión: usar / descartar / iterar.

---

## Fase 3 — Batch jobs internos

**Horizonte:** posterior a extractor v0.1  
**Objetivo:** poner modelos especializados a trabajar sin exponerlos directamente al usuario.

### Tareas

- procesamiento nocturno de sesiones;
- sugerencia de relaciones;
- resúmenes internos;
- clasificación de feedback;
- limpieza de transcripciones;
- detección de huecos de conocimiento.

### Entregables

- job batch local;
- cola de revisión humana;
- métricas de coste y calidad.

---

## Fase 4 — Familia de modelos BasketIQ

**Horizonte:** 2027  
**Objetivo:** consolidar varios modelos/adapters especializados.

### Candidatos

- `BasketIQ-U18-Extractor-v1`
- `BasketIQ-Feedback-Classifier-v1`
- `BasketIQ-Chronicle-v1`
- `BasketIQ-Session-Summarizer-v1`
- `BasketIQ-Knowledge-Curator-v1`

### Entregables

- model cards;
- datasets versionados;
- benchmarks;
- documentación de limitaciones;
- checklist legal;
- integración con agentes internos.

---

## 13. Épicas propuestas

## EP-R1 — Dataset foundation para modelos BasketIQ

### Objetivo

Definir y empezar a capturar el corpus necesario para futuros modelos especializados.

### Historias candidatas

- Definir esquema JSONL para sesiones.
- Definir esquema JSONL para feedback experto.
- Definir esquema JSONL para crónicas.
- Crear dataset registry.
- Añadir anonimización básica.
- Registrar correcciones humanas.
- Crear benchmark inicial de 50 casos.

### Prioridad

Alta.

---

## EP-R2 — Benchmark de modelos open-weight para BasketIQ

### Objetivo

Comparar modelos base en tareas reales del dominio.

### Historias candidatas

- Seleccionar 3-5 modelos candidatos.
- Ejecutar benchmark de extracción.
- Ejecutar benchmark de crónicas.
- Ejecutar benchmark de clasificación.
- Comparar coste y latencia.
- Documentar licencias.
- Recomendar modelo base inicial.

### Prioridad

Media-alta.

---

## EP-R3 — BasketIQ U18 Extractor v0.1

### Objetivo

Crear primer adapter/modelo especializado para extraer estructura desde texto libre U18.

### Historias candidatas

- Crear dataset de entrenamiento inicial.
- Definir output JSON canónico.
- Entrenar adapter LoRA/QLoRA.
- Evaluar contra benchmark.
- Comparar contra API comercial.
- Integrar en batch job experimental.
- Documentar resultados.

### Prioridad

Alta cuando exista dataset suficiente.

---

## EP-R4 — Feedback Classifier v0.1

### Objetivo

Clasificar feedback experto y operativo para gobernar el aprendizaje del sistema.

### Historias candidatas

- Definir clases de feedback.
- Crear dataset inicial.
- Entrenar/evaluar clasificador.
- Integrar con flujo de validación del grafo.
- Medir precisión por clase.
- Añadir estado “requiere revisión humana”.

### Prioridad

Media-alta.

---

## EP-R5 — Chronicle Generator local v0.1

### Objetivo

Evaluar si un modelo local puede generar borradores de crónicas con calidad suficiente.

### Historias candidatas

- Recopilar ejemplos de crónicas.
- Definir estilos: interna, pública, familias, RRSS.
- Evaluar modelos base.
- Ajustar adapter si merece la pena.
- Medir edición humana requerida.
- Integrar como borrador no automático.

### Prioridad

Media.

---

## EP-R6 — Local batch processing pipeline

### Objetivo

Crear pipeline asíncrono para procesar datos del club con modelos locales.

### Historias candidatas

- Definir cola de tareas batch.
- Ejecutar extractor local sobre sesiones.
- Guardar outputs en revisión.
- Comparar coste local vs API.
- Añadir monitorización básica.
- Añadir fallback a API comercial.

### Prioridad

Media.

---

## EP-R7 — Model governance y cumplimiento

### Objetivo

Asegurar que los modelos internos se gobiernan correctamente.

### Historias candidatas

- Crear model cards.
- Documentar datasets usados.
- Documentar limitaciones.
- Revisar licencias.
- Definir política de datos de menores.
- Definir criterios de uso/no uso.
- Añadir auditoría de outputs.

### Prioridad

Alta antes de cualquier uso productivo.

---

## EP-R8 — Narrativa europea e I+D defendible

### Objetivo

Convertir esta línea técnica en activo para ayudas europeas y nacionales.

### Historias candidatas

- Redactar technical innovation memo.
- Documentar comparación API vs modelo propio.
- Documentar ahorro esperado de coste.
- Documentar estrategia de soberanía tecnológica.
- Preparar narrativa para EIC/NEOTEC.
- Identificar colaboración universitaria posible.
- Identificar posibles papers/whitepapers.

### Prioridad

Media-alta para funding.

---

## 14. Relación con ayudas y narrativa europea

### 14.1 Mensaje débil

> BasketIQ usa IA generativa para ayudar a entrenadores.

### 14.2 Mensaje fuerte

> BasketIQ construye una plataforma agentic para baloncesto formativo que combina grafo de conocimiento validado, datos operativos reales y modelos especializados desplegables en infraestructura controlada.

### 14.3 Mensaje para EIC / Europa

> La innovación no está en llamar a un LLM comercial, sino en convertir el conocimiento experto y la operación real de clubes formativos en un sistema especializado, auditable y escalable. La plataforma puede usar modelos comerciales al inicio, pero su roadmap tecnológico incorpora datasets propios, adapters especializados y modelos locales para reducir coste, mejorar control de datos y reforzar la soberanía tecnológica europea.

### 14.4 Ángulos de valor para ayudas

#### Innovación técnica

- modelos especializados por dominio;
- grafo de conocimiento;
- RAG con trazabilidad;
- agentes por rol;
- aprendizaje operativo;
- evaluación propia.

#### Impacto económico

- menor coste de operación;
- escalabilidad a más clubes;
- menor dependencia de proveedores de API;
- posibilidad de ofrecer precios accesibles.

#### Impacto social

- democratización de conocimiento técnico;
- acceso para clubes modestos;
- reducción de brecha entre clubes grandes y pequeños.

#### Soberanía y cumplimiento

- mayor control sobre datos;
- despliegue local o europeo;
- gobernanza de modelos;
- alineamiento con AI Act y GDPR.

---

## 15. Riesgos y mitigaciones

| Riesgo | Descripción | Mitigación |
|---|---|---|
| Distracción del MVP | La línea de modelos puede absorber demasiado tiempo. | Tratarla como I+D paralela, sin bloquear entregas al club. |
| Dataset insuficiente | Sin datos buenos, el fine-tuning no aporta valor. | Priorizar instrumentación y benchmark antes de entrenar. |
| Calidad inferior a API | Modelos locales pueden ser peores. | Usarlos primero en batch interno con revisión humana. |
| Licencias | Algunos modelos tienen restricciones. | Checklist legal por modelo antes de uso comercial. |
| Datos de menores | Riesgo crítico de privacidad. | Anonimización, minimización y exclusión de datos personales. |
| Alucinación | El modelo puede generar respuestas convincentes pero falsas. | El grafo/RAG sigue siendo fuente de verdad. |
| Coste oculto | Infraestructura local puede no ser más barata si se cuenta todo. | Medir coste total por tarea, no solo coste por token. |
| Overengineering | Construir laboratorio demasiado pronto. | Primeras épicas pequeñas: dataset, benchmark, extractor. |

---

## 16. Decisión recomendada

Abrir el Track R como **rama estratégica de I+D**, pero con límites claros:

### En 2026

- instrumentar datos;
- crear dataset schema;
- crear benchmark inicial;
- evaluar modelos open-weight;
- preparar primer extractor experimental si hay datos suficientes.

### No hacer en 2026

- no depender de modelos locales para el MVP;
- no crear un modelo generalista;
- no exponerlo a usuarios finales sin evaluación;
- no invertir semanas sin datos.

### En 2027

- consolidar adapters especializados;
- usar batch local para reducir costes;
- integrar modelos con agentes;
- documentar IP y resultados;
- usarlo como parte fuerte de la narrativa europea.

---

## 17. Primera definición de backlog

### Orden recomendado

1. **EP-R1 — Dataset foundation para modelos BasketIQ**
2. **EP-R2 — Benchmark de modelos open-weight para BasketIQ**
3. **EP-R3 — BasketIQ U18 Extractor v0.1**
4. **EP-R7 — Model governance y cumplimiento**
5. **EP-R6 — Local batch processing pipeline**
6. **EP-R4 — Feedback Classifier v0.1**
7. **EP-R5 — Chronicle Generator local v0.1**
8. **EP-R8 — Narrativa europea e I+D defendible**

### Primer entregable concreto

`BasketIQ Dataset Schema v0.1`

### Primer modelo experimental

`BasketIQ-U18-Extractor-v0.1`

### Primera prueba económica

Comparar en 100 tareas reales o sintéticas:

- coste API comercial;
- coste modelo local;
- calidad;
- edición humana;
- tiempo;
- error rate.

---

## 18. Elevator pitch interno

BasketIQ puede empezar usando APIs comerciales para ganar velocidad, pero su ventaja a largo plazo no debe depender solo de modelos de terceros. La oportunidad es construir una capa propia de inteligencia especializada: datasets, benchmarks, adapters y modelos locales entrenados para tareas concretas del baloncesto formativo.

Esto permitiría reducir costes en tareas repetitivas, procesar datos en infraestructura controlada, mejorar privacidad y crear una narrativa tecnológica mucho más fuerte para ayudas europeas. No se trata de entrenar un GPT propio, sino de convertir el conocimiento y la operación real de los clubes en modelos especializados que alimenten agentes, grafo y producto.

La tesis es simple:

> APIs comerciales para velocidad inicial; modelos especializados BasketIQ para escala, coste, IP y diferenciación europea.

---

## 19. Fuentes técnicas de referencia

Estas fuentes no sustituyen la evaluación propia de BasketIQ, pero sirven como base para entender el stack técnico posible.

- Hugging Face Transformers — PEFT integration: https://huggingface.co/docs/transformers/en/peft
- Hugging Face PEFT — LoRA conceptual guide: https://huggingface.co/docs/peft/main/conceptual_guides/lora
- Ollama Modelfile reference: https://docs.ollama.com/modelfile
- Ollama import fine-tuned adapters: https://docs.ollama.com/import
- llama.cpp repository: https://github.com/ggml-org/llama.cpp
- vLLM documentation: https://docs.vllm.ai/en/latest/
- vLLM project page: https://vllm.ai/
- European Commission — AI Act: https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai

---

## 20. Cierre

Esta línea no debe competir con el MVP. Debe preparar el futuro.

Si BasketIQ ejecuta bien esta rama, en 2027 podría decir algo mucho más fuerte que “usamos IA generativa”:

> BasketIQ ha construido un sistema especializado de inteligencia para baloncesto formativo, con datasets propios, modelos ajustados al dominio, agentes operativos y un grafo de conocimiento validado por expertos y uso real.

Ese es un posicionamiento mucho más defendible para producto, inversión y ayudas europeas.

---

## 21. Revisión y correcciones · 2026-04-25

> Esta sección se añade **sin reescribir** las anteriores. El cuerpo original del documento (secciones 1-20) se conserva tal cual como registro histórico del proceso de pensamiento en abril 2026. La realidad técnica y comercial del ecosistema cambia rápido (modelos open-weight, precios de APIs, frameworks de fine-tuning hosted): partes concretas de este texto envejecerán en cuestión de meses, y cualquier ejecución posterior deberá partir de nueva investigación sobre el estado del arte en ese momento. El valor preservado aquí es el **razonamiento**, no las cifras concretas.

### 21.1 Estado real del documento

Este documento es **semilla / hipótesis pre-MVP**, no plan ejecutable. No compromete recursos durante el MVP abril-septiembre 2026. Cualquier decisión operativa sobre Track R debe esperar a que el MVP haya validado o invalidado supuestos sobre uso real, dataset operativo y curva de adopción.

### 21.2 Estrategia consensuada tras revisión

- **Horizonte**: Track R no antes de **Q1 2027**. Ningún recurso comprometido en 2026.
- **Estrategia de dos fases para los modelos**:
  - **v1 con modelo open-weight maduro** (Llama / Qwen / Gemma según madurez en el momento de decidir). Construye el pipeline completo: dataset, eval harness, training scripts, model registry, batch jobs. El modelo base es commodity reemplazable; lo defendible es el aparato.
  - **v2 con modelo de origen europeo** (Mistral, Salamandra del BSC, EuroLLM o sucesor). Hereda todo el aparato de v1. Coste marginal pequeño, beneficio narrativo y de soberanía grande. Permite comparar con evidencia objetiva la calidad europea vs no-europea, en lugar de hacerlo por ideología.

### 21.3 Escala estratégica real · cifras de referencia

El objetivo declarado del proyecto es expansión a **miles de clubes** en España, Europa y Latinoamérica.

Punto de referencia para futuros cálculos (club tipo de formación):
- ~15 equipos × 2 entrenadores = 30 entrenadores.
- 5 sesiones por entrenador y semana (3 entrenamientos + partido + 1-2 extras) × 30 semanas.
- ≈ **1.500–2.000 interacciones de entrenadores por club y temporada** (solo coaches).
- Con jugadores, familias, social manager y dirección técnica, el factor multiplicador es **2–5×**.

| Escala | Tareas/año (todos los roles) | Coste API commodity anual estimado | Coste laboratorio anual estimado | Veredicto coste |
|---|---|---|---|---|
| 1 club (MVP septiembre 2026) | ~5K | $5–25 | N/A | API trivialmente |
| 100 clubes | ~500K | $500–2.500 | $8K–12K | API gana ~5× |
| 1.000 clubes | ~5M | $5K–25K | $10K–20K | **Empieza a empatar** |
| 10.000 clubes | ~50M | $50K–300K | $30K–80K | Local gana claramente |

> El argumento económico **se sostiene a partir de ~1.000 clubes**. Por debajo de esa escala, el motor de Track R no es coste sino los otros vectores: IP, soberanía, control de conversación, narrativa de plataforma completa, privacidad de menores.

### 21.4 Correcciones a partes específicas del documento original

#### Sección 2.1 · Reducción futura de coste

**Corrección de matiz**: el ahorro **no aparece a escala temprana** (1-100 clubes), solo a partir de ~1.000 clubes (ver 21.3). Además, las APIs commodity (GPT-4o-mini, Gemini 2.5 Flash, Claude Haiku 3.5 y sucesores) están bajando precio agresivamente; **el threshold económico sube cada año** que pase sin reducir dependencia. No invalida el track, pero exige fijar la escala como condición de break-even.

#### Sección 2.5 · Encaje con estrategia europea

**Corrección de claridad**: un modelo open-weight americano (Llama, Qwen) corriendo en cloud americano (GCP, AWS) **no es soberanía europea**. La soberanía real exige al menos dos de: (a) modelo de origen europeo, (b) cloud europeo (Scaleway, OVH, IONOS, Stackit, T-Systems), (c) datos en jurisdicción europea, (d) auditabilidad y open-weight. La estrategia de dos fases (21.2) reconoce esto: v1 establece el aparato pragmático, v2 es la pieza europea defensible.

#### Sección 5 · Modelos open-weight · catálogo

**Marca de obsolescencia previsible**: la lista de candidatos (Llama, Gemma, Mistral, Qwen) refleja abril 2026. A 6-12 meses vista, esta lista probablemente esté desactualizada: nuevos modelos (Salamandra, EuroLLM, sucesores de Mistral, modelos chinos competitivos) entran y salen rápido. Esta sección **debe re-investigarse en Q4 2026 / Q1 2027** antes de decidir nada concreto.

#### Sección 9.5 · Métrica económica

**Gap detectado, parcialmente cubierto**: el documento original exige el cálculo pero no da cifras. La tabla de 21.3 cubre el gap a nivel **macro**. Cuando llegue la decisión real, habrá que añadir el cálculo a nivel **micro** (coste por tarea individual, no anual agregado) con números actualizados al momento.

#### Sección 10 · Arquitectura técnica inicial

**Corrección de alternativa omitida**: el documento prioriza Hugging Face + LoRA + GPU local. Conviene contemplar como **alternativa explícita el fine-tuning hosted** (Vertex AI Tuning, OpenAI Fine-tuning, Together AI, Fireworks, Modal): permite las primeras iteraciones sin hardware propio ni MLOps fuerte, lo que cambia la curva de coste y skill requerido. La decisión hosted vs propio se hará con números reales en su momento; no hay decisión preconcebida.

**Coste oculto a no olvidar** cuando se haga el cálculo de máquina propia: las horas de operación (drivers, kernel, GPU dying, formatos cambiantes, scheduling, monitoring, recovery) son tiempo que no estará en producto. Hay que valorarlas explícitamente en la columna de coste, no solo €/kWh + amortización del hardware.

#### Sección 14 · Relación con ayudas y narrativa europea

**Corrección de matiz**: Track R **suma puntos en NEOTEC** (I+D defensible, dataset propio, benchmarks publicables) y **da soporte narrativo en EIC** (no es el ancla; lo decisivo en EIC es el sistema completo, la tracción y el mercado). En 2026 ninguna de estas convocatorias está al alcance todavía. Track R es relevante para **ciclo 2027+**.

#### Sección 17 · Primera definición de backlog

**Corrección de alcance**: ocho épicas (EP-R1 a EP-R8) son demasiadas para comprometer hoy. Cuando llegue el momento de activar Track R, conviene **reducir a 2-3 épicas activas** (probablemente R1 dataset foundation, R7 governance light, R2 benchmark hosted) y dejar el resto como placeholders. Las decisiones se tomarán con datos reales del MVP, no a priori.

### 21.5 Preguntas pendientes antes de comprometer recursos

Cuando se decida activar Track R, estas preguntas deben tener respuesta basada en datos reales del MVP, no en supuestos:

1. ¿Qué volumen y calidad de dataset operativo ha generado el MVP en sus primeros 6-12 meses de uso real?
2. ¿Qué tareas concretas son repetitivas, evaluables y candidatas reales a modelo especializado (medidas, no hipotéticas)?
3. ¿En qué punto de la curva de adopción (clubes activos) estamos al evaluar?
4. ¿Cuál es el coste real por tarea con APIs commodity en ese momento? (Probablemente más bajo que hoy.)
5. ¿Cuál es el panorama de modelos open-weight, especialmente europeos, en ese momento? (Probablemente distinto.)
6. ¿Cuánto tiempo del equipo se puede dedicar a I+D sin desestabilizar producto?
7. ¿Hay convocatoria concreta (NEOTEC, EIC, otra) cuya ventana justifique el esfuerzo en ese ciclo?
8. ¿Qué casos de privacidad o sensibilidad de datos exigen sacar el procesamiento de proveedores comerciales?
9. ¿Cuáles de las múltiples motivaciones (coste, IP, soberanía, control de conversación, narrativa) están actuando con peso real en ese momento, y cuáles eran solo hipótesis?

### 21.6 Por qué se preserva el documento original sin reescribir

- El proceso de pensamiento de abril 2026 es valor en sí mismo: muestra cómo se llegó a la tesis, qué supuestos se hicieron y cómo se enmarcaron las preguntas.
- Permite contrastar en el futuro qué partes del análisis envejecieron bien y cuáles no, lo que es información útil para decisiones posteriores.
- Reescribir hoy números que en 6 meses serán otros sería ingeniería estética sin valor real.
- La nueva investigación a futuro partirá de cero técnico, pero con este registro como mapa de partida, mapa de gaps y memoria de razonamiento.

> Filosofía de trabajo aplicada (también vigente para cualquier ejecución futura del track): pensamos en grande, ejecutamos paso a paso, ciclo ejecutar–validar–medir–decidir.
