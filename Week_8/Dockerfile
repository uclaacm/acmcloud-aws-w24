# Use Node 18 as base image
FROM public.ecr.aws/docker/library/node:18-alpine as builder
WORKDIR /app
COPY . .

# Build app
RUN npm ci
RUN npm run build

# Run app with nginx
FROM public.ecr.aws/nginx/nginx:1.25-alpine as production
ENV NODE_ENV production

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf