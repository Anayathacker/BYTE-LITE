 
const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;


///////////////////


module.exports = { session: process.env.SESSION_ID || 'Byte;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUZKa0VjY0ROMm43K0RPRTExcHpXK2RWM2xDV0xnNUZjN0xOSEw5bmIyST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0VjbEJqcVZuS0tPcnZBRWFUL1VJWXBjMFdEa2xvZWdTWS81UlZmZ2kyST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyS3dBdUpGbzc2QmlkRXNWMU5kdFRsRUlGd3F6WmFkOThiWGR3ZkFsSDJjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ6MWhzMURLeWtZL0wvM1UzaEpnNTBhMW9qNmtkMmVhQWRoY20veDFiS1dFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZMUUttMFVubjZ2V3ZqMnRXY0NlSE5QSkVNVDAxR0pjdWtra1h2ZjRERms9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InRhc3BnMUQySjZ1WmtidU00QUpIVFNYbGR4MUx0dTlkV214Yk9mZUJFUlE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT05jcFF2VXlsR2xuUjNaS3pYMEZqZlZlTnFvYkM5Ylo4U0FQRWJKd2dYWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZzcySWFLeWNCZkxqWTZUenhjT2FCNUtKNnpPTnA2NGtiMC9ZQXlrZk14UT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNIQ09UMDVxTnRuMkt0TVU2THgxQjJqSmFrVGxaY1RBc1J0OWRPcVBycDlSeE1LWEtybVFkZmlrV0pPRS83NEY2eGh6OWtCMm96ZGgyZmZjc29MbWpRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjAyLCJhZHZTZWNyZXRLZXkiOiJvMzhWbzV4Sm43dmxzbUtlQlJ6aWxRUW1mWHBzYnI1bTYySUJXU0ZmVDY0PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjkyMzQ1MjQwMTIwN0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIxREMxMDc2MjYxNzU2QUY1QTcxMjNBRTQwM0QwRDhDQiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzI2NjUxNzA1fSx7ImtleSI6eyJyZW1vdGVKaWQiOiI5MjM0NTI0MDEyMDdAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiNUM0NzM3OEY4ODIyOEQxQUI3QkQwNTNDMDAzRTBFNTcifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyNjY1MTcwNn1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiU0Z3R3NxV1BTSTJvcVdOTmVuRkxTZyIsInBob25lSWQiOiJmZjgyZDVjMS1jOGI2LTRmMzUtODdlNC1kNmNmMmU3NzQyZmYiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVnNOVkZBa3Q5bmhjZWZ4NjNzQXBCTTJiYk9vPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im4rVWM3bkN3Z0dva00zWXAreVUrRVdaRUpYVT0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJaQ0dLMldOSCIsIm1lIjp7ImlkIjoiOTIzNDUyNDAxMjA3OjYyQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IvCfmJhMT1ZF8J+lsCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDS2VtNFBBQ0VKbTZxcmNHR0FJZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiYmJRaUpTWmlJcHhicjlwT3c4QWFWMWVFSXBnbG9ESjFTSWlnSlFtSXBEbz0iLCJhY2NvdW50U2lnbmF0dXJlIjoidzAwblp3ZWExbzk5dXhFbm92akRKQ0JjSUo1emRxeVlkMFh4Ym9jRk9OekIwVUxrd0NmdGQ3MWp3RmJpZG1GVVVrbEVtTjh6S1FRZkFDUjlNRy8yREE9PSIsImRldmljZVNpZ25hdHVyZSI6InlXWXpjRVJiYzJYZWJHeHJNSi9NWjBUeVlQRnNqbGxUYW1RUExRNkVLRndQRU9DWnIvMWFTaHNMVVB0MS95V05hRS9CZWhBa1BIN0ZJdjE0d01DcGdnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTIzNDUyNDAxMjA3OjYyQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlcyMElpVW1ZaUtjVzYvYVRzUEFHbGRYaENLWUphQXlkVWlJb0NVSmlLUTYifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjY2NTE2ODcsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBSFdOIn0=',

////////////////////////////////



    PREFIXE: process.env.PREFIX || ".",



///////////////////////////
    A_REACT : process.env.AUTO_REACTION || 'on',
    CHATBOT: process.env.CHAT_BOT || "off",
    OWNER_NAME: process.env.OWNER_NAME || "Anayat",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "923452401207",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'BYTE-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://raw.githubusercontent.com/HyHamza/HyHamza/main/Images/BYTE-MD-LITE.jpeg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
