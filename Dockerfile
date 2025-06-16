FROM node:23.11.0 as build

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build


FROM nginx:1.27.5 as deploy

COPY --from=build /app/dist /usr/share/nginx/html

