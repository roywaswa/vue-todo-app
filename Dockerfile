FROM node:16.16.0-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install

ENV VITE_FIREBASE_API_KEY AIzaSyBj1d6TnzFI5s2mQq8zIy2Kx1hAZIYmiOU
ENV VITE_FIREBASE_AUTH_DOMAIN canismajoris.firebaseapp.com
ENV VITE_FIREBASE_PROJECT_ID canismajoris
ENV VITE_FIREBASE_STORAGE_BUCKET canismajoris.appspot.com
ENV VITE_FIREBASE_MESSAGING_SENDER_ID 297512133065
ENV VITE_FIREBASE_APP_ID 1:297512133065:web:c06d0d800061e975ff4818
ENV VITE_FIREBASE_MEASUREMENT_ID G-L3L2ZS8TGZ

COPY ./ .
RUN yarn build

FROM nginx 
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf