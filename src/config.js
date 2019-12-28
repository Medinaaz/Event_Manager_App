const env = process.env.NODE_ENV;

const development = {
    LOGIN_URL: "localhost:7000/login",
    CONTACT_URL: "localhost:7000/contact",
    MEETING_URL: "localhost:7000/meeting",
};

module.exports = development;
