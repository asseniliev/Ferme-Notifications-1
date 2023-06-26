var express = require("express");
var sendMail = require("../modules/mailerSimplified");
var router = express.Router();
var { Expo } = require('expo-server-sdk');

router.post("/notify", async (req, res) => {

  await sendMail(process.env.FLAV_MAIL_ID, "Notification from client", req.body.text);

  res.json({ result: true });
});


//Submit notifications to the app users
//http://localhost:3000/admin/submitnotifications
//This code is copy-paste of the code at 
//https://github.com/expo/expo-server-sdk-node

router.post("/submitnotifications", async (req, res) => {
  //ExponentPushToken[YFwJpEOr2-jLLFtr50rJuG]
  let expo = new Expo();
  let messages = [];

  //The push token is generated in the frontend App.js file 
  //and is printed on the console on line 234
  //This token is generated every time when the app is installed
  //on the telephone and is identifying the telephone

  const pushToken = 'ExponentPushToken[R9gSWzO9WnZnTYP2XAhcrU]';


  if (!Expo.isExpoPushToken(pushToken)) {
    console.error(`Push token ${pushToken} is not a valid Expo push token`);
    res.json({ result: false });
  }

  const textData = "New products available:\n\n- Cucumbers: 2.50 eur/kg\n- Carrots: 3.50 eur/kg\n- Tomatoes: 4.80 eur/kg";

  messages.push({
    to: pushToken,
    sound: 'default',
    title: 'Ferme-de-Meyrenal - 1',
    body: textData,
    data: { withSome: textData },
  });

  // SEND NOTIFICATIONS
  // The Expo push notification service accepts batches of notifications
  let chunks = expo.chunkPushNotifications(messages);
  let tickets = [];

  (async () => {
    // Send the chunks to the Expo push notification service. There are
    // different strategies you could use. A simple one is to send one chunk at a
    // time, which nicely spreads the load out over time:
    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        console.log(ticketChunk);
        tickets.push(...ticketChunk);
        // NOTE: If a ticket contains an error code in ticket.details.error, you
        // must handle it appropriately. The error codes are listed in the Expo
        // documentation:
        // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
      } catch (error) {
        console.error(error);
      }
    }
  })();

  //RECEIVE RECEIPTS FOR SENT NOTIFICATIONS
  let receiptIds = [];
  for (let ticket of tickets) {
    // NOTE: Not all tickets have IDs; for example, tickets for notifications
    // that could not be enqueued will have error information and no receipt ID.
    if (ticket.id) {
      receiptIds.push(ticket.id);
    }
  }

  let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
  (async () => {
    // Like sending notifications, there are different strategies you could use
    // to retrieve batches of receipts from the Expo service.
    for (let chunk of receiptIdChunks) {
      try {
        let receipts = await expo.getPushNotificationReceiptsAsync(chunk);
        console.log(receipts);

        // The receipts specify whether Apple or Google successfully received the
        // notification and information about an error, if one occurred.
        for (let receiptId in receipts) {
          let { status, message, details } = receipts[receiptId];
          if (status === 'ok') {
            continue;
          } else if (status === 'error') {
            console.error(
              `There was an error sending a notification: ${message}`
            );
            if (details && details.error) {
              // The error codes are listed in the Expo documentation:
              // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
              // You must handle the errors appropriately.
              console.error(`The error code is ${details.error}`);
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  })();


  res.json({ result: true });
});

module.exports = router;
