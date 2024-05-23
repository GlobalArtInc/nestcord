# Base
FROM node:18 as base

## Set a default workdir that's easy to remember/use
WORKDIR /opt/app

## Expose docusaurus default serve port
EXPOSE 3000

## Install docusaurus globally
RUN yarn global add docusaurus

## Set yarn as entrypoint
ENTRYPOINT [ "yarn" ]
