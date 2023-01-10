const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs")
const path = require("path")

module.exports = function() { 
    this.sendErrorToAdmin = function(errorMessage) {
        let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_EMAIL,
            pass: process.env.GMAIL_PASS
        }
        });
    
        // HTML TEMPLATE
        const filePath = path.join(__dirname, '../emails/error.html');
        const source = fs.readFileSync(filePath, 'utf-8').toString();
        const template = handlebars.compile(source);

        // data for email
        const replacements = {
            errorMessage: errorMessage,
        }

        // get data 
        const htmlToSend = template(replacements);

        // mail options
        let mailOptions = {
            from: "laatulakki@gmail.com",
            to: ["laatulakki@gmail.com", "rohistech@gmail.com"], 
            subject: "Error in payment",
            html: htmlToSend,
        };
    
        // Send email
        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                return console.log(err);
            }else{
                console.log("error sent to admin!")
            }
        });
    }
    
    // next function
}