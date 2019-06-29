#!/bin/sh
set -e

ssh_run() {
    ssh -oStrictHostKeyChecking=no -i ./tra.key ${SSH_USER}@${SSH_HOST} "$1"
}

openssl aes-256-cbc -K $encrypted_9a5e81a863c4_key -iv $encrypted_9a5e81a863c4_iv -in tra.key.enc -out tra.key -d
chmod 0600 ./tra.key

ssh_run "systemctl --user stop sora-boards.service"

rsync -avzh -e 'ssh -oStrictHostKeyChecking=no -i ./tra.key' --exclude node_modules --exclude .git . ${SSH_USER}@${SSH_HOST}:${DEPLOY_PATH}
ssh_run "sh -c 'cd ${DEPLOY_PATH} && yarn install'"

ssh_run "systemctl --user start sora-boards.service"