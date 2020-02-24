#! /bin/ash

set -e

USER_NAME="node"

DIR="/app"
USER_ID=$(stat -c "%u" ${DIR})

echo "Using ${USER_ID} from owner of dir ${DIR}"

id "${USER_NAME?}" >/dev/null 2>&1

if [[ $? -ne 0 ]]; then
	echo Creating user ${USER_NAME} with UID ${USER_ID}
	useradd --home-dir /app --uid ${USER_ID} --shell /bin/bash --no-create-home ${USER_NAME}
fi

su ${USER_NAME} -c "yarn"
su ${USER_NAME} -c "yarn start:debug"
