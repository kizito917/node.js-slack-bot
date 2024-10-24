const { App, ExpressReceiver } = require('@slack/bolt');
//     await ack();

//     try {
//         // Call views.open with the built-in client
//         const result = await client.views.open({
//             // Pass a valid trigger_id within 3 seconds of receiving it
//             trigger_id: body.trigger_id,
//             // View payload
//             view: {
//                 type: 'modal',
//                 // View identifier
//                 callback_id: 'view_1',
//                 title: {
//                     type: 'plain_text',
//                     text: 'Modal title'
//                 },
//                 blocks: [
//                     {
//                         type: 'section',
//                         text: {
//                         type: 'mrkdwn',
//                         text: 'Welcome to a modal with _blocks_'
//                         },
//                         accessory: {
//                         type: 'button',
//                         text: {
//                             type: 'plain_text',
//                             text: 'Click me!'
//                         },
//                         action_id: 'button_abc'
//                         }
//                     },
//                     {
//                         type: 'input',
//                         block_id: 'input_c',
//                         label: {
//                         type: 'plain_text',
//                         text: 'What are your hopes and dreams?'
//                         },
//                         element: {
//                         type: 'plain_text_input',
//                         action_id: 'dreamy_input',
//                         multiline: true
//                         }
//                     },
//                     {
//                         "type": "actions",
//                         "block_id": "actions1",
//                         "elements": [
//                             {
//                             "type": "static_select",
//                             "placeholder":{
//                                 "type": "plain_text",
//                                 "text": "Which witch is the witchiest witch?"
//                             },
//                             "action_id": "select_2",
//                             "options": [
//                                 {
//                                 "text": {
//                                     "type": "plain_text",
//                                     "text": "Matilda"
//                                 },
//                                 "value": "matilda"
//                                 },
//                                 {
//                                 "text": {
//                                     "type": "plain_text",
//                                     "text": "Glinda"
//                                 },
//                                 "value": "glinda"
//                                 },
//                                 {
//                                 "text": {
//                                     "type": "plain_text",
//                                     "text": "Granny Weatherwax"
//                                 },
//                                 "value": "grannyWeatherwax"
//                                 },
//                                 {
//                                 "text": {
//                                     "type": "plain_text",
//                                     "text": "Hermione"
//                                 },
//                                 "value": "hermione"
//                                 }
//                             ]
//                             },
//                             {
//                             "type": "button",
//                             "text": {
//                                 "type": "plain_text",
//                                 "text": "Cancel"
//                             },
//                             "value": "cancel",
//                             "action_id": "button_1"
//                             }
//                         ]
//                     }
//                 ],
//                 submit: {
//                     type: 'plain_text',
//                     text: 'Submit'
//                 }
//             }
//         });
//         console.log(result)
//     }
//     catch (error) {
//         console.log(error)
//     }
// });

const receiver = new ExpressReceiver({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const slackApp = new App({
    token: process.env.SLACK_BOT_TOKEN,
    receiver: receiver
    // socketMode:true,
    // appToken: process.env.APP_TOKEN
});

module.exports = {
    receiver,
    slackApp,
}