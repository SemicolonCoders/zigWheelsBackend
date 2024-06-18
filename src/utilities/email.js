// Import nodemailer module for sending emails
import nodemailer from 'nodemailer';

// Define the sendEmail function
const sendEmail = async (option) => {
    try {
        // Create a transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
            service: "Gmail", // Specify the email service
            host: "smtp.gmail.com", // SMTP host for Gmail
            port: 465, // Port number for secure connection
            secure: true, // Use SSL/TLS
            auth: {
                user: process.env.SMTP_USER, // SMTP user from environment variables
                pass: process.env.SMTP_PASS // SMTP password from environment variables
            }
        });
        
        // Send the email with the provided options
        const info = await transporter.sendMail(option);

        // Log the message ID of the sent email
        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        // Throw an error if something goes wrong
        throw new Error(error.message);
    }
}

// Export the sendEmail function
export {
    sendEmail
}
