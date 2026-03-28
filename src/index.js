const { Client, Messaging } = require('node-appwrite');

module.exports = async ({ req, res }) => {
    const body = JSON.parse(req.body || "{}");

    // Ensure data is an object, if not, force it to null (which Messaging accepts)
    const notificationData = (typeof body.data === 'object' && body.data !== null) 
        ? body.data 
        : null;

    const client = new Client()
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
        .setKey(process.env.APPWRITE_FUNCTION_API_KEY);

    const messaging = new Messaging(client);

    try {
        await messaging.createPush(
            "notif_" + Date.now(),
            body.title,
            body.body,
            [],
            [body.userId], 
            [],
            notificationData // Use the validated object here
        );

        return res.json({ success: true });
    } catch (error) {
        console.error("Messaging Error:", error);
        return res.json({ success: false, error: error.message });
    }
};
