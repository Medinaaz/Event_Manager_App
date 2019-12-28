const env = process.env.NODE_ENV;

const development = {
    LOGIN_URL: "http://localhost:7000/login",
    CONTACT_URL: "http://localhost:7000/contact",
    GET_CONTACTS: "http://localhost:7000/allContacts",
    MEETING_URL: "http://localhost:7000/meeting",
};

module.exports = development;
