# Proyecto: Aplicación Contenerizada con Docker (Node.js + MySQL)

Este repositorio contiene el código fuente de una aplicación web full-stack desarrollada como parte de la **Actividad Sumativa de la Unidad 2** del módulo *Contenerización de Aplicaciones de Software*.

El proyecto demuestra el uso de **Docker** y **Docker Compose** para orquestar un entorno de desarrollo que consta de dos servicios principales: un backend de **Node.js (con Express)** y una base de datos relacional **MySQL**.

---

## 🚀 Características

* **Aplicación Web:** Servidor web con Node.js y Express que sirve páginas EJS.
* **Base de Datos Relacional:** MySQL 8.0.
* **Orquestación:** Archivo `docker-compose.yml` que gestiona toda la aplicación.
* **Inicialización de BD:** Script `init.sql` crea tablas (usuarios, productos) y 15 registros de ejemplo automáticamente.
* **Persistencia de Datos:** Datos guardados en un volumen de Docker `db-data`.
* **Interfaz de Usuario:** Frontend simple para agregar y visualizar productos.
* **Manejo de Dependencias:** Conexión robusta con reintentos automáticos hacia MySQL.

---

## 🛠️ Tecnologías Utilizadas

| Categoría           | Tecnologías                            |
| ------------------- | -------------------------------------- |
| **Contenerización** | Docker, Docker Compose                 |
| **Backend**         | Node.js, Express                       |
| **Base de Datos**   | MySQL 8.0                              |
| **Frontend**        | EJS (Embedded JavaScript), HTML5, CSS3 |

---

## 🏗️ Arquitectura de la Aplicación

El entorno está definido por `docker-compose.yml` y consta de dos servicios principales:

### **backend:**

* Construido desde el Dockerfile en `./backend`.
* Ejecuta la aplicación `server.js` con Node.js.
* Conecta a la base de datos mediante el host `db`.
* Expone el puerto `3000` al host.
* Usa volúmenes para hot-reloading.

### **db:**

* Usa la imagen oficial `mysql:8.0`.
* Expone el puerto `3306` (depuración).
* Monta `db/init.sql` en `/docker-entrypoint-initdb.d/` para inicialización.
* Monta el volumen `db-data` en `/var/lib/mysql`.
* Configura codificación `utf8mb4` para acentos y caracteres especiales.

Ambos servicios se comunican mediante una red bridge personalizada `app-network`.

---

## ⚙️ Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

* Docker Desktop (Windows/macOS) o Docker Engine + Docker Compose (Linux)
* Git

---

## 🏃‍♂️ Cómo Ejecutar el Proyecto

### 1. Clonar el Repositorio

```bash
git clone https://github.com/yanorenao/docku2.git
```

### 2. Navegar al Directorio del Proyecto

```bash
cd docku2
```

### 3. Construir y Levantar los Contenedores

```bash
docker-compose up --build
```

> Usa `--build` para forzar la reconstrucción del backend.

Ejecutar en segundo plano (modo *detached*):

```bash
docker-compose up --build -d
```

### 4. Acceder a la Aplicación

Una vez que los contenedores estén activos:

* **Formulario:** [http://localhost:3000](http://localhost:3000)
* **Tabla de Datos:** [http://localhost:3000/datos](http://localhost:3000/datos)

### 5. Detener la Aplicación

```bash
docker-compose down
```

### 6. Limpieza Completa (Opcional)

```bash
docker-compose down -v
```

> Elimina también el volumen de la base de datos (todos los datos se perderán).

---

## 🎥 Video de Demostración

Enlace al video explicativo sobre la instalación, ejecución y comandos Docker:
[[Aquí](https://youtu.be/SP7aTA-IhXE)]

---

## 👨‍💻 Autor

**yanorenao**
