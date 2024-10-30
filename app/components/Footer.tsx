import { FaLinkedin, FaInstagram, FaYoutube, FaGithub } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="flex container mx-auto justify-between items-center gap-5 py-4 border-t border-gray-600 flex-wrap px-5 md:px-0 flex-col md:flex-row">
      <p>&copy; 2024 Guilherme Joazeiro</p>
      <div className="flex justify-center items-center gap-5">
        <a
          href="https://www.linkedin.com/in/guilherme-joazeiro"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://github.com/guijoazeiro"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Github"
        >
          <FaGithub />
        </a>
      </div>
    </div>
  );
};

export default Footer;
