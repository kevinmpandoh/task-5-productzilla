# Gunakan image Node.js sebagai base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json dan package-lock.json ke container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy seluruh kode ke container
COPY . .

# Expose port aplikasi (sesuaikan dengan port yang Anda gunakan, misalnya 3000)
EXPOSE 3000

# Perintah untuk menjalankan aplikasi
CMD ["npm", "start"]
