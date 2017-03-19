FROM node:7-onbuild

COPY package.json .
RUN npm install
COPY ./src .

CMD ["npm", "start"]

EXPOSE 3000
