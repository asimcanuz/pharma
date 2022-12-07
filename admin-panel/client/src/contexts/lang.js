import { createContext, useContext } from "react";
import { useTranslation } from "react-i18next";

const LangContext = createContext();

const LangProvider = ({ children }) => {
  const { i18n } = useTranslation();

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <LangContext.Provider value={{ changeLang }}>
      {children}
    </LangContext.Provider>
  );
};

export default LangProvider;

export const useI18nContext = () => useContext(LangContext);
