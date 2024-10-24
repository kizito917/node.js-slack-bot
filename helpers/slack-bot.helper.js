const { App, ExpressReceiver } = require('@slack/bolt');

const receiver = new ExpressReceiver({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const slackApp = new App({
    token: process.env.SLACK_BOT_TOKEN,
    receiver: receiver
    // socketMode:true,
    // appToken: process.env.APP_TOKEN
});

const deliverMessageToChannel = async (channel, payload) => {
    try {
        await slackApp.client.chat.postMessage({
            channel: channel,
            text: payload.description,
            blocks: [
                {
                    "type": "context",
                    "elements": [
                        {
                            "type": "plain_text",
                            "text": payload.notificationType,
                            "emoji": true
                        }
                    ]
                },
                {
                    "type": "divider"
                },
                {
                    "type": "header",
                    "text": {
                        "type": "plain_text",
                        "text": payload.title,
                        "emoji": true
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "plain_text",
                        "text": payload.description,
                        "emoji": true
                    }
                },
                {
                    "type": "section",
                    "fields": [
                        {
                            "type": "mrkdwn",
                            "text": "*Time of Failure:*"
                        },
                        {
                            "type": "mrkdwn",
                            "text": payload.failureDate,
                        }
                    ]
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": payload.impactDescription
                    }
                },
                {
                    "type": "context",
                    "elements": [
                        {
                            "type": "mrkdwn",
                            "text": "<https://savannahwebgen.tech/|Powered by savannah webgen>."
                        }
                    ]
                }
            ]
        });

        return {
            status: 200,
            message: 'Message delivered successfully to slack channel'
        }
    } catch (err) {
        console.log(err);
        return {
            status: 500,
            message: 'Unable to deliver message to slack channel'
        }
    }
}

module.exports = {
    receiver,
    slackApp,
    deliverMessageToChannel
}