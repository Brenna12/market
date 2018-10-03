# # base image
# FROM node:9.6.1

# # install chrome for protractor tests
# # RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
# # RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
# # RUN apt-get update && apt-get install -yq google-chrome-stable

# # set working directory
# RUN mkdir /usr/src/app
# WORKDIR /usr/src/app

# # add `/usr/src/app/node_modules/.bin` to $PATH
# ENV PATH /usr/src/app/node_modules/.bin:$PATH

# # install and cache app dependencies
# COPY package-lock.json /usr/src/app/package.json
# COPY package.json /usr/src/app/package.json

# RUN npm install 

# # add app
# COPY . /usr/src/app

# EXPOSE 80

# # start app
# CMD ng serve --host 0.0.0.0 --port 80 --public-host https://market.test

# Stage 0, based on Node.js, to build and compile Angular
FROM node:8.6 as node
WORKDIR /app
COPY package.json /app/
COPY package-lock.json /app/
RUN npm install
COPY ./ /app/
ARG env=prod
RUN npm run build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.13
COPY --from=node /app/dist/ /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf