import { getT } from "@ap/shared/dist/locales";
import { useAppSelector } from "../../app/store/hooks";

const useTranslate = () => {
  const language = useAppSelector((store) => store.main.language);
  return getT(language);
};
export default useTranslate;
