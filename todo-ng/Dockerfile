## Stage 1: Build application ##
FROM node:8 as builder

COPY todo-ng /todo-ng

WORKDIR /todo-ng

RUN npm install
RUN $(npm bin)/ng build

## Stage 2: Run nginx and copy dist content to nginx/html folder ##
FROM nginx

COPY --from=builder /todo-ng/dist/* /usr/share/nginx/html/

EXPOSE 80