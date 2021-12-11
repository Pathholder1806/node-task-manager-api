const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: "yashjeetsingh.learning@gmail.com",
        subject: "Welcome to the App",
        text: `Welcome ${name} to our App. We are delighted to have you with us.`,
    });
};

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: "yashjeetsingh.learning@gmail.com",
        subject: "We are sad to see you leave",
        text: `We are sorry that you are leaving out app ${name}`,
    });
};

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail,
};
