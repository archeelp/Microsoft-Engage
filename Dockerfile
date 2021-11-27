FROM node:14

# Bundle app source
WORKDIR /usr/src/app
COPY . .

# Backend
RUN npm install

# Frontend
WORKDIR /usr/src/app/frontend
RUN npm install
RUN npm run build
RUN npm install -g serve

WORKDIR /usr/src/app

EXPOSE 4000 3000

# CMD [ "npm", "run", "start" ]
# CMD [ "serve", "-s", "frontend/build", "-l", "3000" ]