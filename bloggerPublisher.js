const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  '407408718192.apps.googleusercontent.com', // Default Playground client ID
  'YOUR_CLIENT_SECRET',                      // Replace with actual secret
  'https://developers.google.com/oauthplayground'
);

oauth2Client.setCredentials({
  access_token: process.env.BLOGGER_ACCESS_TOKEN,
  refresh_token: process.env.BLOGGER_REFRESH_TOKEN
});


const blogger = google.blogger({ version: 'v3', auth: oauth2Client });

async function publishPost(title, content) {
  const blogId = 'YOUR_BLOGGER_BLOG_ID'; // Replace with actual blog ID
  const res = await blogger.posts.insert({
    blogId,
    requestBody: {
      title,
      content,
      labels: ['Global Press', 'Contributor Tier']
    }
  });
  console.log(`✅ Published: ${res.data.url}`);
}
