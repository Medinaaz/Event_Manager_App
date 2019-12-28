const env = process.env.NODE_ENV;

const development = {
    LOGIN_URL: "http://localhost:7000/login",
    CONTACT_URL: "http://localhost:7000/contact",
    GET_CONTACTS: "http://localhost:7000/allContacts",
    MEETING_URL: "http://localhost:7000/meeting",
    USER_URL: "http://localhost:7000/user/",
    SEND_SMS: "http://localhost:7000/sendSMS/",
    SEND_EMAIL: "http://localhost:7000/sendEmail/"
};

module.exports = development;
