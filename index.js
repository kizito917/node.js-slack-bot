const express = require('express');
require("dotenv").config();

const { receiver, slackApp } = require('./helpers/slack-bot.helper');

// Express app
const app = express();
const port = process.env.PORT || 3800;

// Integrate the receiver into your existing Express app
app.use('/slack/events', receiver.router);

// Express route to trigger sending a Slack message
app.get('/send', async (req, res) => {
    try {
        await slackApp.client.chat.postMessage({
            channel: '#automation',
            text: 'The SPA webgen function failed to generate website for Lubego Tech. This is caused by the functions inability to process retrieveal of information from the database.',
            blocks: [
                {
                    "type": "context",
                    "elements": [
                        {
                            "type": "plain_text",
                            "text": ":round_pushpin: Incident: Identified",
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
                        "text": "SPA webgen function failure",
                        "emoji": true
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "plain_text",
                        "text": "The SPA webgen function failed to generate website for Lubego Tech. This is caused by the functions inability to process retrieveal of information from the database.",
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
                            "text": "*23/09/2024 18:08*"
                        }
                    ]
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "*Impact*: During this time, websites generation might not be successful when attempting to generate website for different domains."
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
        res.send('Status sent to Slack!');
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).send('Failed to send status');
    }
  });
  
// Start the Express app
app.listen(port, () => {
    console.log(`⚡️ Slack Bolt app is running on port ${port}!`);
});