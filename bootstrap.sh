#! /bin/ash
USER_NAME="node"

DIR="/app"
USER_ID=$(stat -c "%u" ${DIR})

echo "Using ${USER_ID} from owner of dir ${DIR}"

id "${USER_NAME?}" >/dev/null 2>&1

if [[ $? -ne 0 ]]; then
	echo Creating user ${USER_NAME} with UID ${USER_ID}
	useradd --home-dir /app --uid ${USER_ID} --shell /bin/bash --no-create-home ${USER_NAME}
fi

if test ! -f "/bootstrap/bootstrap"; then
  lerna bootstrap

  # This provides an init-contianer-like experience on docker-compose, which
  # doesn't natively support init containers.
  today=$(date +"%Y-%m-%d")

  echo "${today}" > /bootstrap/bootstrap
fi

sleep infinity
