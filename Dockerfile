#############
### build ###
#############

# base image
FROM node:12.2.0-alpine as build

COPY package.json package-lock.json ./

# npm ci: similar a npm install pero previamente borra todos los archivos.
# https://docs.npmjs.com/cli/ci.html
RUN npm ci
RUN mkdir /app
RUN mv ./node_modules ./app

# set working directory
WORKDIR /app

COPY . .

# generate build
RUN npm run ng build -- --prod --output-path=dist

############
### nginx ###
############

FROM nginx:1.16.0-alpine

COPY default.conf /etc/nginx/conf.d/

RUN rm -rf /usr/share/nginx/html/*

# copy artifact build from the 'build environment'
COPY --from=build /app/dist /usr/share/nginx/html

# expose port 80
EXPOSE 8085

# run nginx
CMD ["nginx", "-g", "daemon off;"]
