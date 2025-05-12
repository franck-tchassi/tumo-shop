import { useChangeLocale, useCurrentLocale, useI18n } from '@/locales/client';
import { GrLanguage } from "react-icons/gr";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";


const LocaleSelectLanguage = () => {
  const locale = useCurrentLocale();
  const changeLocale = useChangeLocale();
  const t = useI18n();

  return (
    <HoverCard openDelay={0} closeDelay={100}>
      <HoverCardTrigger asChild>
        <div className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer transition-colors">
          <GrLanguage className="h-5 w-5" />
          <span className="text-sm font-medium">{t("currentLanguage")}</span>
        </div>
      </HoverCardTrigger>
      
      
      <HoverCardContent 
        className="w-64 p-2 relative shadow-lg mt-3 border border-gray-200 rounded-lg" 
        sideOffset={1}
        align="center"
        side="bottom"
      >

        {/* Flèche centrée pointant vers le trigger */}
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 rotate-45 bg-white border-t border-l border-gray-200 z-10"></div>


        <div className="space-y-2">
          {/* Section Langue */}
          <div className="px-3 py-1 text-xs font-medium text-gray-500">
            {t("language.Language")}
          </div>
          
          <div className="space-y-1">
            <div 
              onClick={() => changeLocale('en')}
              className={`flex items-center px-3 py-2 rounded-md cursor-pointer ${locale === 'en' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
            >
              <span className="fi fi-gb rounded mr-2"></span>
              <span className="text-sm">English-EN</span>
            </div>
            
            <div 
              onClick={() => changeLocale('fr')}
              className={`flex items-center px-3 py-2 rounded-md cursor-pointer ${locale === 'fr' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
            >
              <span className="fi fi-fr rounded mr-2"></span>
              <span className="text-sm">Français-FR</span>
            </div>
          </div>

          {/* Séparateur */}
          <div className="border-t border-gray-100 my-1"></div>

          {/* Section Devise */}
          <div className="px-3 py-1 text-xs font-medium text-gray-500">
            {t("language.Currency")}
          </div>
          
          <div className="px-3 py-2 rounded-md text-sm">
            {t("language.Cerrency_price")}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default LocaleSelectLanguage;