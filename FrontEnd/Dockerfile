FROM node:18-alpine as build

ARG VITE_BACKEND_HOST
ENV VITE_BACKEND_HOST=$VITE_BACKEND_HOST

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm i

COPY .eslintrc.cjs index.html postcss.config.js tailwind.config.js vite.config.ts tsconfig.json tsconfig.node.json ./

COPY src ./src

COPY public ./public

RUN npm run build

# Run the app in a minimal nginx container

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]