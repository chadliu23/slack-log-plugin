# Slack Outgoing Webhook Reciever 

This is sample to recieve message from Slack Outgoing Webhook. 

It can deploy easily on [Heroku](http://www.heroku.com) 



#Settings

1. Please set ENV `DATABASE_URL` for PostgreSQL and `TOKEN` for Slack Outgoing Webhook TOKEN

2. Table Schema:

```sql
Create table slack_log(user_name text, user_id  text, channel_id text, channel_name text, text  text,  timestamp timestamp default now());
```

#Run

```sh
node index.js
```

# LICENSE

MIT License

