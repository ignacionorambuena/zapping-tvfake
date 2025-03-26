# Desafío Técnico - Zapping TV

Este proyecto implementa un sistema de streaming de video utilizando el protocolo HLS (HTTP Live Streaming), compuesto por un backend en Node.js y un frontend en React.

## Estructura del Proyecto

El proyecto está dividido en dos componentes principales:

- `hls-stream/`: Servidor backend que gestiona los segmentos de video y genera el playlist HLS
- `fe-zapping-tvfake/`: Aplicación frontend que reproduce el stream de video y gestiona la sesión del usuario

## Tecnologías Utilizadas

### Backend (hls-stream)
- Node.js
- Express.js
- CORS
- Sistema de archivos para manejo de segmentos .ts

### Frontend (fe-zapping-tvfake) 
- React
- Vite como bundler
- Supabase para autenticación
- Video.js para reproducción HLS
- Tailwindcss para el manejo de estilos

## Requisitos Previos

- Node.js >= 14.x
- npm >= 6.x
- Segmentos de video .ts en el directorio `hls-stream/video_segments/`

## Configuración y Ejecución

### Inicialización del Proyecto

1. Clonar el repositorio: [https://github.com/ignacionorambuena/zapping-tvfake](https://github.com/ignacionorambuena/zapping-tvfake)

2. Instala Docker en tu máquina:
   - Sigue la guía oficial de instalación: [https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/)
   - Asegúrate que Docker Desktop esté corriendo (para Windows/Mac)

3. Configura las variables de entorno:
   - En el directorio `fe-zapping-tvfake/`, crea un archivo `.env` con las siguientes variables las cuales fueron enviadas por correo:
     ```
     VITE_API_URL=http://localhost:3000
     VITE_SUPABASE_URL=<tu_url_de_supabase>
     VITE_SUPABASE_ANON_KEY=<tu_clave_anonima_de_supabase>
     ```

4. Prepara los archivos de video:
   - Coloca tus archivos de segmentos .ts en el directorio `hls-stream/video_segments/`
   - Asegúrate que los archivos estén nombrados como `segment1.ts`, `segment2.ts`, etc.

5. Inicia los servicios:
   - En la raíz del proyecto ejecuta: ```docker-compose up --build```
   - Espera a que todos los servicios estén corriendo

6. Accede a la aplicación:
   - Frontend: ```http://localhost:5173```
   - API de streaming: ```http://localhost:3000/live.m3u8```

7. Para detener los servicios:
   - Presiona Ctrl+C en la terminal
   - O ejecuta: ```docker-compose down```


## Autor

- **Nombre:** Ignacio Norambuena
- **Correo:** ignacionorambuenag@gmail.com  
- **Teléfono:** +56998918080