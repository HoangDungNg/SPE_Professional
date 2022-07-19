import emailjs from "@emailjs/browser";

const serviceId = "service_bxmwl1r";
const templateId = "template_s6lnu3k";
const userId = "KBypnXa7EOLcbzqVg";

const sendSPE2Email = async (name, email, message) => {
  try {
    const response = await emailjs.send(
      serviceId,
      templateId,
      { name, email, message },
      userId
    );

    if (response.status === 200) {
      console.log("Successfully sent message.");
    }
  } catch (error) {
    console.error("Failed to send email. Error: ", error);
  }
};

export default sendSPE2Email;
