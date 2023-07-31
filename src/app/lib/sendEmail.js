import axios from 'axios';

const sendEmail = async (email, subject, message) => {
  return axios({
    method: 'POST',
    url: './api/send-mail',
    headers: {
      'Content-Type': 'application/json',
    },

    data: {
      email: email,
      subject: subject,
      message: message,
    },
  });
};

export default sendEmail;
