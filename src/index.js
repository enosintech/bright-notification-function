const { Client, Messaging } = require('node-appwrite');

module.exports = async ({ req, res, log, error }) => {
    // 1. Initialize the Server SDK
    // Use the environment variables provided by Appwrite
    const client = new Client()
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
        .setKey(process.env.APPWRITE_FUNCTION_API_KEY); // This is the secret key

    const messaging = new Messaging(client);
    const body = JSON.parse(req.body || "{}");

    try {
        // 2. THIS IS THE METHOD THAT EXISTS IN THE SERVER SDK
        await messaging.createPush(
            "notif_" + Date.now(), // Unique message ID
            body.title,            // Sent from your app
            body.body,             // Sent from your app
            [],                    // Topics (empty)
            [body.userId],         // Targets: specific User ID
            {},                    // Data payload (optional)
            "https://bright.app"   // Action/URL (optional)
        );

        return res.json({ success: true });
    } catch (err) {
        error(err.message);
        return res.json({ success: false, error: err.message });
    }
};

