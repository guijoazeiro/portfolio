import { FaLinkedin, FaInstagram, FaYoutube, FaGithub } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="flex container mx-auto justify-between items-center gap-5 py-4 border-t border-gray-600 flex-wrap px-5 md:px-0 flex-col md:flex-row">
      <p>&copy; 2024 Guilherme Joazeiro</p>
      <div className="flex justify-center items-center gap-5">
        <FaLinkedin />
        <FaInstagram />
        <FaYoutube />
        <FaGithub />
      </div>
    </div>
  );
};

export default Footer;
