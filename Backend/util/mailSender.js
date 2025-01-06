const nodemailer = require("nodemailer");
const mailSender = async (email, title, body) => {
  try {
    let trasnporter = nodemailer.createTransport({
      host: process.env.emailHost,
      port:465,
      secure:true,
      auth: {
        user: process.env.emailUser,
        pass: process.env.emailPass,
      },
    });

    let info = await trasnporter.sendMail({
      from: "Smart Invoice Team",
      to: email,
      subject: title,
      html: body,
    });

    console.log("Email Info", info);
    return info;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = mailSender;
