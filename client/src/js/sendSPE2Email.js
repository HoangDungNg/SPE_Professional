import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
const serviceId = "service_bxmwl1r";
const templateId = "template_s6lnu3k";
const userId = "KBypnXa7EOLcbzqVg";

const submitSuccessMsg = (msg, toastHandler = toast) => {
  toastHandler.success(msg, {
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
  });
};

const sendSPE2Email = async (name, email, message) => {
  try {
    const response = await emailjs.send(
      serviceId,
      templateId,
      { name, email, message },
      userId
    );

    if (response.status === 200) {
      submitSuccessMsg("Email sent successfully!");
    }
  } catch (error) {
    console.error("Failed to send email. Error: ", error);
  }
};

export default sendSPE2Email;
