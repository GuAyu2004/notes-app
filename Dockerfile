FROM node:19-alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm install
# RUN npm rebuild bcrypt 

COPY . .

RUN chmod -R  755 /usr/app

EXPOSE 3900

# Start the application correctly
CMD ["npm", "run", "start:dev"]
