const fs                        = require('fs');
const readline                  = require('readline');
const assert                    = require('assert')
const {google}                  = require('googleapis');
const { videointelligence_v1 }  = require('googleapis');
const OAuth2                    = google.auth.OAuth2;
const path                      = require('path');

const categoryIds = 
{
    Entertainment: 24,
    Education: 27,
    ScienceTechnology: 28
}

const SCOPES = ['https://www.googleapis.com/auth/youtube.upload'];
const TOKEN_PATH = __dirname + '/client_oauth_token.json';

const thumbFilePath = __dirname + '/pp.png';


exports.uploadVideo = (title, description, tags, videoFilePath) => 
{   
    var fileName    = videoFilePath;
    videoFilePath   = path.join(__dirname, '../../../');
    videoFilePath   = videoFilePath + fileName;

    assert(fs.existsSync(videoFilePath))
    assert(fs.existsSync(thumbFilePath))

    fs.readFile(__dirname + '/client_secret.json', function processClientSecrets(err, content) {
        if (err) {
            console.log('Error loading client secret file: ' + err);
            return;
        }
        authorize(JSON.parse(content), (auth) => uploadVideo(auth, title, description, tags, videoFilePath));
    });
}

function uploadVideo(auth, title, description, tags, videoFilePath) {
    const service = google.youtube('v3')

    service.videos.insert({
        auth: auth,
        part: 'snippet,status',
        requestBody: {
            snippet: {
                title,
                description,
                tags,
                categoryId: categoryIds.ScienceTechnology,
                defaultLanguage: 'en',
                defaultAudioLanguage: 'en'
            },
            status: {
                privacyStatus: "public"
            },
        },
        media: {
            body: fs.createReadStream(videoFilePath),
        },
    }, function(err, response) {
        if (err) {
            console.log('The API returned an error: ' + err);
                return;
            }
            console.log(response.data)

            console.log('Video uploaded. Uploading the thumbnail now.')
            service.thumbnails.set({
                auth: auth,
                videoId: response.data.id,
                media: {
                    body: fs.createReadStream(thumbFilePath)
                },
            }, function(err, response) {
            if (err) {
                console.log('The API returned an error: ' + err);
                return;
            }
            console.log(response.data)
        })
    });
}

function authorize(credentials, callback) {
    const clientSecret = credentials.installed.client_secret;
    const clientId = credentials.installed.client_id;
    const redirectUrl = credentials.installed.redirect_uris[0];
    const oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, function(err, token) {
        if (err) {
            getNewToken(oauth2Client, callback);
        } else {
            oauth2Client.credentials = JSON.parse(token);
            callback(oauth2Client);
        }
    });
}

function getNewToken(oauth2Client, callback) {
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
    });
    console.log('Authorize this app by visiting this url: ', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question('Enter the code from that page here: ', function(code) {
        rl.close();
        oauth2Client.getToken(code, function(err, token) {
        if (err) {
            console.log('Error while trying to retrieve access token', err);
            return;
        }
        oauth2Client.credentials = token;
        storeToken(token);
        callback(oauth2Client);
        });
    });
}

function storeToken(token) {
    fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) throw err;
        console.log('Token stored to ' + TOKEN_PATH);
    });
}