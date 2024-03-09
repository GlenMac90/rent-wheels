interface EmailTemplateProps {
  emailAddress: string;
  name: string;
  subject: string;
  message: string;
}

const EmailTemplate = ({
  emailAddress,
  name,
  subject,
  message,
}: EmailTemplateProps) => {
  return (
    <div>
      <h2>You have a new message from {name}</h2>
      <h2>Subject: {subject}</h2>
      <p>{message}</p>
      <h3>Reply to {emailAddress}</h3>
    </div>
  );
};

export default EmailTemplate;
