FROM node:8

# Create app directory
WORKDIR /opt/ardemotions

# Install app dependencies
COPY package.json .
RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]