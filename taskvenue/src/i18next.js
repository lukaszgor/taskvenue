import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./Languages/en.json";
import pl from "./Languages/pl.json";
import de from "./Languages/de.json";
import ua from "./Languages/ua.json";



i18next.use(initReactI18next).init({
	resources: {
		en: {
			translation: en,
		},
		pl: {
			translation: pl,
		},
		de: {
			translation: de,
		},
		ua: {
			translation: ua,
		},
	},
	lng: localStorage.getItem("lng") || "pl",
});

export default i18next;