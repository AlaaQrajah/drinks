import React from "react";
import { useTranslation } from "react-i18next";
import "../../styles/ContactPage.css";
import Container from "../Container/Container"; // Assuming you want to use the Container component
import FormInput from "../../../public/components/FormInput"; // Assuming you want to use FormInput
import FormButton from "../../../public/components/FormButton"; // Assuming you want to use FormButton

const ContactPage = () => {
  const { t } = useTranslation();

  // You can add state and handleSubmit logic here for a contact form
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send email)
    console.log("Contact form submitted:", formData);
    alert("Message sent! (This is a placeholder)"); // Placeholder feedback
    setFormData({ name: "", email: "", message: "" }); // Reset form
  };

  return (
    <div className="contact-page">
      <Container>
        <h1 className="contact-page__title">{t("footer.links.contact")}</h1>
        <p className="contact-page__description">
          {t(
            "contactPage.description",
            "Have a question, suggestion, or feedback? Feel free to get in touch with us using the form below or through our social media channels."
          )}
        </p>

        {/* Simple Contact Form */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            {/* Reusing FormInput for consistency */}
            <FormInput
              type="text"
              name="name"
              placeholder={t("form.name")}
              value={formData.name}
              onChange={handleChange}
              // Add error handling classes if you implement validation
              // className={errors.name ? "input error" : "input"}
            />
            {/* Add error display if you implement validation */}
            {/* {errors.name && <div className="form-error">{errors.name}</div>} */}
          </div>
          <div className="form-group">
            {/* Reusing FormInput for consistency */}
            <FormInput
              type="email"
              name="email"
              placeholder={t("form.email")}
              value={formData.email}
              onChange={handleChange}
              // Add error handling classes if you implement validation
              // className={errors.email ? "input error" : "input"}
            />
            {/* Add error display if you implement validation */}
            {/* {errors.email && <div className="form-error">{errors.email}</div>} */}
          </div>
          <div className="form-group">
            {/* Using a textarea for message */}
            <textarea
              name="message"
              placeholder={t("contactPage.messagePlaceholder", "Your Message")}
              value={formData.message}
              onChange={handleChange}
              className="contact-form__textarea" // Custom class for textarea
              rows="6"
              // Add error handling classes if you implement validation
              // className={errors.message ? "contact-form__textarea error" : "contact-form__textarea"}
            ></textarea>
            {/* Add error display if you implement validation */}
            {/* {errors.message && <div className="form-error">{errors.message}</div>} */}
          </div>
          <FormButton type="submit" text={t("form.confirm", "Send Message")} />{" "}
          {/* Reusing form.confirm for button text */}
        </form>

        {/* Placeholder for Social Media or other contact info */}
        <div className="contact-info">
          <p>{t("contactPage.emailInfo", "Email")}: info@thecocktaildb.com</p>
          {/* Add social media links here */}
        </div>
      </Container>
    </div>
  );
};

export default ContactPage;
