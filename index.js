const express = require('express');
require("dotenv").config();

const { receiver, deliverMessageToChannel } = require('./helpers/slack-bot.helper');

// Express app
const app = express();
const port = process.env.PORT || 3800;

// Integrate the receiver into your existing Express app
app.use('/slack/events', receiver.router);

// Express route to trigger sending a Slack message
app.get('/send', async (req, res) => {
    try {
        const payload = {
            description: 'The SPA webgen function failed to generate website for Lubego Tech. This is caused by the functions inability to process retrieveal of information from the database.',
            notificationType: ':round_pushpin: Incident: Identified',
            title: 'SPA webgen function failure',
            failureDate: `*${new Date().toLocaleDateString()}*`,
            impactDescription: '*Impact*: During this time, websites generation might not be successful when attempting to generate website for different domains.'
        }
        const { status, message } = await deliverMessageToChannel('#automation', payload);
        res.status(status).json(message);
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).send('Failed to send status');
    }
  });
  
// Start the Express app
app.listen(port, () => {
    console.log(`⚡️ Slack Bolt app is running on port ${port}!`);
});