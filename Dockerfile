FROM node:20-alpine AS base
WORKDIR /app

# Copy package files to install dependencies
COPY package.json package-lock.json ./

# Install only production dependencies in prod-deps stage
FROM base AS prod-deps
RUN npm install --omit=dev && ls -l /app/node_modules

# Install all dependencies for building in build-deps stage
FROM base AS build-deps
RUN npm install && ls -l /app/node_modules

# Build the app
FROM build-deps AS build
COPY . .
RUN npm run build && ls -l /app/dist

# Runtime image
FROM node:20-alpine AS runtime
WORKDIR /app
ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321

# Copy necessary files from previous stages
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

# Use JSON format for CMD to handle OS signals better
CMD ["node", "./dist/server/entry.mjs"]
