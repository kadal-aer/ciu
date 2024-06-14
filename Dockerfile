FROM node:latest

RUN apt-get update && apt-get install -y \
    chromium \
    libnss3-dev \
    && rm -rf /var/lib/apt/lists/*

RUN useradd -o -u 1000 user

USER user

ENV HOME=/home/user \
	PATH=/home/user/.local/bin:$PATH

WORKDIR $HOME/app

COPY --chown=user package*.json $HOME/app

RUN npm i

COPY --chown=user . $HOME/app

EXPOSE 7860

CMD ["node", "index"]