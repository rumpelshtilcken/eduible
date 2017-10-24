export const professionalText = ({
  professionalName,
  studentName,
  message,
  appointmentDate,
  appointmentLength,
  appointmentPrice
}) =>
  `
  Hello,${professionalName}!
    You have call request from ${studentName} at ${appointmentDate}.

    Message:
      ${message}

    Appointment length: ${appointmentLength}
    You will earn $${appointmentPrice}

    You can accept or decline on www.eduible.com
  `
;

export const studentText = () => {};
