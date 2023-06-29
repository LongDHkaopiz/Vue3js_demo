# Sử dụng image node phiên bản 14
FROM node:14

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Copy các files package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy source code vào container
COPY . .

# Build và tạo các file tĩnh
RUN npm run build

# Thiết lập command khi khởi động container
CMD [ "npm", "run", "serve" ]
