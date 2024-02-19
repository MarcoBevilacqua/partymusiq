FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install nodemon
RUN npm install -g nodemon

# Install app dependencies
ADD ./server/package.json ./
COPY ./server/package-lock.json ./
RUN npm i --silent

# Copy in the source
COPY ./server .

# Don't use root user
USER node

# Expose Port
EXPOSE 3000

# Run the app
CMD ["nodemon", "--legacy-watch", "index.js"]