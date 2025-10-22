# Usar una imagen base oficial de Node.js. Alpine 
FROM node:18-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar el package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instalar las dependencias del proyecto. 
RUN npm install --only=production

# Copiar el resto de los archivos de la aplicación
COPY . .

# Exponer el puerto que usará la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD [ "node", "server.js" ]