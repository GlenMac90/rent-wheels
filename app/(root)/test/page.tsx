"use client";

import { sendEmail } from "@/lib/actions/email.actions";

const page = () => {
  const emailContent =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus temporibus laboriosam pariatur aperiam esse suscipit ab? Sequi, nesciunt nostrum ex veritatis obcaecati nemo minus asperiores velit, ratione expedita laboriosam commodi.";
  const name = "Glen";
  const subject = "Hello";
  const sentFromEmailAddress = "demi.mac@icloud.com";
  const sendToEmailAddress = "glen.mccallum@live.co.uk";

  const handleSendEmail = async () => {
    console.log("sent");
    const response = await sendEmail({
      from: sentFromEmailAddress,
      to: sendToEmailAddress,
      subject,
      name,
      message: emailContent,
    });
    console.log(response);
  };

  return (
    <div className="page-styles">
      <button type="button" onClick={handleSendEmail}>
        Send Email
      </button>
    </div>
  );
};

export default page;
