FROM node:18 AS build-step

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install

ARG REACT_APP_API_PROXY=${REACT_APP_API_PROXY}
ENV REACT_APP_API_PROXY=$REACT_APP_API_PROXY

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=build-step /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]