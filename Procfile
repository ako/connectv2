web: target/start -Dhttp.port=$PORT \
  -DapplyEvolutions.default=true -Ddb.default.driver=org.postgresql.Driver -Ddb.default.url=$DATABASE_URL \
  -Dgoogle.oauth2.client.id=$GOOGLE_OAUTH2_CLIENT_ID -Dgoogle.oauth2.secret=$GOOGLE_OAUTH2_SECRET \
  $PLAY_OPTS
